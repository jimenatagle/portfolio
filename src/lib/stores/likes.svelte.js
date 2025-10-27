import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '$lib/firebase.js';

// Store for project likes
class LikesStore {
	#likes = $state({});
	#loading = $state({});

	get likes() {
		return this.#likes;
	}

	get loading() {
		return this.#loading;
	}

	// Get likes for a specific project
	getLikes(projectId) {
		return this.#likes[projectId] || 0;
	}

	isLoading(projectId) {
		return this.#loading[projectId] || false;
	}

	// Fetch likes from Firebase
	async fetchLikes(projectId) {
		try {
			this.#loading[projectId] = true;
			const docRef = doc(db, 'project-likes', projectId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				this.#likes[projectId] = docSnap.data().count || 0;
			} else {
				this.#likes[projectId] = 0;
			}
		} catch (error) {
			console.error('Error fetching likes:', error);
			this.#likes[projectId] = 0;
		} finally {
			this.#loading[projectId] = false;
		}
	}

	// Increment likes for a project
	async incrementLikes(projectId) {
		try {
			const docRef = doc(db, 'project-likes', projectId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				// Document exists, increment the count
				await updateDoc(docRef, {
					count: increment(1)
				});
			} else {
				// Document doesn't exist, create it with count 1
				await setDoc(docRef, {
					count: 1
				});
			}

			// Update local state optimistically
			this.#likes[projectId] = (this.#likes[projectId] || 0) + 1;
		} catch (error) {
			console.error('Error incrementing likes:', error);
			throw error;
		}
	}

	// Check if user has already liked (using localStorage)
	hasUserLiked(projectId) {
		const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
		return likedProjects.includes(projectId);
	}

	// Mark project as liked by user
	markAsLiked(projectId) {
		const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
		if (!likedProjects.includes(projectId)) {
			likedProjects.push(projectId);
			localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
		}
	}
}

export const likesStore = new LikesStore();

import { addLike, fetchLikes, isFirebaseConfigured } from "./firebase.js";

const root = document.documentElement;
const themeButton = document.querySelector(".theme");
const filterButtons = [...document.querySelectorAll(".chip")];
const cards = [...document.querySelectorAll(".card")];
const likedProjects = new Set(JSON.parse(localStorage.getItem("likedProjects") || "[]"));

const toProjectId = (title) => title.toLowerCase().replace(/\s+/g, "-");

themeButton.addEventListener("click", () => {
  const dark = root.dataset.theme !== "dark";
  root.dataset.theme = dark ? "dark" : "light";
  themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.tags.includes(filter);
      card.hidden = !match;
    });
    const shown = cards.filter((card) => !card.hidden).length;
    document.querySelector("#project-count").textContent = `${shown} project${shown === 1 ? "" : "s"} shown`;
  });
});

document.querySelectorAll(".card-open").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.dialog).showModal();
  });
});

document.querySelectorAll(".project-dialog").forEach((dialog) => {
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

function showLiked(button, liked) {
  button.setAttribute("aria-pressed", String(liked));
  button.classList.toggle("liked", liked);
  button.querySelector(".heart").textContent = liked ? "♥" : "♡";
}

cards.forEach(async (card) => {
  const button = card.querySelector(".like");
  const count = button.querySelector(".count");
  const projectId = toProjectId(card.querySelector("h3").textContent.trim());
  const alreadyLiked = likedProjects.has(projectId);

  card.dataset.projectId = projectId;
  showLiked(button, alreadyLiked);

  if (isFirebaseConfigured) {
    try {
      const savedCount = await fetchLikes(projectId);
      count.textContent = savedCount;
      card.dataset.likes = String(savedCount);
    } catch (error) {
      console.error(`Could not load likes for ${projectId}:`, error);
    }
  }

  button.addEventListener("click", async () => {
    if (likedProjects.has(projectId) || button.disabled) return;

    button.disabled = true;
    const previousCount = Number(count.textContent);
    count.textContent = previousCount + 1;
    card.dataset.likes = String(previousCount + 1);
    showLiked(button, true);

    try {
      await addLike(projectId);
      likedProjects.add(projectId);
      localStorage.setItem("likedProjects", JSON.stringify([...likedProjects]));
    } catch (error) {
      count.textContent = previousCount;
      card.dataset.likes = String(previousCount);
      showLiked(button, false);
      console.error(`Could not save like for ${projectId}:`, error);
    } finally {
      button.disabled = false;
    }
  });
});

import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: undefined
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/portfolio' : ''
    }
  }
};

export default config;
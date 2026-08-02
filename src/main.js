const root = document.documentElement;
const themeButton = document.querySelector(".theme");
const filterButtons = [...document.querySelectorAll(".chip")];
const cards = [...document.querySelectorAll(".card")];

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
      const match = filter === "all"
        || (filter === "likes" && Number(card.dataset.likes) >= 35)
        || card.dataset.tags.includes(filter);
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

document.querySelectorAll(".like").forEach((button) => {
  button.addEventListener("click", () => {
    const liked = button.getAttribute("aria-pressed") !== "true";
    const count = button.querySelector(".count");
    button.setAttribute("aria-pressed", String(liked));
    button.classList.toggle("liked", liked);
    button.querySelector(".heart").textContent = liked ? "♥" : "♡";
    count.textContent = Number(count.textContent) + (liked ? 1 : -1);
  });
});

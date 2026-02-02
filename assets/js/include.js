async function loadComponent(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;
  const res = await fetch(file);
  el.innerHTML = await res.text();
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("#header", "../components/header.html");
  await loadComponent("#footer", "../components/footer.html");
});

// simple homepage button interaction (optional)
function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerText = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 50);
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 250);
  }, 2500);
}

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("bookBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      toast("✅ Booking feature demo (UI only).");
    });
  }
});

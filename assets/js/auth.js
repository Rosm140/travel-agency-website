function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const pass = document.getElementById("loginPass").value.trim();

      if (!validateEmail(email)) return alert("Enter valid email!");
      if (pass.length < 4) return alert("Password too short!");

      localStorage.setItem("travelgo_user", email);
      alert("✅ Login successful!");
      window.location.href = "../index.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const pass = document.getElementById("signupPass").value.trim();

      if (name.length < 2) return alert("Enter valid name!");
      if (!validateEmail(email)) return alert("Enter valid email!");
      if (pass.length < 4) return alert("Password must be 4+ chars!");

      localStorage.setItem("travelgo_user", email);
      alert("✅ Signup successful!");
      window.location.href = "../index.html";
    });
  }
});

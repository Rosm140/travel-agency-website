// Minimal JS: nav toggle, simple AJAX form posting, and current year
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  // AJAX contact form (progressive enhancement)
  const form = document.querySelector('form[data-ajax="true"]');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const msg = document.getElementById('form-message');
      try {
        const res = await fetch(form.action || '/api/contact', {
          method: form.method || 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        if (!res.ok) throw new Error('Network error');
        const json = await res.json();
        msg.textContent = json.message || 'Message sent — we will reply shortly.';
        form.reset();
      } catch (err) {
        msg.textContent = 'Sorry, something went wrong. Please try again later.';
        console.error(err);
      }
    });
  }
});
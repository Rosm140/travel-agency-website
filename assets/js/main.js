// Minimal frontend interactions: nav toggle, AJAX contact submission, small validations
document.addEventListener('DOMContentLoaded', function () {
  // current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle for small screens
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Close mobile nav on link click
  if (nav) {
    nav.addEventListener('click', function (e) {
      const target = e.target;
      if (target.tagName === 'A' && window.innerWidth < 900) {
        nav.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // AJAX contact form with minimal validation
  const form = document.querySelector('form[data-ajax="true"]');
  if (!form) return;

  const msgEl = document.getElementById('form-message');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Simple client-side validation
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const destination = form.querySelector('[name="destination"]');

    if (!name.value.trim() || !email.value.trim() || !destination.value) {
      msgEl.textContent = 'Please fill in name, email and destination.';
      return;
    }

    const fd = new FormData(form);
    msgEl.textContent = 'Sending…';

    try {
      const res = await fetch(form.action || '/api/contact', {
        method: form.method || 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Network response was not ok');
      }

      const json = await res.json();
      msgEl.textContent = json.message || 'Message sent — we will reply shortly.';
      form.reset();
    } catch (err) {
      console.error('Contact submit error:', err);
      msgEl.textContent = 'Sorry, something went wrong. Please try again later.';
    }
  });
});
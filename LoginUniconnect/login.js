/* global document */
/* eslint-env browser */
"use strict";

/**
 * Single JS for all Login pages (Graduate / Employer / University)
 * - Auto-focus on email
 * - Toggle show/hide password
 * - Basic validation (email + password length)
 * - Status message output
 * - Optional redirect by theme (uncomment when you have real pages)
 */

document.addEventListener("DOMContentLoaded", () => {
  // ============== 1) Get active form inside the login card ==============
  const container =
    document.querySelector(".login-card") || document;

  const form =
    container.querySelector("form") ||
    document.querySelector("main form") ||
    document.querySelector("form");

  if (!form) return;

  // Inputs (robust selectors)
  const emailInput =
    form.querySelector('input[type="email"]') ||
    form.querySelector('input[id*="Email" i]');

  const passInput =
    form.querySelector('input[type="password"]') ||
    form.querySelector('input[id*="Pass" i]');

  // Status message area (create if missing)
  let msg =
    form.querySelector(".msg") ||
    form.querySelector('[id$="Msg"]');

  if (!msg) {
    msg = document.createElement("p");
    msg.className = "msg";
    msg.style.marginTop = "10px";
    form.appendChild(msg);
  }

  // ============== 2) Focus email on load ==============
  if (emailInput) emailInput.focus();

  // ============== 3) Show/Hide password toggle ==============
  let toggleBtn =
    form.querySelector("#togglePass") ||
    form.querySelector('.icon-btn[data-toggle="pass"]');

  if (passInput && !toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "icon-btn";
    toggleBtn.dataset.toggle = "pass";
    toggleBtn.setAttribute("aria-label", "Show password");
    toggleBtn.setAttribute("aria-pressed", "false");
    toggleBtn.textContent = "Show";

    const wrap = passInput.closest(".input-wrap") || passInput.parentElement || form;
    wrap.appendChild(toggleBtn);
  }

  if (toggleBtn && passInput) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = passInput.type === "password";
      passInput.type = isHidden ? "text" : "password";
      toggleBtn.textContent = isHidden ? "Hide" : "Show";
      toggleBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
      toggleBtn.setAttribute("aria-pressed", String(isHidden));
      passInput.focus();
    });
  }

  // ============== 4) Validate on submit ==============
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!emailInput || !passInput) return;

    // reset
    msg.textContent = "";
    msg.style.color = "#e05b5b";

    // Email
    if (!emailInput.value.trim() || !emailInput.checkValidity()) {
      msg.textContent = "Please enter a valid email address.";
      emailInput.focus();
      return;
    }

    // Password
    if (passInput.value.trim().length < 6) {
      msg.textContent = "Password must be at least 6 characters.";
      passInput.focus();
      return;
    }

    // Success
    msg.style.color = "#2fa772";
    msg.textContent = "Login successful";

    // ============== 5) Optional redirect by theme ==============
    // Uncomment and set your real destinations:
    // const theme = document.body.getAttribute("data-theme");
    // if (theme === "graduate")   window.location.href = "graduate-dashboard.html";
    // if (theme === "employer")   window.location.href = "employer-dashboard.html";
    // if (theme === "university") window.location.href = "university-dashboard.html";
  });
});

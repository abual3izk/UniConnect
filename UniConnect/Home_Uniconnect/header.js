// header.js — Web Component معزول (Logo + Home + About Us)
class UCHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // اكتشاف مجلد loginUniconnect
    const inLogin = location.pathname.includes("/loginUniconnect/");

    // مسارات ديناميكية
    const BASE = inLogin
      ? "../HomeUniconnect/"
      : "index.html".includes(location.pathname) ? "./" : "./";

    const HOME_HREF = inLogin
      ? "../HomeUniconnect/index.html"
      : "index.html";

    const ABOUT_HREF = inLogin
      ? "../HomeUniconnect/about.html"
      : "about.html";

    // HTML
    const wrapper = document.createElement("header");
    wrapper.className = "uc-header";
    wrapper.innerHTML = `
      <h1 class="uc-logo">UniConnect</h1>

      <nav class="uc-nav">
        <a class="uc-link" href="${HOME_HREF}">Home</a>
        <a class="uc-link" href="${ABOUT_HREF}">About Us</a>
      </nav>
    `;

    // CSS معزول بالكامل
    const style = document.createElement("style");
    style.textContent = `
      :host { all: initial; }

      .uc-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #eef2ff;
  padding: 14px 0px;       /* ← حذف البادينغ اليمين/يسار */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 1000;
  font-family: system-ui, Arial, sans-serif;
}
      .uc-logo {
        margin: 0;
        font-size: 26px;
        font-weight: 700;
        color: #0f172a;
      }

.uc-nav {
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: flex-end;
  margin-right: 32px;  

      .uc-link {
        font-size: 18px;
        font-weight: 600;
        text-decoration: none;
        color: #0f172a;
      }

      .uc-link:hover {
        color: #4f46e5;
      }
    `;

    shadow.append(style, wrapper);
  }
}


// تسجيل الهيدر
customElements.define("uc-header", UCHeader);

// حقن الهيدر في أعلى البودي
document.addEventListener("DOMContentLoaded", () => {
  const PAD = 82; 
  document.documentElement.style.setProperty("--uc-header-pad", PAD + "px");
  document.body.style.paddingTop = "var(--uc-header-pad)";
  document.body.insertAdjacentHTML("afterbegin", "<uc-header></uc-header>");
});

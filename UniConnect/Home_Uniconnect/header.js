// header.js — Web Component (Logo + Home + About Us)
class UCHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

   
    const inLogin = location.pathname.includes("/loginUniconnect/");

 
    const BASE = inLogin
      ? "../HomeUniconnect/"
      : "index.html".includes(location.pathname) ? "./" : "./";

    const HOME_HREF = inLogin
      ? "../HomeUniconnect/index.html"
      : "index.html";

    const ABOUT_HREF = inLogin
      ? "../HomeUniconnect/about.html"
      : "about.html";

    const wrapper = document.createElement("header");
    wrapper.className = "uc-header";
    wrapper.innerHTML = `
      <h1 class="uc-logo">UniConnect</h1>

      <nav class="uc-nav">
        <a class="uc-link" href="${HOME_HREF}">Home</a>
        <a class="uc-link" href="${ABOUT_HREF}">About Us</a>
      </nav>
    `;

 
    const style = document.createElement("style");
    style.textContent = `
      :host { all: initial; }

      .uc-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #eef2ff;
  padding: 14px 0px;     
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
        margin-left: 32px;
      }

.uc-nav {
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: flex-end;
  margin-right: 32px;  

      .uc-link {
        font-size: 26px;
        font-weight: 600;
        text-decoration: none;
        color: #0f172a;
        font-weight: 700;
      }

      .uc-link:hover {
        color: #4f46e5;
      }
    `;

    shadow.append(style, wrapper);
  }
}



customElements.define("uc-header", UCHeader);


document.addEventListener("DOMContentLoaded", () => {
  const PAD = 82; 
  document.documentElement.style.setProperty("--uc-header-pad", PAD + "px");
  document.body.style.paddingTop = "var(--uc-header-pad)";
  document.body.insertAdjacentHTML("afterbegin", "<uc-header></uc-header>");
});

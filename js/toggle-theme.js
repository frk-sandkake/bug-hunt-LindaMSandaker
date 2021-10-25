let tmp;
const siteTheme = { light: "dark", dark: "light" };
const firstTheme = Object.keys(siteTheme)[0];
const theme = localStorage.getItem("theme") || (tmp = firstTheme, localStorage.setItem("theme", tmp), tmp);

const bodyClass = document.body.classList;
bodyClass.add(theme);

function themeToggle() {
  const current = localStorage.getItem("theme");
  const next = siteTheme[current];
  bodyClass.replace(current, next);
  localStorage.setItem("theme", next);
}

document.querySelector("#jsThemeToggle").onclick = themeToggle;

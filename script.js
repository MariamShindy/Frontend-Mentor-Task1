const extensionsList = [
  { name: "DevLens", desc: "Quickly inspect page layouts and visualize element boundaries.", active: true,icon:"icons/logo-devlens.svg" },
  { name: "StyleSpy", desc: "Instantly analyze and copy CSS from any webpage element.", active: true,icon:"icons/logo-style-spy.svg" },
  { name: "SpeedBoost", desc: "Optimizes browser resource usage to accelerate page loading.", active: false,icon:"icons/logo-speed-boost.svg" },
  { name: "JSONWizard", desc: "Formats, validates, and prettifies JSON responses in-browser.", active: true,icon:"icons/logo-json-wizard.svg" },
  { name: "TabMaster Pro", desc: "Organizes browser tabs into groups and sessions.", active: true ,icon:"icons/logo-tab-master-pro.svg"},
  { name: "ViewportBuddy", desc: "Simulates various screen resolutions directly within the browser.", active: false ,icon:"icons/logo-viewport-buddy.svg"},
  { name: "Markup Notes", desc: "Enables annotation and notes directly onto webpages for collaborative debugging.", active: true,icon:"icons/logo-markup-notes.svg" },
  { name: "GridGuides", desc: "Overlay customizable grids and alignment guides on any webpages.", active: true ,icon:"icons/logo-grid-guides.svg"},
  { name: "Palette Picker", desc: "Instantly extracts color palettes from any webpage.", active: false,icon:"icons/logo-palette-picker.svg" },
  { name: "LinkChecker", desc: "Scans and highlights broken links on any page.", active: true,icon:"icons/logo-link-checker.svg" },
  { name: "DOM Snapshot", desc: "Capture and export DOM structures quickly.", active: true ,icon:"icons/logo-dom-snapshot.svg"},
  { name: "ConsolePlus", desc: "Enhanced developer console with advanced filtering and logging.", active: false ,icon:"icons/logo-console-plus.svg"},
];

const container = document.getElementById("extensionsContainer");
const filterButtons = document.querySelectorAll(".filterBtn");

function renderExtensions(filter = "all") {
  container.innerHTML = "";

  extensionsList
    .filter(ext => {
      const matchesFilter =
        filter === "all" || (filter === "active" && ext.active) || (filter === "inactive" && !ext.active);
      return  matchesFilter;
    })
    .forEach(ext => {
      const card = document.createElement("div");
      card.className = "extensionCard";
   card.innerHTML = `
  <div class="cardInfo">
    <img src="${ext.icon}" alt="${ext.name} icon" class="cardIcon">
    <div class="cardText">
      <h3>${ext.name}</h3>
      <p>${ext.desc}</p>
    </div>
  </div>
  <div class="cardActions">
    <button class="removeBtn">Remove</button>
    <input type="checkbox" class="toggleSwitch" ${ext.active ? "checked" : ""}>
  </div>
`;
      const toggle = card.querySelector(".toggleSwitch");
      toggle.addEventListener("change", () => {
        ext.active = toggle.checked;
      });

      const removeBtn = card.querySelector(".removeBtn");
      removeBtn.addEventListener("click", () => {
        const index = extensionsList.indexOf(ext);
        extensionsList.splice(index, 1);
        renderExtensions(filter);
      });

      container.appendChild(card);
    });
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderExtensions(btn.dataset.filter);
  });
});

renderExtensions();

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");

  themeIcon.src = isLight ? "icons/icon-moon.svg" : "icons/icon-sun.svg";
  themeIcon.alt = isLight ? "Switch to dark mode" : "Switch to light mode";
});

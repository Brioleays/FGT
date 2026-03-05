document.addEventListener("DOMContentLoaded", () => {
  loadAllComponents();
//   initSidebar();
//   highlightActiveLink();
//   initAlert();
});

function loadAllComponents() {
  const components = {
    navbar: "./partials/navbar.html",
    footer: "./partials/footer.html",
    footerTwo: "./partials/footertwo.html",
    sidebarContainer: "./partials/sidebar.html",
    sidebarHead: "./partials/sidebarhead.html"
  };

  Object.entries(components).forEach(([id, file]) => loadComponent(id, file));
}


// Generalized loader
function loadComponent(id, file) {
  fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then((html) => {
      const container = document.getElementById(id);
      if (!container) return console.warn(`Container #${id} not found`);
      container.innerHTML = html;

      // Try to load matching JS file (optional)
      const scriptPath = file.replace(".html", ".js");
      loadComponentScript(scriptPath, id);
    })
    .catch((err) => console.error(err));
}

// Optional JS loader for each component
function loadComponentScript(scriptPath, id) {
  fetch(scriptPath)
    .then((res) => {
      if (!res.ok) return; // silently skip if no JS file
      const script = document.createElement("script");
      script.src = scriptPath;
      script.onload = () => {
        console.log(`${id} script loaded`);
        if (typeof window[`init${capitalize(id)}Events`] === "function") {
          window[`init${capitalize(id)}Events`](); // auto-run init if exists
        }
      };
      document.body.appendChild(script);
    })
    .catch(() => {});
}

// Helper: capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ✅ Dynamic Hamburger Menu Logic (works for all loaded navbars)
document.addEventListener("click", (e) => {
  // Check if the click is on a hamburger button
  if (e.target.closest("#menu-toggle")) {
    const navLinks = document.querySelector("#nav-links");
    if (navLinks) {
      navLinks.classList.toggle("hidden");
    }
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("tab-btn")) {

    // Remove active state
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.remove("text-blue-700", "border-b-2", "border-blue-700");
      btn.classList.add("text-gray-500");
    });

    // Activate clicked
    e.target.classList.remove("text-gray-500");
    e.target.classList.add("text-blue-700", "border-b-2", "border-blue-700");

    // Hide all panes
    document.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.add("hidden");
    });

    // Show selected
    const target = e.target.getAttribute("data-tab");
    document.getElementById(target).classList.remove("hidden");
  }
});
document.addEventListener("DOMContentLoaded", function(){
const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openSidebar");
  if( openBtn && sidebar) {
  openBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });
}
  });

  // Auto close on mobile click outside
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth < 768 &&
      !sidebar.contains(e.target) &&
      !openBtn.contains(e.target)
    ) {
      sidebar.classList.add("-translate-x-full");
    }
  });
    
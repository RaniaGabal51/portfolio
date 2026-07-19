/* ==========================================================================
   Rania Gabal — Portfolio Scripts
   Vanilla JavaScript only. Organized by feature, each in its own function,
   all wired up from the single DOMContentLoaded bootstrap at the bottom.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initThemeToggle();
  initMobileMenu();
  initScrollProgress();
  initActiveNavHighlight();
  initSmoothScrollClose();
  initBackToTop();
  initCustomCursor();
  initTypingAnimation();
  initAnimatedCounters();
  initScrollReveal();
  initSkillBars();
  initProjectsSearchFilter();
  initProjectModal();
  initContactForm();
  initFooterYear();
});

/* --------------------------------------------------------------------------
   1. Loading screen — hides once the page has fully loaded
   -------------------------------------------------------------------------- */
function initLoadingScreen() {
  const screen = document.getElementById("loading-screen");
  if (!screen) return;

  const hide = () => screen.classList.add("hidden");

  // Hide as soon as everything (images, fonts) is loaded, with a small
  // minimum delay so the animation is never just an unpleasant flash.
  window.addEventListener("load", () => setTimeout(hide, 400));
  // Fallback in case 'load' is delayed by a slow asset.
  setTimeout(hide, 2500);
}

/* --------------------------------------------------------------------------
   2. Theme toggle (light / dark) with localStorage persistence
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("icon-sun");
  const moonIcon = document.getElementById("icon-moon");
  const STORAGE_KEY = "rania-portfolio-theme";

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.classList.add("dark");
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    } else {
      root.classList.remove("dark");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    }
  };

  // Determine initial theme: saved preference > system preference > light
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = root.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

/* --------------------------------------------------------------------------
   3. Mobile menu toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu whenever a nav link inside it is tapped
  menu.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* --------------------------------------------------------------------------
   4. Scroll progress bar + sticky navbar background on scroll
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const navbar = document.getElementById("navbar");

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 12);
    }
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* --------------------------------------------------------------------------
   5. Active section highlight in the navbar (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("main section[id], #hero");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   6. Smooth scrolling for in-page anchor links (native CSS handles the
      motion; here we just guarantee focus lands correctly for a11y)
   -------------------------------------------------------------------------- */
function initSmoothScrollClose() {
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, "", href);
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Back-to-top button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("visible", window.scrollY > 480),
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   8. Custom cursor (desktop only — CSS already hides it on touch devices)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring || window.matchMedia("(pointer: coarse)").matches) return;

  let ringX = 0,
    ringY = 0;

  window.addEventListener("mousemove", (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    ringX = e.clientX;
    ringY = e.clientY;
  });

  // Smoothly trail the ring behind the dot
  const animateRing = () => {
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  };
  animateRing();

  const interactive =
    "a, button, input, textarea, .project-card, .skill-card, .cert-card";
  document.querySelectorAll(interactive).forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("ring-active"));
    el.addEventListener("mouseleave", () =>
      ring.classList.remove("ring-active"),
    );
  });
}

/* --------------------------------------------------------------------------
   9. Typing animation for the hero role text
   -------------------------------------------------------------------------- */
function initTypingAnimation() {
  const el = document.getElementById("typing-text");
  if (!el) return;

  const roles = [
    "Frontend Developer",
    "React.js Enthusiast",
    "UI Craftsperson",
    "Problem Solver",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, 1400); // pause at full word
        return;
      }
    } else {
      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 40 : 90;
    setTimeout(tick, speed);
  };

  tick();
}

/* --------------------------------------------------------------------------
   10. Animated counters for the stats section (runs once, on scroll into view)
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + "+";
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   11. Scroll reveal — fades/slides elements in as they enter the viewport
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  items.forEach((item) => observer.observe(item));
}

/* --------------------------------------------------------------------------
   12. Skill proficiency bars — fill in once visible
   -------------------------------------------------------------------------- */
function initSkillBars() {
  const cards = document.querySelectorAll(".skill-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const level = card.getAttribute("data-level") || "0";
          const bar = card.querySelector(".skill-bar span");
          if (bar) {
            // slight delay so the reveal animation finishes first
            setTimeout(() => {
              bar.style.width = level + "%";
            }, 200);
          }
          obs.unobserve(card);
        }
      });
    },
    { threshold: 0.4 },
  );

  cards.forEach((card) => observer.observe(card));
}

/* --------------------------------------------------------------------------
   13. Projects: live search + category filter
   -------------------------------------------------------------------------- */
function initProjectsSearchFilter() {
  const searchInput = document.getElementById("project-search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  const noResultsMsg = document.getElementById("no-projects-msg");

  if (!cards.length) return;

  let activeFilter = "all";
  let activeQuery = "";

  const applyFilters = () => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.getAttribute("data-category") || "";
      const title = (card.getAttribute("data-title") || "").toLowerCase();
      const description = (
        card.getAttribute("data-description") || ""
      ).toLowerCase();
      const tech = (card.getAttribute("data-tech") || "").toLowerCase();

      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesQuery =
        activeQuery === "" ||
        title.includes(activeQuery) ||
        description.includes(activeQuery) ||
        tech.includes(activeQuery);

      const isVisible = matchesFilter && matchesQuery;
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleCount++;
    });

    if (noResultsMsg)
      noResultsMsg.classList.toggle("hidden", visibleCount !== 0);
  };

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeFilter = btn.getAttribute("data-filter");
      applyFilters();
    });
  });
}

/* --------------------------------------------------------------------------
   14. Project details modal
   -------------------------------------------------------------------------- */
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close");
  if (!modal) return;

  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-description");
  const techEl = document.getElementById("modal-tech");
  const featuresEl = document.getElementById("modal-features");
  const demoEl = document.getElementById("modal-demo");
  const codeEl = document.getElementById("modal-code");
  const imageEl = document.getElementById("modal-image");

  let lastFocused = null;

  const openModal = (card) => {
    titleEl.textContent = card.getAttribute("data-title") || "";
    descEl.textContent = card.getAttribute("data-description") || "";
    techEl.textContent = card.getAttribute("data-tech") || "";
    featuresEl.textContent = card.getAttribute("data-features") || "";
    demoEl.href = card.getAttribute("data-demo") || "#";
    codeEl.href = card.getAttribute("data-code") || "#";

    const img = card.querySelector(".project-media img");
    if (img) {
      imageEl.src = img.getAttribute("src");
      imageEl.alt = img.getAttribute("alt") || "";
    }

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      if (card) openModal(card);
    });
  });

  closeBtn.addEventListener("click", closeModal);

  // Click outside the panel closes the modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key closes the modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

/* --------------------------------------------------------------------------
   15. Contact form — client-side validation + simulated submit
       (No backend is wired up; replace handleSubmit's TODO with a real
       endpoint call, e.g. fetch('/api/contact', { method: 'POST', ... }))
   -------------------------------------------------------------------------- */
emailjs.init({
  publicKey: "lNRHJmDLtki_sok86",
});
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successMsg = document.getElementById("form-success");

  const validators = {
    name: (value) => value.trim().length >= 2 || "Please enter your name.",
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
      "Please enter a valid email address.",
    subject: (value) => value.trim().length >= 3 || "Please enter a subject.",
    message: (value) =>
      value.trim().length >= 10 || "Message should be at least 10 characters.",
  };

  const showError = (fieldName, message) => {
    const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
    const group = form.querySelector(`#${fieldName}`)?.closest(".field-group");
    if (errorEl) errorEl.textContent = message || "";
    if (group) group.classList.toggle("has-error", Boolean(message));
  };

  const validateField = (fieldName) => {
    const input = form.querySelector(`#${fieldName}`);
    if (!input) return true;
    const result = validators[fieldName](input.value);
    showError(fieldName, result === true ? "" : result);
    return result === true;
  };

  // Validate as the user leaves each field
  Object.keys(validators).forEach((fieldName) => {
    const input = form.querySelector(`#${fieldName}`);
    if (input) input.addEventListener("blur", () => validateField(fieldName));
  });

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  successMsg.classList.add("hidden");

  const allValid = Object.keys(validators)
    .map((fieldName) => validateField(fieldName))
    .every(Boolean);

  if (!allValid) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    await emailjs.send(
      "service_1m7ipos",
      "template_ukdhi5i",
      {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      }
    );

    successMsg.textContent =
      "Message sent successfully! I'll get back to you soon.";
    successMsg.classList.remove("hidden");

    form.reset();
  } catch (error) {
    console.error(error);

    successMsg.textContent =
      "Something went wrong. Please try again later.";
    successMsg.classList.remove("hidden");
    successMsg.classList.remove("text-emerald-500");
    successMsg.classList.add("text-red-500");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
}

/* --------------------------------------------------------------------------
   16. Footer — current year
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

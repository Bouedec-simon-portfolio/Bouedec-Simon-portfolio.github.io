(function () {
  'use strict';
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('portfolio-theme'); } catch (error) {}
  function applyTheme(theme) {
    var dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Passer au thème clair' : 'Passer au thème sombre');
    themeToggle.querySelector('.theme-label').textContent = dark ? 'Clair' : 'Sombre';
  }
  applyTheme(root.dataset.theme);
  themeToggle.addEventListener('click', function () {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(savedTheme);
    try { localStorage.setItem('portfolio-theme', savedTheme); } catch (error) {}
  });
  colorPreference.addEventListener('change', function (event) {
    if (savedTheme !== 'light' && savedTheme !== 'dark') applyTheme(event.matches ? 'dark' : 'light');
  });

  var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var motionOff = motionPreference.matches;
  var toggle = document.getElementById('a11y-toggle');
  function applyMotionState() {
    document.body.classList.toggle('no-anim', motionOff);
    document.documentElement.style.scrollBehavior = motionOff ? 'auto' : '';
    toggle.textContent = motionOff ? 'Activer les effets' : 'Réduire les effets';
    toggle.setAttribute('aria-pressed', String(motionOff));
  }
  applyMotionState();
  toggle.addEventListener('click', function () { motionOff = !motionOff; applyMotionState(); });
  motionPreference.addEventListener('change', function (event) { motionOff = event.matches; applyMotionState(); });

  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobile-nav');
  function setMenu(open, restoreFocus) {
    mobileNav.classList.toggle('open', open);
    mobileNav.inert = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    if (restoreFocus) burger.focus();
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', function (event) {
    if (!mobileNav.contains(event.target) && !burger.contains(event.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 1251px)').addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });

  // Indique la rubrique consultée dans les deux menus.
  var navigationLinks = document.querySelectorAll('header nav a, .mobile-nav a');
  function markSection(id) {
    navigationLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  markSection(window.location.hash.slice(1) || 'accueil');
  navigationLinks.forEach(function (link) {
    link.addEventListener('click', function () { markSection(link.getAttribute('href').slice(1)); });
  });
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markSection(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('main section').forEach(function (section) {
      if (Array.prototype.some.call(navigationLinks, function (link) { return link.getAttribute('href') === '#' + section.id; })) sectionObserver.observe(section);
    });
  }

})();

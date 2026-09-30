(function () {
  'use strict';
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
  window.matchMedia('(min-width: 1101px)').addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });

  // Illustrations statiques : lisibles immédiatement, sans animation automatique.
  var lines = [
    [true, 'whoami'], [false, 'simon'], [true, 'pwd'], [false, '/home/simon'],
    [true, 'ls -la'], [false, 'drwxr-xr-x  projet_symfony/'],
    [true, 'cd /var/www'], [true, 'sudo systemctl status apache2'],
    [false, '● apache2.service — active (running)']
  ];
  var terminal = document.getElementById('term-body');
  lines.forEach(function (line) {
    var row = document.createElement('div');
    if (line[0]) {
      var prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = 'simon@debian:~$ ';
      row.appendChild(prompt);
    }
    row.appendChild(document.createTextNode(line[1]));
    terminal.appendChild(row);
  });
  var queries = [
    '<span class="sql-kw">SELECT</span> nom, statut <span class="sql-kw">FROM</span> projets;',
    '<span class="sql-kw">INSERT INTO</span> projets (nom, statut) <span class="sql-kw">VALUES</span> (<span class="sql-str">\'Serveur_LAMP\'</span>, <span class="sql-str">\'terminé\'</span>);',
    '<span class="sql-kw">UPDATE</span> projets <span class="sql-kw">SET</span> statut = <span class="sql-str">\'terminé\'</span> <span class="sql-kw">WHERE</span> id = 3;',
    '<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> projets <span class="sql-kw">ORDER BY</span> id <span class="sql-kw">ASC</span>;'
  ];
  queries.forEach(function (query) {
    var row = document.createElement('div');
    row.className = 'sql-line';
    row.innerHTML = query;
    document.getElementById('sql-console').appendChild(row);
  });
})();

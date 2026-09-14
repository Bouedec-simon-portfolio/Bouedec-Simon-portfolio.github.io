(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- accessibility toggle ----
  var toggle = document.getElementById('a11y-toggle');
  function applyMotionState(off){
    document.body.classList.toggle('no-anim', off);
    toggle.textContent = off ? 'Activer les animations' : 'Réduire les animations';
  }
  var motionOff = reduceMotion;
  applyMotionState(motionOff);
  toggle.addEventListener('click', function(){
    motionOff = !motionOff;
    applyMotionState(motionOff);
  });

  // ---- header hide/show on scroll ----
  var header = document.getElementById('site-header');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    header.classList.toggle('solid', y > 40);
    if(y > lastY && y > 140){ header.classList.add('hide'); }
    else{ header.classList.remove('hide'); }
    lastY = y;
  });

  // ---- mobile nav ----
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobile-nav');
  burger.addEventListener('click', function(){
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ mobileNav.classList.remove('open'); });
  });

  // ---- reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal, .skill-card, .quality');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(function(el){ io.observe(el); });

  // ---- terminal animation ----
  var termLines = [
    {p:true, t:'whoami'},
    {p:false, t:'simon'},
    {p:true, t:'pwd'},
    {p:false, t:'/home/simon'},
    {p:true, t:'ls -la'},
    {p:false, t:'drwxr-xr-x  projet_symfony/'},
    {p:true, t:'cd /var/www'},
    {p:true, t:'sudo systemctl status apache2'},
    {p:false, t:'● apache2.service — active (running)'}
  ];
  var termBody = document.getElementById('term-body');
  var termStarted = false;
  function typeTerminal(){
    if(termStarted) return;
    termStarted = true;
    var i = 0;
    function next(){
      if(i >= termLines.length) return;
      var l = termLines[i];
      var div = document.createElement('div');
      div.className = 'terminal-line';
      div.innerHTML = l.p ? '<span class="prompt">simon@debian:~$</span> ' + l.t : l.t;
      termBody.appendChild(div);
      requestAnimationFrame(function(){ div.classList.add('show'); });
      i++;
      setTimeout(next, 480);
    }
    next();
  }
  var termObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ typeTerminal(); } });
  }, {threshold:0.4});
  termObs.observe(document.getElementById('terminal'));

  // ---- sql console animation ----
  var sqlLines = [
    '<span class="sql-kw">SELECT</span> nom, statut <span class="sql-kw">FROM</span> projets;',
    '<span class="sql-kw">INSERT INTO</span> projets (nom, statut) <span class="sql-kw">VALUES</span> (<span class="sql-str">\'Serveur_LAMP\'</span>, <span class="sql-str">\'terminé\'</span>);',
    '<span class="sql-kw">UPDATE</span> projets <span class="sql-kw">SET</span> statut = <span class="sql-str">\'terminé\'</span> <span class="sql-kw">WHERE</span> id = 3;',
    '<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> projets <span class="sql-kw">ORDER BY</span> id <span class="sql-kw">ASC</span>;'
  ];
  var sqlBody = document.getElementById('sql-console');
  var sqlStarted = false;
  function typeSql(){
    if(sqlStarted) return;
    sqlStarted = true;
    var i = 0;
    function next(){
      if(i >= sqlLines.length) return;
      var div = document.createElement('div');
      div.className = 'sql-line';
      div.innerHTML = sqlLines[i];
      sqlBody.appendChild(div);
      requestAnimationFrame(function(){ div.classList.add('show'); });
      i++;
      setTimeout(next, 550);
    }
    next();
  }
  var sqlObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ typeSql(); } });
  }, {threshold:0.4});
  sqlObs.observe(sqlBody);

})();

// Applique le thème avant le premier affichage pour éviter un flash de couleur.
(function () {
  var theme;
  try { theme = localStorage.getItem('portfolio-theme'); } catch (error) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();

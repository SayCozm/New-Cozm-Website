(function () {
  if (sessionStorage.getItem('cozm_auth') !== 'true') {
    var current = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace('password.html?redirect=' + current);
  }
})();

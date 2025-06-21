document.addEventListener("DOMContentLoaded", function() {
  const formLogin = document.getElementById('form-login');
  const formEsqueci = document.getElementById('form-esqueci');
  const linkEsqueci = document.getElementById('link-esqueci');
  const linkVoltar = document.getElementById('link-voltar');

  linkEsqueci.onclick = function(e) {
    e.preventDefault();
    formLogin.classList.add('hide-up');
    setTimeout(() => {
      formLogin.style.display = 'none';
      formEsqueci.style.display = 'block';
      formEsqueci.classList.add('show-down');
    }, 500);
  };

  linkVoltar.onclick = function(e) {
    e.preventDefault();
    formEsqueci.classList.remove('show-down');
    setTimeout(() => {
      formEsqueci.style.display = 'none';
      formLogin.style.display = 'block';
      formLogin.classList.remove('hide-up');
    }, 500);
  };
});
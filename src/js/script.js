function definirCookieAceitar() {
  var dataExpiracao = new Date();
  dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 1);

  document.cookie =
    "cookiesAceitos=true; expires=" + dataExpiracao.toUTCString() + "; path=/";

  ocultarAvisoCookies();
}

function definirCookieRecusar() {
  var dataExpiracao = new Date();
  dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 1);

  document.cookie =
    "cookiesAceitos=false; expires=" + dataExpiracao.toUTCString() + "; path=/";

  ocultarAvisoCookies();
}

function verificarPreferenciasCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    if (cookie.startsWith("cookiesAceitos=")) {
      var valorCookie = cookie.substring(
        "cookiesAceitos=".length,
        cookie.length
      );

      if (valorCookie === "true") {
        ocultarAvisoCookies();
        break;
      } else if (valorCookie === "false") {
        removerCookies();
        break;
      }
    }
  }
}

function removerCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var posicaoIgual = cookie.indexOf("=");

    var nomeCookie =
      posicaoIgual > -1 ? cookie.substr(0, posicaoIgual) : cookie;
    nomeCookie = nomeCookie.trim();

    document.cookie =
      nomeCookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

function ocultarAvisoCookies() {
  document.getElementById("aviso-cookies").style.display = "none";
}

verificarPreferenciasCookies();

document
  .getElementById("btn-aceitar")
  .addEventListener("click", definirCookieAceitar);
document
  .getElementById("btn-recusar")
  .addEventListener("click", definirCookieRecusar);

window.onscroll = function () {
  mostrarBotaoVoltarTopo();
};

function mostrarBotaoVoltarTopo() {
  var btnVoltarTopo = document.getElementById("btn-voltar-topo");
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    btnVoltarTopo.style.display = "block";
  } else {
    btnVoltarTopo.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function copyText(box) {
  var hiddenText = box.querySelector("#hidden-text");
  var visibleText = box.querySelector("#visible-text");
  var copiar = document.createElement("textarea");
  copiar.value = hiddenText.textContent;
  document.body.appendChild(copiar);
  copiar.select();
  document.execCommand("copy");
  document.body.removeChild(copiar);

  showMessage(box);
  hideTextTemporarily(visibleText);
}

function showMessage(box) {
  var messageDiv = box.querySelector(".message");
  messageDiv.innerText = "Texto copiado!";
  messageDiv.style.opacity = "1";
  setTimeout(function () {
    messageDiv.innerText = "";
    messageDiv.style.opacity = "0";
  }, 2000);
}

function hideTextTemporarily(textElement) {
  textElement.style.visibility = "hidden";
  setTimeout(function () {
    textElement.style.visibility = "visible";
  }, 2000);
}

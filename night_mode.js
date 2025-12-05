(function () {
  const CHAVE_TEMA = "tema"; 
  const corpo = document.documentElement; 

  const temaClaro = {
    "--primary-color": "#a855f7",
    "--primary-color-dark": "#9333ea",
    "--secondary-color": "#b904ca",
    "--text-dark": "#1f2937",
    "--text-light": "#6b7280",
    "--extra-light": "#faf5ff",
    "--bg-card": "#ffffff"
  };

  const temaEscuro = {
    "--primary-color": "#8b5cf6",
    "--primary-color-dark": "#5b21b6",
    "--secondary-color": "#b904ca",
    "--text-dark": "#e6e6f0",
    "--text-light": "#cfc7e9",
    "--extra-light": "#0f0f12",
    "--bg-card": "#141218"
  };

  function aplicarVariaveis(variaveis) {
    Object.keys(variaveis).forEach((key) => {
      corpo.style.setProperty(key, variaveis[key]);
    });
  }

  function aplicarClasseVisual(nome) {
    const bodyEl = document.body;
    if (nome === "escuro") {
      bodyEl.classList.add("modo-escuro");
    } else {
      bodyEl.classList.remove("modo-escuro");
    }
  }

  function transicaoSuave() {
    const bodyEl = document.body;
    bodyEl.classList.add("tema-transicao");
    window.setTimeout(() => {
      bodyEl.classList.remove("tema-transicao");
    }, 400);
  }

  window.alternarTema = function () {
    const atual = localStorage.getItem(CHAVE_TEMA) || "claro";
    const proximo = atual === "escuro" ? "claro" : "escuro";
    aplicarTema(proximo);
    localStorage.setItem(CHAVE_TEMA, proximo);
  };

  function aplicarTema(nome) {
    transicaoSuave();
    if (nome === "escuro") {
      aplicarVariaveis(temaEscuro);
      aplicarClasseVisual("escuro");
    } else {
      aplicarVariaveis(temaClaro);
      aplicarClasseVisual("claro");
    }
  }

  function inicializar() {
    const salvo = localStorage.getItem(CHAVE_TEMA);
    if (salvo === "escuro") {
      aplicarTema("escuro");
    } else {
      aplicarTema("claro"); // padrão
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
  } else {
    inicializar();
  }
})();
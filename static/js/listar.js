// Exemplo de dados (substitua por dados reais do backend se necessário)
const despesas = [
  {
    categoria: "Alimentação",
    valor: 50.00,
    nome: "Mercado",
    data: "2025-06-21"
  },
  {
    categoria: "Transporte",
    valor: 15.75,
    nome: "",
    data: "2025-06-20"
  }
];

let indiceEditando = null;

// Função para formatar data
function formatarData(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Renderizar despesas
function renderizarDespesas() {
  const lista = document.getElementById("lista-despesas");
  lista.innerHTML = "";
  despesas.forEach((despesa, idx) => {
    const div = document.createElement("div");
    div.className = "container-despesa";
    div.innerHTML = `
      <div class="cabecalho-despesa">
        <span class="nome">${despesa.nome ? despesa.nome : "Gasto"}</span>
        <span class="categoria">${despesa.categoria}</span>
        <span class="valor">R$ ${despesa.valor.toFixed(2).replace('.', ',')}</span>
      </div>
      <div class="info-acoes">
        <div class="mais-info">
          <div><strong>Nome:</strong> ${despesa.nome ? despesa.nome : "Gasto"}</div>
          <div><strong>Data:</strong> ${formatarData(despesa.data)}</div>
        </div>
        <div class="acoes">
          <button class="icone-btn editar" title="Editar" data-idx="${idx}">&#9998;</button>
          <button class="icone-btn excluir" title="Excluir" data-idx="${idx}">&#128465;</button>
        </div>
      </div>
    `;
    lista.appendChild(div);
  });

  // Eventos de abrir/fechar detalhes
  document.querySelectorAll('.container-despesa').forEach(container => {
    container.onclick = function(e) {
      if (e.target.classList.contains('editar') || e.target.classList.contains('excluir')) return;
      this.classList.toggle('ativo');
    };
  });

  // Evento editar
  document.querySelectorAll('.editar').forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      indiceEditando = parseInt(this.getAttribute('data-idx'));
      const despesa = despesas[indiceEditando];
      document.getElementById('nome-edit').value = despesa.nome || "";
      document.getElementById('valor-edicao').value = despesa.valor;
      document.getElementById('categoria-edicao').value = despesa.categoria;
      document.getElementById('data-edicao').value = despesa.data;
      document.getElementById('modal-edicao').style.display = "flex";
    };
  });

  // Evento excluir
  document.querySelectorAll('.excluir').forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      const idx = this.getAttribute('data-idx');
      if (confirm('Deseja excluir esta despesa?')) {
        despesas.splice(idx, 1);
        renderizarDespesas();
      }
    };
  });
}

// Fechar modal ao clicar no X
document.querySelector('#modal-edicao .close').onclick = function() {
  document.getElementById('modal-edicao').style.display = "none";
};
// Fechar modal ao clicar fora do conteúdo
window.onclick = function(e) {
  if (e.target === document.getElementById('modal-edicao')) {
    document.getElementById('modal-edicao').style.display = "none";
  }
};

// Evento de submit do formulário de edição
document.getElementById('form-edicao').addEventListener('submit', function(e) {
  e.preventDefault();
  if (indiceEditando !== null) {
    despesas[indiceEditando] = {
      nome: document.getElementById('nome-edit').value,
      valor: parseFloat(document.getElementById('valor-edicao').value),
      categoria: document.getElementById('categoria-edicao').value,
      data: document.getElementById('data-edicao').value
    };
    document.getElementById('modal-edicao').style.display = "none";
    renderizarDespesas();
  }
});

// Inicialização
document.addEventListener("DOMContentLoaded", renderizarDespesas);
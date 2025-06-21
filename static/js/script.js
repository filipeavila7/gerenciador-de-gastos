// Função para mostrar mensagens de status
function mostrarMensagem(texto) {
  const msg = document.getElementById("mensagem-status");
  msg.textContent = texto;
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 4000);
}

// Seletores dos modais e botões
const modalGasto = document.getElementById("modal");
const btnAddGasto = document.getElementById("btn-add");
const btnFecharGasto = modalGasto.querySelector(".close");

const modalSaldo = document.getElementById("modal-saldo");
const btnEditSaldo = document.getElementById("btn-edit");
const btnFecharSaldo = modalSaldo.querySelector(".close");

// Seletores de saldo
const campoSaldo = document.getElementById("saldo");

let totalDespesas = 0;

// Função para atualizar o total de despesas no HTML
function atualizarTotalDespesas() {
  const campoTotal = document.getElementById("total-despesa");
  campoTotal.textContent = `R$ ${totalDespesas.toFixed(2).replace(".", ",")}`;
}

// Abrir/fechar modal de gasto
btnAddGasto.onclick = () => modalGasto.style.display = "flex";
btnFecharGasto.onclick = () => modalGasto.style.display = "none";

// Abrir/fechar modal de saldo
btnEditSaldo.onclick = () => modalSaldo.style.display = "flex";
btnFecharSaldo.onclick = () => modalSaldo.style.display = "none";

// Fechar modais ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
  if (e.target === modalGasto) modalGasto.style.display = "none";
  if (e.target === modalSaldo) modalSaldo.style.display = "none";
});

// Atualizar saldo ao enviar o formulário
const formSaldo = document.getElementById("form-saldo");
const inputValorSaldo = document.getElementById("valor-saldo");

formSaldo.addEventListener("submit", (e) => {
  e.preventDefault();
  const novoValor = parseFloat(inputValorSaldo.value);

  if (!isNaN(novoValor)) {
    campoSaldo.textContent = `R$ ${novoValor.toFixed(2).replace(".", ",")}`;
    inputValorSaldo.value = "";
    modalSaldo.style.display = "none";
    mostrarMensagem("Saldo atualizado com sucesso!");
  } else {
    alert("Digite um valor válido.");
  }
});

// Função para atualizar saldo ao cadastrar gasto
function atualizarSaldoComGasto(valorGasto) {
  const saldoAtual = parseFloat(campoSaldo.textContent.replace("R$", "").replace(",", ".").trim());
  let novoSaldo = saldoAtual - valorGasto;
  novoSaldo = Math.max(novoSaldo, 0); // Garante que nunca será negativo
  campoSaldo.textContent = `R$ ${novoSaldo.toFixed(2).replace(".", ",")}`;
}

// Seletores dos campos do formulário de gasto
const formGasto = document.getElementById("form-transacao");
const inputValorGasto = document.getElementById("valor-gasto");
const inputCategoria = document.getElementById("categoria");
const inputData = document.getElementById("data");
const inputNomeGasto = document.getElementById("nome-gasto");

// Evento de envio do formulário de novo gasto
formGasto.addEventListener("submit", (e) => {
  e.preventDefault();

  const valor = parseFloat(inputValorGasto.value);
  const categoria = inputCategoria.value;
  const data = inputData.value;
  const nome = inputNomeGasto.value.trim() || "Gasto"; // Se vazio, usa "Gasto"

  if (!isNaN(valor) && valor >= 0) {
    atualizarSaldoComGasto(valor);

    // Atualiza o total de despesas
    totalDespesas += valor;
    atualizarTotalDespesas();

    // Formata a data para dd/mm/aaaa
    const dataFormatada = data.split("-").reverse().join("/");

    adicionarTransacao({
      data: dataFormatada,
      nome: nome,
      categoria: categoria,
      valor: valor.toFixed(2).replace(".", ",")
    });

    // Limpar campos e fechar modal
    inputNomeGasto.value = "";
    inputValorGasto.value = "";
    inputCategoria.value = "";
    inputData.value = "";
    modalGasto.style.display = "none";

    mostrarMensagem("Gasto cadastrado com sucesso!");
  } else {
    alert("Digite um valor válido.");
  }
});

// Função para adicionar uma transação na tabela
function adicionarTransacao({ data, nome, categoria, valor }) {
  const lista = document.getElementById("lista-transacoes");
  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
    <td>${data}</td>
    <td>${nome}</td>
    <td>${categoria}</td>
    <td>R$ ${valor}</td>
  `;
  lista.appendChild(novaLinha);
}

// Limitar a 10 caracteres nos campos de valor (gasto e saldo)
document.getElementById("valor-gasto").addEventListener("input", function () {
  if (this.value.length > 10) this.value = this.value.slice(0, 10);
});
document.getElementById("valor-saldo").addEventListener("input", function () {
  if (this.value.length > 10) this.value = this.value.slice(0, 10);
});

// Limitar a 10 caracteres no campo de valor do modal de editar gasto
document.querySelector('#modal-gasto #valor-gasto').addEventListener('input', function () {
  if (this.value.length > 10) this.value = this.value.slice(0, 10);
});

// Seletores do modal de editar gasto
const modalEditarGasto = document.getElementById("modal-gasto");
const btnEditarGasto = document.getElementById("btn-edit-gasto");
const btnFecharEditarGasto = modalEditarGasto.querySelector(".close");
const formEditarGasto = document.getElementById("form-gasto");
const inputEditarValorGasto = modalEditarGasto.querySelector("#valor-gasto");

// Abrir/fechar modal de editar gasto
btnEditarGasto.onclick = () => modalEditarGasto.style.display = "flex";
btnFecharEditarGasto.onclick = () => modalEditarGasto.style.display = "none";
window.addEventListener("click", (e) => {
  if (e.target === modalEditarGasto) modalEditarGasto.style.display = "none";
});

// Evento para editar o valor total de despesas
formEditarGasto.addEventListener("submit", (e) => {
  e.preventDefault();
  const novoValor = parseFloat(inputEditarValorGasto.value);

  if (!isNaN(novoValor) && novoValor >= 0) {
    totalDespesas = novoValor;
    atualizarTotalDespesas();
    inputEditarValorGasto.value = "";
    modalEditarGasto.style.display = "none";
    mostrarMensagem("Despesa total editada com sucesso!");
  } else {
    alert("Digite um valor válido.");
  }
});

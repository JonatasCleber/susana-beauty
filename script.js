// Número no formato: 55 + DDD + número, sem espaços nem símbolos
const NUMERO_WHATSAPP = "5575999046200";

// Pasta e nome das fotos (ajuste a extensão se a sua for .jpeg ou .png)
const PASTA_FOTOS = "src/imagens/";

const estilos = [
    // Cílios
    {
        id: "diamante", grupo: "Cílios", nome: "Volume Diamante",
        foto: "volume-diamante.jpeg",
        opcoes: [{ tipo: "Aplicação", preco: 120 }, { tipo: "Manutenção", preco: 80 }]
    },
    {
        id: "brasileiro", grupo: "Cílios", nome: "Volume Brasileiro",
        foto: "volume-brasileiro.jpeg",
        opcoes: [{ tipo: "Aplicação", preco: 110 }, { tipo: "Manutenção", preco: 75 }]
    },
    {
        id: "fox", grupo: "Cílios", nome: "Fox eyes",
        foto: "foto-hero.jpeg",
        opcoes: [{ tipo: "Aplicação", preco: 140 }, { tipo: "Manutenção", preco: 90 }]
    },
    {
        id: "fiou", grupo: "Cílios", nome: "Fio U",
        foto: "fio-u.jpeg",
        opcoes: [{ tipo: "Aplicação", preco: 120 }, { tipo: "Manutenção", preco: 80 }]
    },
    {
        id: "kim", grupo: "Cílios", nome: "Kim Kardashian",
        foto: "kim-kardashian.jpeg",
        opcoes: [{ tipo: "Aplicação", preco: 130 }, { tipo: "Manutenção", preco: 80 }]
    },
    {
        id: "angel", grupo: "Cílios", nome: "Angel",
        foto: "angel.jpeg",
        opcoes: [{ tipo: "Aplicação", preco: 150 }, { tipo: "Manutenção", preco: 95 }]
    },
    {
        id: "diamante-marrom", grupo: "Cílios", nome: "Volume Diamante marrom",
        foto: "volume-diamante-marrom.jpeg",
        opcoes: [{ tipo: "Aplicação", preco: 120 }, { tipo: "Manutenção", preco: 80 }]
    },
    {
        id: "fox-marrom", grupo: "Cílios", nome: "Fox eyes marrom",
        foto: "fox-eyes-marrom.jpeg",
        opcoes: [{ tipo: "Aplicação", preco: 140 }, { tipo: "Manutenção", preco: 90 }]
    },
    {
        id: "lash", grupo: "Cílios", nome: "Lash lifting",
        foto: "lash-lifting.jpeg",
        descricao: "Procedimento químico nos fios naturais, sem fios sintéticos. Curva e alonga, e pode durar até 45 dias.",
        opcoes: [{ tipo: "Valor", preco: 90 }]
    },

    // Sobrancelhas
    {
        id: "sem-henna", grupo: "Sobrancelhas", nome: "Design sem henna",
        foto: "design-sem-henna.jpeg",
        descricao: "Mapeamento personalizado, remoção de pelos (pinça e cera) e acabamento com lápis.",
        opcoes: [{ tipo: "Valor", preco: 30 }]
    },
    {
        id: "com-henna", grupo: "Sobrancelhas", nome: "Design com henna",
        foto: "design-com-henna.jpeg",
        descricao: "Corrige falhas e realça o formato das sobrancelhas com pigmento. Dura de 7 a 15 dias.",
        opcoes: [{ tipo: "Valor", preco: 40 }]
    }
];

const elFiltros = document.getElementById("filtros");
const elServicos = document.getElementById("servicos");
const elLista = document.getElementById("lista-pedido");
const elTotal = document.getElementById("total");
const elHorario = document.getElementById("horario");
const elNome = document.getElementById("nome");
const elErro = document.getElementById("erro");
const btnAgendar = document.getElementById("btn-agendar");

const grupos = ["Todos", ...new Set(estilos.map(s => s.grupo))];
const selecionados = new Set();
let filtroAtual = "Todos";

function preco(valor) {
    return "R$ " + valor;
}

function chave(estilo, indice) {
    return estilo.id + "-" + indice;
}

function nomeCompleto(estilo, opcao) {
    if (estilo.opcoes.length > 1) {
        return estilo.nome + " (" + opcao.tipo.toLowerCase() + ")";
    }
    return estilo.nome;
}

function itensEscolhidos() {
    const itens = [];
    estilos.forEach(estilo => {
        estilo.opcoes.forEach((opcao, i) => {
            if (selecionados.has(chave(estilo, i))) {
                itens.push({ estilo, opcao });
            }
        });
    });
    return itens;
}

function criarFoto(estilo) {
    const img = document.createElement("img");
    img.className = "servico-foto";
    img.src = PASTA_FOTOS + estilo.foto;
    img.alt = estilo.nome;
    img.loading = "lazy";

    // Se a foto ainda não existir, mostra um espaço rosa no lugar
    img.addEventListener("error", () => {
        const vazio = document.createElement("div");
        vazio.className = "servico-foto sem-foto";
        vazio.textContent = "foto";
        img.replaceWith(vazio);
    });
    return img;
}

function renderFiltros() {
    elFiltros.innerHTML = "";
    grupos.forEach(grupo => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "filtro" + (grupo === filtroAtual ? " ativo" : "");
        b.textContent = grupo;
        b.addEventListener("click", () => {
            filtroAtual = grupo;
            renderFiltros();
            renderServicos();
        });
        elFiltros.appendChild(b);
    });
}

function renderServicos() {
    elServicos.innerHTML = "";

    estilos
        .filter(e => filtroAtual === "Todos" || e.grupo === filtroAtual)
        .forEach(estilo => {
            const card = document.createElement("div");
            const temSelecao = estilo.opcoes.some((_, i) => selecionados.has(chave(estilo, i)));
            card.className = "servico" + (temSelecao ? " com-selecao" : "");

            card.appendChild(criarFoto(estilo));

            const nome = document.createElement("h4");
            nome.className = "servico-nome";
            nome.textContent = estilo.nome;
            card.appendChild(nome);

            if (estilo.descricao) {
                const desc = document.createElement("p");
                desc.className = "servico-descricao";
                desc.textContent = estilo.descricao;
                card.appendChild(desc);
            }

            const opcoes = document.createElement("div");
            opcoes.className = "opcoes";

            estilo.opcoes.forEach((opcao, i) => {
                const k = chave(estilo, i);
                const marcado = selecionados.has(k);

                const linha = document.createElement("div");
                linha.className = "opcao";

                const info = document.createElement("div");
                info.className = "opcao-info";

                const tipo = document.createElement("span");
                tipo.className = "opcao-tipo";
                tipo.textContent = opcao.tipo;

                const valor = document.createElement("span");
                valor.className = "opcao-preco";
                valor.textContent = preco(opcao.preco);

                info.append(tipo, valor);

                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "btn-servico" + (marcado ? " ativo" : "");
                btn.textContent = marcado ? "Adicionado" : "Adicionar";
                btn.addEventListener("click", () => {
                    if (marcado) {
                        selecionados.delete(k);
                    } else {
                        selecionados.add(k);
                    }
                    elErro.textContent = "";
                    renderServicos();
                    renderPedido();
                });

                linha.append(info, btn);
                opcoes.appendChild(linha);
            });

            card.appendChild(opcoes);
            elServicos.appendChild(card);
        });
}

function renderPedido() {
    const itens = itensEscolhidos();
    elLista.innerHTML = "";

    if (itens.length === 0) {
        const li = document.createElement("li");
        li.className = "vazio";
        li.textContent = "Nenhum serviço adicionado";
        elLista.appendChild(li);
    }

    let total = 0;
    itens.forEach(({ estilo, opcao }) => {
        total += opcao.preco;
        const li = document.createElement("li");
        const n = document.createElement("span");
        n.textContent = nomeCompleto(estilo, opcao);
        const p = document.createElement("span");
        p.textContent = preco(opcao.preco);
        li.append(n, p);
        elLista.appendChild(li);
    });

    elTotal.textContent = preco(total);
}

function juntar(nomes) {
    if (nomes.length === 1) return nomes[0];
    return nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1];
}

function agendar() {
    const itens = itensEscolhidos();
    const nome = elNome.value.trim();
    const horario = elHorario.value;

    if (itens.length === 0) {
        elErro.textContent = "Adicione pelo menos um serviço.";
        return;
    }
    if (!horario) {
        elErro.textContent = "Escolha um horário.";
        return;
    }
    if (!nome) {
        elErro.textContent = "Digite seu nome.";
        return;
    }
    elErro.textContent = "";

    const nomes = itens.map(({ estilo, opcao }) => nomeCompleto(estilo, opcao));
    const rotulo = nomes.length > 1 ? "os serviços" : "o serviço";
    const mensagem =
        "Olá, me chamo " + nome + ". " +
        "Queria " + rotulo + " " + juntar(nomes) + ". " +
        "O horário das " + horario + " está disponível?";

    const url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensagem);
    window.open(url, "_blank");
}

btnAgendar.addEventListener("click", agendar);
elHorario.addEventListener("change", () => { elErro.textContent = ""; });
elNome.addEventListener("input", () => { elErro.textContent = ""; });

renderFiltros();
renderServicos();
renderPedido();
const vendas = [
  {
    id: 1,
    vendedor: 'Ana',
    valor: 100,
    data: '2026-05-01',
    categoria: 'eletrônicos ',
    status: 'concluida',
  },
  {
    id: 2,
    vendedor: 'Carlos',
    valor: 300,
    data: '2026-05-01',
    categoria: 'acessórios',
    status: 'concluida',
  },
  {
    id: 3,
    vendedor: 'Ana',
    valor: 200,
    data: '2026-05-02',
    categoria: 'eletrônicos',
    status: 'concluida',
  },
  {
    id: 4,
    vendedor: 'Ana',
    valor: 100,
    data: '2026-05-02',
    categoria: 'periféricos',
    status: 'pendente',
  },
  {
    id: 5,
    vendedor: 'Carlos',
    valor: 100,
    data: '2026-05-03',
    categoria: 'acessórios',
    status: 'concluida',
  },
  {
    id: 6,
    vendedor: 'Adriel',
    valor: 199,
    data: '2026-05-03',
    categoria: 'eletrônicos',
    status: 'concluida',
  },
  {
    id: 7,
    vendedor: 'Kamilla',
    valor: 188,
    data: '2026-05-03',
    categoria: 'periféricos',
    status: 'concluida',
  },
  {
    id: 8,
    vendedor: 'Gustavo',
    valor: 1100,
    data: '2026-05-04',
    categoria: 'eletrônicos',
    status: 'concluida',
  },
  {
    id: 9,
    vendedor: 'João',
    valor: 180,
    data: '2026-05-04',
    categoria: 'acessórios',
    status: 'concluida',
  },
  {
    id: 10,
    vendedor: 'Maria',
    valor: 170,
    data: '2026-05-04',
    categoria: 'periféricos',
    status: 'pendente',
  },
  {
    id: 11,
    vendedor: 'José',
    valor: 190,
    data: '2026-05-05',
    categoria: 'eletrônicos',
    status: 'concluida',
  },

  {
    id: 12,
    vendedor: 'Alindo',
    valor: 225,
    data: '2026-05-05',
    categoria: 'acessórios',
    status: 'concluida',
  },
];

const resultado = {};

vendas.forEach((venda) => {
  if (!resultado[venda.vendedor]) {
    resultado[venda.vendedor] = {
      total: 0,
      quantidade: 0,
      categoria: {},
      status: {},
    };
  }
  if (!resultado[venda.vendedor].categoria[venda.categoria]) {
    resultado[venda.vendedor].categoria[venda.categoria] = 0;
  }

  if (!resultado[venda.vendedor].status[venda.status]) {
    resultado[venda.vendedor].status[venda.status] = 0;
  }
  resultado[venda.vendedor].total += venda.valor;
  resultado[venda.vendedor].quantidade++;
  resultado[venda.vendedor].categoria[venda.categoria]++;
  resultado[venda.vendedor].status[venda.status]++;
});

console.log(resultado);

const vendedoresAgrupados = Object.entries(resultado);
const relatorioVenda = vendedoresAgrupados.map((nomeRelatorio) => {
  const media = nomeRelatorio[1].total / nomeRelatorio[1].quantidade;

  return {
    vendedor: nomeRelatorio[0],
    total: nomeRelatorio[1].total,
    media: Number(media.toFixed()),
    destaque: nomeRelatorio[1].total >= 200,
    categoria: nomeRelatorio[1].categoria,
    status: nomeRelatorio[1].status,
  };
});

relatorioVenda.sort((a, b) => {
  if (a.total !== b.total) {
    return b.total - a.total;
  }
  if (a.media !== b.media) {
    return b.media - a.media;
  }
  return a.vendedor.localeCompare(b.vendedor);
});
//=========================DOM=======================================================
const lista = document.getElementById('lista');
const listaUl = document.createElement('ul');
const filtro = document.getElementById('button__filtro');
const todos = document.getElementById('button__todos');
const eletronicos = document.getElementById('button__eletronicos');
const acessorios = document.getElementById('button__acessorios');
const perifericos = document.getElementById('button__perifericos');
const resumo = document.getElementById('resumo');

listaUl.classList.add('relatorio__lista');
let modoAtual = 'todos';
let categoriaAtual = 'todos';

renderizarDashboard();

lista.appendChild(listaUl);

filtro.addEventListener('click', () => {
  if (modoAtual === 'todos') {
    modoAtual = 'destaque';
  } else {
    modoAtual = 'todos';
  }
  renderizarDashboard();
});

todos.addEventListener('click', () => {
  categoriaAtual = 'todos';
  renderizarDashboard();
});

eletronicos.addEventListener('click', () => {
  categoriaAtual = 'eletrônicos';
  renderizarDashboard();
});

acessorios.addEventListener('click', () => {
  categoriaAtual = 'acessórios';
  renderizarDashboard();
});

perifericos.addEventListener('click', () => {
  categoriaAtual = 'periféricos';
  renderizarDashboard();
});

//=====================Function======================================
function renderizarLista(listaVenda) {
  listaUl.innerHTML = '';

  listaVenda.forEach((lista) => {
    const listaLi = document.createElement('li');

    const categorias = Object.keys(lista.categoria).map((cat) => {
      return `${cat} (${lista.categoria[cat]})`;
    });

    const statusLista = Object.keys(lista.status).map((stat) => {
      return `${stat} (${lista.status[stat]})`;
    });

    listaLi.textContent = `${lista.vendedor}: Total: ${lista.total}
| Média: ${lista.media} | Categoria: ${categorias.join(', ')} | Status: ${statusLista.join(', ')}`;

    listaUl.appendChild(listaLi);

    if (lista.destaque) {
      listaLi.classList.add('relatorio__destaque');
    }
  });
}

function renderizarDashboard() {
  let listaParaMostrar;

  if (modoAtual === 'todos') {
    listaParaMostrar = relatorioVenda;
  } else {
    listaParaMostrar = relatorioVenda.filter(
      (itensFiltrados) => itensFiltrados.destaque,
    );
  }

  if (categoriaAtual === 'todos') {
  } else {
    listaParaMostrar = listaParaMostrar.filter((itensParaMostrar) => {
      return itensParaMostrar.categoria[categoriaAtual];
    });
  }

  const totalGeral = listaParaMostrar.reduce((acumulador, item) => {
    return acumulador + item.total;
  }, 0);

  const quantidadeTotal = listaParaMostrar.length;

  resumo.textContent = `Total Geral: R$ ${totalGeral.toLocaleString('pt-BR')} | Quantidade de vendas: ${quantidadeTotal}`;
  renderizarLista(listaParaMostrar);
}

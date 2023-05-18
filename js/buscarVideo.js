import { conectaAPI } from './conectaAPI.js';
import constroiCard from './mostrarVideos.js';

const campoDePesquisa = document.querySelector('[data-pesquisa]');

async function buscarVideo(evento) {
  evento.preventDefault();
  const dadosDePesquisa = campoDePesquisa.value;

  const busca = await conectaAPI.buscaVideo(dadosDePesquisa);
  const lista = document.querySelector('[data-lista]');

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  busca.forEach(elemento => {
    lista.appendChild(
      constroiCard(
        elemento.url,
        elemento.titulo,
        elemento.descricao,
        elemento.imagem
      )
    );
  });
  if (busca.length == 0) {
    lista.innerHTML = `<h2 class='mensagem__titulo'>Não existe nenhum vídeo com esse termo</h2>`;
  }
}

const botaoDePesquisa = document.querySelector('[data-botao-pesquisa]');

campoDePesquisa.addEventListener('keydown', evento => {
  if (evento.key === 'Enter') {
    buscarVideo(evento);
  }
});

botaoDePesquisa.addEventListener('click', evento => {
  buscarVideo(evento);
});

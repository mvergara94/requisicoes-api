const lista = document.querySelector('[data-lista]');
import { conectaAPI } from './conectaAPI.js';

export default function constroiCard(url, titulo, descricao, imagem) {
  const video = document.createElement('li');
  video.className = 'videos__item';
  video.innerHTML = `<iframe width="100%" height="72%" src="${url}"
  title="YouTube video player" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
<div class="descricao-video">
  <img src="${imagem}" alt="logo canal alura">
  <h3>${titulo}</h3>
  <p>${descricao}</p>
</div>`;

  return video;
}

async function listaVideo() {
  try {
    const listaAPI = await conectaAPI.listaVideos();
    listaAPI.forEach(elemento =>
      lista.appendChild(
        constroiCard(
          elemento.url,
          elemento.titulo,
          elemento.descricao,
          elemento.imagem
        )
      )
    );
  } catch {
    lista.innerHTML = `<h2 class='mensagem__titulo'>Não foi possível carregar a lista de vídeos</h2>`;
  }
}

listaVideo();

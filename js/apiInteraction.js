import { apiConection } from './apiConection.js'; //importando

const list = document.querySelector('[data-lista]');

//função de criação dos cards
function createCard(id, titulo, descricao, url, imagem) {
    const video = document.createElement('li');
    video.classList.add('videos__item');
    video.setAttribute('data-id', id);
    video.innerHTML =
        `
            <iframe width="100%" height="72%" src="${url}" 
            title="${titulo}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="descricao-video">
                <img src="${imagem}" alt="Logo do canal">
                <h3>${titulo}</h3>
                <p>${descricao}</p>
            </div>
    `
    return video;
}

async function videoList() {
    const videosData = await apiConection.getVideos();
    videosData.forEach((video) => {
        list.appendChild(
            createCard(video.id, video.titulo, video.descricao, video.url, video.imagem));
    })
}
videoList();

// FEAT_SEARCH
const searchField = document.getElementById('pesquisar');
const searchBtn = document.getElementById('button');

async function searchV() {
    const searchFValue = searchField.value;

    try {
        const videosFound = await apiConection.searchVideo(searchFValue);
        console.log(videosFound);
        list.innerHTML = ``
        videosFound.forEach(video => list.appendChild(
            createCard(video.id, video.titulo, video.descricao, video.url, video.imagem)
        ));

    } catch {
        if (Error) {
            alert('deu cagada aí');
        }
    }
}

searchBtn.addEventListener('click', searchV);
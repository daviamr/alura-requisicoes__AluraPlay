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
    return video; //retornando esse resultado para a function (!important)
}

async function videoList() {
    try {
        const videosData = await apiConection.getVideos(); //buscando a lista de videos
        videosData.forEach((video) => { //listadevideos.foreach(para_cada)
            list.appendChild( //lista de cards.appendChild(novoCard(parametros))
                createCard(video.id, video.titulo, video.descricao, video.url, video.imagem));
        })

    } catch {
        list.innerHTML = `<h1 class='mensagem__titulo'>Erro! Não foi possível acessar os dados.</h1>`;
    }
}
videoList();

// FEAT_SEARCH
const searchField = document.getElementById('pesquisar');
const searchBtn = document.getElementById('button');

async function searchV() {
    const searchFValue = searchField.value; //valor do campo de busca

    try {
        //buscando a function responsável pela busca dos videos
        const videosFound = await apiConection.searchVideo(searchFValue);
        list.innerHTML = `` //limpando a lista de cards
        if (videosFound.length === 0 || searchFValue.trim() == '') {
            list.innerHTML = `<h1 class='mensagem__titulo'>Nenhum vídeo encontrado.</h1>`

        } else {
            videosFound.forEach(video => list.appendChild(
                createCard(video.id, video.titulo, video.descricao, video.url, video.imagem)
            ));

        }
    } catch {
        list.innerHTML = `<h1 class='mensagem__titulo'>Erro! Não foi possível acessar os dados.</h1>`;
    }
}

searchBtn.addEventListener('click', searchV);
import { apiConection } from './apiConection.js'; //importando

// ADD_A_CUSTOM_VIDEO
const embedVideo = document.getElementById('url');
const titleVideo = document.getElementById('titulo');
const perfilImgVideo = document.getElementById('imagem');
const form = document.querySelector('[data-formulario]');

async function pushNewVideo(e) {
    e.preventDefault()

    const title = titleVideo.value;
    const description = Math.floor(Math.random() * 999).toString();
    const url = embedVideo.value
    const image = perfilImgVideo.value

    try { //tente
        //puxando a function 'createVideo()' da 'apiConection';
        await apiConection.createVideo(title, description, url, image)
        window.location.href = '../pages/envio-concluido.html'
    } catch {
        if (Error) {
            alert('deu cagada aí');
        }
    }
}
form.addEventListener('submit', (e) => pushNewVideo(e));
async function getVideos() {
    const apiData = await fetch('http://localhost:3000/videos')
    const dataConverted = await apiData.json();
    return dataConverted;
}

//função assincrona responsável por enviar um novo elemento para dentro da API
async function createVideo(title, description, url, image) {
    const connection = await fetch('http://localhost:3000/video', {
        method: 'POST', //metodo para 'postar' dados, informações no servidor
        headers: {
            'Content-type': 'application/json' //indicando o tipo do arquivo a ser enviado
        },
        body: JSON.stringify({
            titulo: title,
            descricao: `${description} mil visualizações`,
            url: url,
            imagem: image

        })
    });

    if (!connection.ok) { //se 'connection' false =
        throw new Error('Não foi possível enviar o vídeo.');
    }

    const convertedConnection = await connection.json();
    return convertedConnection;
}

//função assincrona responsável pela busca
async function searchVideo(search) {
    const connection = await fetch(`http://localhost:3000/videos?q=${search}`);
    const convertedConnection = await connection.json();

    return convertedConnection;
}

//exportando as functions para outros arquivos
export const apiConection = {
    getVideos,
    createVideo,
    searchVideo
}
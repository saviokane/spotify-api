


function searchId(artist) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                const response = JSON.parse(this.responseText); // Converte a resposta para um objeto JavaScript
                displayResults(response); // Chama a função para exibir os resultados
            } else {
                console.error('Erro na requisição:', this.status);
                displayError('Erro ao buscar artistas.');
            }
        }
    });

    const url = `https://spotify23.p.rapidapi.com/artists/?ids=${encodeURIComponent(artist)}`;
    xhr.open('GET', url);
    xhr.setRequestHeader('X-RapidAPI-Key', '63324ee498msh5075770a048c6c3p1f6f32jsn96cd152289f3');
    xhr.setRequestHeader('X-RapidAPI-Host', 'spotify23.p.rapidapi.com');

    xhr.send();
}

function displayResults(dataSpotify) {
    const respostaElement = document.getElementById('resposta');


    if (dataSpotify.artists && dataSpotify.artists.length > 0) {
        const artist = dataSpotify.artists[0]; // Pega o primeiro artista retornado
        console.log(artist)
        const artistInfo = {
            name: artist.name,
            image: artist.images[1].url, 
            followers: artist.followers.total,
            genres: artist.genres.join(', '),
            popularity: artist.popularity,
        };

        respostaElement.innerHTML = `
            <h1>${artistInfo.name}</h1>
            <img src="${artistInfo.image}" alt="${artistInfo.name}'s Image" style="width: 200px; height: auto;">
            <p>Seguidores: ${artistInfo.followers}</p>
            <p>Gêneros: ${artistInfo.genres}</p>
            <p>Popularidade: ${artistInfo.popularity}</p>
        `;
    } else {
        respostaElement.textContent = 'Artista não encontrado.';
    }
}





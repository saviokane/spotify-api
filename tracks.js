

function formularioArtista() {
    var nomeArtista = document.getElementById('artist').value;

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		
        var response = JSON.parse(this.responseText);
        mostrarResult(response);
        console.log(response);
	}
});

xhr.open('GET', `https://spotify23.p.rapidapi.com/search/?q=${nomeArtista}&type=multi&offset=0&limit=10&numberOfTopResults=5`);
xhr.setRequestHeader('X-RapidAPI-Key', '63324ee498msh5075770a048c6c3p1f6f32jsn96cd152289f3');
xhr.setRequestHeader('X-RapidAPI-Host', 'spotify23.p.rapidapi.com');

xhr.send(data);
}

function mostrarResult(response){
    var mostrarResult = document.getElementById('track');
    if(response.tracks && response.tracks.totalCount > 0){

        var imagem = response.artists.items[0].data.visuals.avatarImage.sources[0];
        var NomeArtista = response.artists.items[0].data.profile;
        var Music0 = response.topResults.items[0].data;
        var Music1 = response.topResults.items[1].data;
        var Music2 = response.topResults.items[2].data;
        var Music4 = response.topResults.items[4].data;

        console.log(NomeArtista);

        var tracksInfo = {
            image: imagem.url,
            name: NomeArtista.name,
            music0: Music0.name,
            Music1: Music1.name,
            Music2: Music2.name,
            Music4: Music4.name,
            Link0: Music0.uri,
            Link1: Music1.uri,
            Link2: Music2.uri,
            Link4: Music4.uri
        }
        
        mostrarResult.innerHTML =
        `
        <img src="${tracksInfo.image}" 's Image" style="width: 200px; height: auto;">
        <h2>${NomeArtista.name}</h2>
        <p><a href="${Music0.uri}">${Music0.name}</a></p>
        <p><a href="${Music1.uri}">${Music1.name}</a></p>
        <p><a href="${Music2.uri}">${Music2.name}</a></p>
        <p><a href="${Music4.uri}">${Music4.name}</a></p>
        
        `;
        // Fazer com que o 3 gere a uri que direcione para o artista no spotify no titulo da msc.
        // Depois retirar o mecanismo de busca,porque não servir mais 

    }else{
        console.log("Track não localizada !!!");
    }
}




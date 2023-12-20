const myHeaders = new Headers();
myHeaders.append("X-API-KEY", "f3dc858ba7740913e941fa7d57aa7fdfc9fc461a");
myHeaders.append("Content-Type", "application/json");

function formularioArtista() {
  var nomeArtista = document.getElementById('artist').value;

  const raw = JSON.stringify({
    "q": nomeArtista + "spotify",
    "gl": "br",
    "hl": "pt-br"
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://google.serper.dev/search", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      filtrarPesquisa(result);
      console.log(result);
    })
    .catch(error => console.log('error', error));
}

function filtrarPesquisa(resultadoPesquisa) {
  var mostrarResult = document.getElementById('artista');

  if (resultadoPesquisa.organic && resultadoPesquisa.organic.length > 0) {
    const resultado = resultadoPesquisa.organic[0];
    const resultadoInfo = {
      link: resultado.link,
      titulo: resultado.title
    };

    mostrarResult.innerHTML = `
      <p>${resultadoInfo.titulo}</p>
      <p>${resultadoInfo.link}</p>
    `;

    const url = resultadoInfo.link;
    const id = url.substring(url.lastIndexOf("/") + 1);
    console.log(id);
    searchId(id);
  } else {
    mostrarResult.innerHTML = `<h1>Nada encontrado</h1>`;
  }
}

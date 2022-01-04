

function handler(e){
    e.preventDefault()   //ao clicar no botao nao ira para lugar nenhum

    let movie = document.querySelector('.form__input').value //pegar o valor do que o usuario digitar
    if(movie){
        
    const _url = `http://www.omdbapi.com/?s=${movie}&apikey=4d42f43b`;
    const _options ={
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        cache: 'default'
    }

    fetch(_url, _options)
    .then(function(response){ //caso ocorra um erro
        if(!response.ok) throw new Error('Erro ao executar função');

        //retornar objeto no formato json
        return response.json();
    })
    .then(function(data){
        let newContent = '';
        for(let i = 1; i < data.Search.length ; i++){//pegando os atributos dos filmes
            newContent += `<li class="app-movies-all__card">`;
            newContent += `<figure class="app-movies-all__figure">`;
            newContent += `<img class="app-movies-all__thumb" src="${data.Search[i].Poster}"/>`;
            newContent += `</figure>`;
            newContent += `<legend class="app-movies-all__legend">`;
            newContent += `<span class="app-movies-all__year">${data.Search[i].Year}</span>`;
            newContent += `<h2 class="app-movies-all__title">${data.Search[i].Title}</h2>`;
            newContent += `</legend>`;
            newContent += `</li>`;
        }

        document.getElementById('movies').innerHTML = newContent

        })

    } else{
        alert('Digite um nome de um filme')
    }
}

window.onload = () => {
    const submit = document.querySelector('.form__submit');
    submit.addEventListener('click', handler); //ao clicar, chama a função handler
}
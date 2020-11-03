// ======== declarartion and assignment of variables =========
const storageName = 'movies';
const noMoviesMsg = "Ooops! you have an empty Movies list Now, try adding some movies";
var tableContainer = document.querySelector('.table-container');
var allMovies = [];


window.addEventListener('load', () => {
    init();
    addSubmitEvent();
});

// initialization of localStorage and setting up of page display 
let init = () => {
    let hasMovies = localStorage.getItem(storageName);
    if( hasMovies ){
        allMovies = JSON.parse(hasMovies);
        renderMovies();
    } else {
        localStorage.setItem(storageName, JSON.stringify([]));
        doNoMovies();
    }
}

let addSubmitEvent = () => {
    let form = document.querySelector('#form');
    form.addEventListener('submit', e => {
        if (title.value.length === 0 || rating.value.length === 0 ) {
            alert('Oops!!!, movie title or rating field is empty')
        } else {
            e.preventDefault();
            saveMovies(e.currentTarget);
            title.value = rating.value = ''
        }
    })
}

let getMovies = () => {
    return JSON.parse(localStorage.getItem(storageName));
}

let doNoMovies = () => {
    // noMoviesMsg.addClass = ('empty-message')
    tableContainer.innerHTML = noMoviesMsg;
}

let saveMovies = (form) => {
    let title = form.elements.namedItem('movie-title').value;
    let rating = form.elements.namedItem('movie-rating').value;
    if(!title.trim() || !rating) return;
    let id = getLastId() + 1;
    let movieData = {
        id,
        title,
        rating,
    };
    allMovies.push(movieData);
    updateLs();
    renderMovies(allMovies);
    console.log(renderMovies(allMovies))
}

let updateLs = () => {
    localStorage.setItem(storageName, JSON.stringify(allMovies));
}

let renderMovies = () => {
    let movies = allMovies;
    if(movies.length){
        let table = `<table class="table">
        <thead class="thead-light">
            <tr>
                <th scope="col-3" class="text-center">S/N</th>
                <th scope="col-3" class="text-center">MOVIE TITLE</th>
                <th scope="col-3" class="text-center">MOVIE RATING</th>
                <th scope="col-3" class="text-center">ACTIONS</th>
            </tr>
        </thead>
        <tbody>
        `;
        movies.forEach((movie, idx) => {
           table+=`<tr>
            <td scope="col-3" class="text-center">${idx + 1}</td>
            <td scope="col-3" class="text-center">${movie.title}</td>
            <td scope="col-3" class="text-center">${movie.rating}</td>
            <td scope="col-3" class="text-center">
                <button id="btn-clear" class="btn bg-danger text-light" data-id="${movie.id}">delete</button>
            </td>
            </tr>`;
        });
        tableContainer.innerHTML = table;
        addRemoveEvent();
    } else {
        doNoMovies();
    }
}

let getLastId = () => {
    let movies = allMovies;
    let moviesLen = movies.length;
    let r = moviesLen ? movies[moviesLen - 1]['id'] : 1;
    return r;
}

let removeMovie = (id) => {
    if(id){
        allMovies.forEach((movie, idx) => {
            if(movie.id == id){
                allMovies.splice(idx, 1);
            }
        });
    } else {
        allMovies = [];
    }
    renderMovies();
    updateLs();
}

let addRemoveEvent = () => {
    let deletebtns = [... document.querySelectorAll('#btn-clear')];
    deletebtns.forEach(deletebtn => {
        deletebtn.addEventListener('click', e => {
            removeMovie(e.currentTarget.dataset.id);
        })
    });
}


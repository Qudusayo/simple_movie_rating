const d = document;
const storageName = 'movies';
const noMoviesMsg = "No Movies Now";
let movieCont = d.querySelector('.movies-list');
let allMovies = [];
window.addEventListener('load', () => {
    init();
    addSubmitEvent();
});
function init(){
    let hasMovies = localStorage.getItem(storageName);
    if( hasMovies ){
        allMovies = JSON.parse(hasMovies);
        renderMovies();
    } else {
        localStorage.setItem(storageName, JSON.stringify([]));
        doNoMovies();
    }
}
function addSubmitEvent(){
    let form = d.querySelector('.movie-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveMovies(event.currentTarget);
    })
}
function getMovies(){
    return JSON.parse(localStorage.getItem(storageName));
}
function doNoMovies(){
    movieCont.innerHTML = noMoviesMsg;
}
function saveMovies(form){
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
}
function updateLs(){
    localStorage.setItem(storageName, JSON.stringify(allMovies));
}
function createHeaderRow(){
    let headerContent = ['S/N', 'MOVIE TITLE', 'MOVIE RATING', 'ACTIONS'];
    let tr = document.createElement('tr');
    for(let i = 0; i < headerContent.length; i++){
        let td = document.createElement('td');
        td.innerHTML = headerContent[i] ;
        tr.appendChild(td);
    }
    return tr;
}

function renderMovies(){
    let movies = allMovies;
    if(movies.length){
        let table = `<table>
        <thead>
            <tr>
                <td>S/N</td>
                <td>MOVIE TITLE</td>
                <td>MOVIE RATING</td>
                <td>ACTIONS</td>
            </tr>
        </thead>
        <tbody>
        `;
        movies.forEach((movie, idx) => {
           table+=`<tr>
            <td>${idx}</td>
            <td>${movie.title}</td>
            <td>${movie.rating}</td>
            <td>
                <button class="delete" data-id="${movie.id}">delete</button>
            </td>
            </tr>`;
        });
        movieCont.innerHTML = table;
        addRemoveEvent();
    } else {
        doNoMovies();
    }
}
function getLastId(){
    let movies = allMovies;
    let moviesLen = movies.length;
    let r = moviesLen ? movies[moviesLen - 1]['id'] : 1;
    return r;
}
function removeMovie(id){
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
function addRemoveEvent(){
    let deletebtns = [... d.querySelectorAll('.delete')];
    deletebtns.forEach(deletebtn => {
        deletebtn.addEventListener('click', (event) => {
            removeMovie(event.currentTarget.dataset.id);
        }) 
    });
}
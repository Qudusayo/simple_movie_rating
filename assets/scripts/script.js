// Components
const addMovie = document.querySelector("#form");

const title = document.querySelector("#title");
const rating = document.querySelector("#rating");

const tableContent = document.querySelector('.table-content');

// Variables
let movies = [];
// let x = 0;
let id = 0;

// Functions
let syncMovie = () => {
    const movieRate = (id,title, rate, remove) =>`
    <tr>
        <td class="text-center">${id}</td>
        <td class="text-center">${title}</td>
        <td class="text-center">${rate}</td>
        <td class="text-right">
            <button class="btn btn-danger" onClick="removeId(${remove})">Delete</button>
        </td>
    </tr>
    `
    tableContent.innerHTML = ''
    movies.forEach(movie => {
        tableContent.innerHTML += movieRate(movie.id,movie.title, movie.rating, movie.remove);
    })
}

let removeId = (remove) => {
    const remains = movies.filter((movie) => movie.remove !== remove);
    movies = remains;
    syncMovie()
}

// EventListeners
addMovie.addEventListener("submit", (e) => {
    e.preventDefault();
    id++

    movies.unshift({
        id: id,
        title: title.value,
        rating: rating.value,
        remove: remove.value
    });

    syncMovie();
    title.value = rating.value = ''
});
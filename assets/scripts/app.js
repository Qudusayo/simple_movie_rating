// Components
const addMovie = document.querySelector("#form");
const title = document.querySelector("#title");
const rating = document.querySelector("#rating");
const tableContent = document.querySelector('.table-content');

// Variables
let movies = [], id = 0, remove

// Functions
let loadMovies = () => {
    const movieRating = (id,title, rate, deleteId) =>`
    <tr>
        <td class="text-center">${id}</td>
        <td class="text-center">${title}</td>
        <td class="text-center">${rate}</td>
        <td class="text-right">
            <button class="btn btn-danger" onClick="removeId(${deleteId})">Delete</button>
        </td>
    </tr>
    `
    tableContent.innerHTML = ''
    movies.forEach(movie => {
        tableContent.innerHTML += movieRating(movie.id,movie.title, movie.rating, movie.remove);
    })
}

let removeId = (remove) => {
    const remains = movies.filter((movie) => movie.remove !== remove);
    movies = remains;
    loadMovies()
}

// event listener that submit the movies to the table
addMovie.addEventListener("submit", e => {
    e.preventDefault();
    id++
    movies.push({
        id: id,
        title: title.value,
        rating: rating.value,
        // remove: remove.value
    });

    loadMovies();
    title.value = rating.value = ''
});
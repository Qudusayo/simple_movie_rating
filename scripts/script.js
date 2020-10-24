// Components
const addMovie = document.querySelector("#addMovie");

const title = document.querySelector("#title");
const rating = document.querySelector("#rating");

const tableContent = document.querySelector('.table-content');

// Variables
var movies = [];
let x = 0;

// Functions
function syncMovie(){
    const movieRate = (title, rate, id) =>`
    <tr>
        <td class="text-center">${title}</td>
        <td class="text-center">${rate}</td>
        <td class="text-right">
            <button class="btn btn-danger" onClick="removeId(${id})">Delete</button>
        </td>
    </tr>
    `
    tableContent.innerHTML = ''
    movies.forEach(movie => {
        tableContent.innerHTML += movieRate(movie.title, movie.rating, movie.id);
    })
}

function removeId(id){
    const remains = movies.filter((movie) => movie.id !== id);
    movies = remains;
    syncMovie()
}

// EventListeners
addMovie.addEventListener("click", (e) => {
    e.preventDefault();
    x++

    movies.unshift({
        title: title.value,
        rating: rating.value,
        id: x
    });

    syncMovie();
    title.value = rating.value = ''
});
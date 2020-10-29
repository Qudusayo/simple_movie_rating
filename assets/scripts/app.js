// ======== components =========
const addMovie = document.querySelector("#form");
const title = document.querySelector("#title");
const rating = document.querySelector("#rating");
const tableContent = document.querySelector('.table-content');
const btnClear = document.querySelector("#btn-clear");

// ====== functions to create table row ======
let loadMovies = (movies) => {
    const movieRating = (id,title, rate, remove) =>`
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
        tableContent.innerHTML += movieRating(movie.id,movie.title, movie.rating, movie.remove);
    })
}

let movies = [], id = 0;

const movieFromLS = localStorage.getItem('movie');
// console.log(movieFromLS)
if(movieFromLS) {
    const parseMovies = JSON.parse(movieFromLS)
    movies = parseMovies
    id = movies.length;
    loadMovies(movies);
}



let removeId = (remove) => {
    const remains = movies.filter((movie) => movie.remove !== remove);
    localStorage.setItem('movie',JSON.stringify(remains));
    // console.log(remove)
    loadMovies(remains)
}

// =======  event listener that submit the movies to the table =========
addMovie.addEventListener("submit", e => {
    if (title.value.length === 0 || rating.value.length === 0 ) {
        alert('Opps!!!, movie title or rating field is empty')
    } else {
        e.preventDefault();
        id++
        movies.push({
            id: id,
            title: title.value,
            rating: rating.value,
            remove: id
        });
        loadMovies(movies);
        localStorage.setItem('movie', JSON.stringify(movies))
        title.value = rating.value = ''
    }
    
});

// ==== localstorage clear =======
btnClear.addEventListener('click', () => {
    localStorage.clear()
    // const fetchMovie = loadMovies(movies);
    // localStorage.setItem('movie',JSON.stringify(fetchMovie));
})
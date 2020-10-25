// Components
const addMovie = document.querySelector("#form");
const title = document.querySelector("#title");
const rating = document.querySelector("#rating");
const tableContent = document.querySelector('.table-content');


let saveMovie = [], count = 0
let movies = localStorage.getItem('Movie')

addMovie.addEventListener('submit', e => {
  e.preventDefault()
  addMovies()
})

let displayMovie = () => {
  if (saveMovie.length <= 0) {
    alert('Empty list')
  } else {
    alert('movie list')
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
        tableContent.innerHTML += addMovies(movie.id,movie.title, movie.rating, movie.remove);
    })
  }
}
// if (movies) {
//   saveMovie = JSON.parse(movies)
//   id = saveMovie.length
//   syncMovies(saveMovie)
// } else {
//   saveMovie = []
//   id = 0
// }

// let syncMovies = (array) =>{
//   array.forEach( movie => {
//     addMovies(movie.id, movie.title, movie.rate, movie.delete)
//   })
// }

// let addMovies = (id,name, rate, remove) => {
//   if (remove) return;
//     const movie = `
//     <tr>
//         <td class="text-center">${id}</td>
//         <td class="text-center">${name}</td>
//         <td class="text-center">${rate}</td>
//         <td class="text-right">
//             <button class="btn btn-danger" onClick="removeId(${remove})">Delete</button>
//         </td>
//     </tr> `
// }

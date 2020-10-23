// Components
const addMovie = document.querySelector("#addMovie");
const title = document.querySelector("#title");
const rating = document.querySelector("#rating");

// Variables
const movies = [
    {
        title: "Mark Otto",
        rating: 4,
    },
    {
        title: "Jacob Thornton",
        rating: 7,
    },
    {
        title: "Larry the Bird",
        rating: 2,
    },
];

// EventListeners
addMovie.addEventListener("click", (e) => {
    e.preventDefault();
    movies.push({
        title: title.value,
        rating: rating.value,
    });
    console.log(movies);
});

// Functions

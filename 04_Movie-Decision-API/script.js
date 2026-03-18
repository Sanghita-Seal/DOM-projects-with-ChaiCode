const submitBtn = document.getElementById("search-btn");
const inputElement = document.getElementById("search-box");

const resultscontainer = document.getElementById("results-container");
const movieDetailsContainer = document.getElementById("movie-details");


async function showDetails(imdbID) {
  const apiUrl = `https://www.omdbapi.com/?apikey=5404e692&i=${imdbID}`;
  
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    movieDetailsContainer.innerHTML = "";
    
    
    movieDetailsContainer.innerHTML = `
    <img src="${data.Poster}" alt="${data.Title}">
    <h3>${data.Title}</h3>  
    <p><strong>Year:</strong> ${data.Year}</p>
    <p><strong>Type:</strong> ${data.Type}</p>
    <p><strong>Genre:</strong> ${data.Genre}</p>
    <p><strong>Plot:</strong> ${data.Plot}</p>
    <p><strong>Language:</strong>Language: ${data.Language}</p>
    <p><strong>Director:</strong>Director: ${data.Director}</p>
    <p><strong>Actor:</strong> ${data.Actor}</p>
    <p><strong>Writer:</strong> ${data.Writer}</p>
    <p><strong>Rating:</strong> ${data.Type[1].Rating }</p>
    
`;
    
  } catch (error) {
    console.log(error);
    movieDetailsContainer.innerHTML == "Movie could not be found";
  }
  
    
  
}

async function fetchApiData(inputElement) {
  //Validate input
  const inputVal = inputElement.value.trim(); // get fresh value every click

  console.log(inputVal);
  if (inputVal === "") {
    alert("Search is empty");
    return;
  }

  const apiUrl = `https://www.omdbapi.com/?apikey=5404e692&s=${inputVal}`;
  console.log(apiUrl);
  resultscontainer.textContent = "Loading...";
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.log(error);
    resultscontainer.innerHTML = "Movie could not be found";
  }
}
function displayData(data) {
  console.log(data);
  if (data.Response === "False") {
    resultscontainer.innerHTML = "Movie not found!";
  }
  resultscontainer.innerHTML = "";
  data.Search.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <h3>${movie.Title}</h3>
    <p>Year: ${movie.Year}</p>
    <p>Type: ${movie.Type}</p>
`;

    const btn = document.createElement("button");
    btn.textContent = "View Details";

    // Attach event properly
    btn.addEventListener("click", () => showDetails(movie.imdbID));

    movieCard.appendChild(btn);
    resultscontainer.appendChild(movieCard);
  });
}
submitBtn.addEventListener("click", () => fetchApiData(inputElement));

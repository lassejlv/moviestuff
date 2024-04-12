import "./style.dist.css";

interface Movie {
  id: string;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  image_full_url: string;
}

const API_URL = "http://localhost:5001";

async function SearchMovies(q: string) {
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(q)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies from The Movie Database");
  }

  const data = (await response.json()) as Movie[];

  return data;
}

const Button = document.getElementById("searchBtn") as HTMLButtonElement;
const Input = document.getElementById("searchInput") as HTMLInputElement;

// Listen for enter key
Input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    Button.click();
  }
});

function Card(movie: Movie) {
  return `
    <div class="bg-[#242626] border-2 border-darkBorder rounded-[8px] p-4">
      <img src=${
        movie.image_full_url || "https://via.placeholder.com/500"
      } alt="${
    movie.id
  }" class="w-full h-52 object-cover rounded-[8px] bg-blur">
        <h1 class="text-xl font-bold text-white mt-2">${movie.title}</h1>
        <p class=" mt-2 text-sm text-gray-300">
          ${movie.overview.slice(0, 100)}
          ${movie.overview.length > 100 ? "..." : ""}

          ${
            movie.overview.length > 100
              ? `<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="text-blue-500 hover:underline">Read more</a>`
              : ""
          }
        </p>
     </div>
  `;
}

Button.onclick = async () => {
  const { value } = Input;
  if (!value) return;

  try {
    const movies = await SearchMovies(value);

    const MovieContainer = document.getElementById("movies") as HTMLDivElement;
    MovieContainer.innerHTML = "";

    movies.forEach((movie) => {
      MovieContainer.innerHTML += Card(movie);
    });
  } catch (error) {
    console.error(error);
  }
};

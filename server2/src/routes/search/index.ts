import { Failure, SendJSON, query } from "probun";
import { env } from "../../env";

export async function GET(req: Request): Promise<Response> {
  const movieQuery = await query("q", req);
  if (!movieQuery) return Failure("Missing query parameter 'q'");

  try {
    const movies = await SearchMovies(movieQuery);
    return SendJSON(movies);
  } catch (error: any) {
    return Failure(error.message);
  }
}

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

async function SearchMovies(q: string) {
  const themoviedbRes = await fetch(
    `https:api.themoviedb.org/3/search/movie?api_key=${env.API_KEY}&query=${q}`
  );

  if (!themoviedbRes.ok) {
    throw new Error("Failed to fetch movies from The Movie Database");
  }

  const { results } = (await themoviedbRes.json()) as { results: Movie[] };

  return results.map((movie) => ({
    ...movie,
    image_full_url: `https:image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));
}

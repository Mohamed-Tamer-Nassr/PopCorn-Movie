import { useEffect, useState } from "react";

export function useMovie(query, KEY) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function MovieRender() {
        try {
          setIsLoading(true);
          setError(""); // Clear previous errors
          setMovies([]); // Clear previous movies

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(data.Error || "The movie was not found");
          }

          if (!data.Search || data.Search.length === 0) {
            throw new Error("No movies found");
          }
          setMovies(data.Search);
          setError(""); // Clear any previous errors on success
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Error fetching movie data:", error);
            setError(error.message);
            setMovies([]); // Clear movies on error
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      // handleCloseDetails();
      MovieRender();
      return function () {
        controller.abort(); // Abort the fetch request if the component unmounts or query changes
      };
    },
    [query] // Add controller.signal to the dependency array
  );
  return { movies, isLoading, error };
}

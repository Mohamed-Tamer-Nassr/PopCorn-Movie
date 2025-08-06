import { useEffect, useState } from "react";
import StarRating from "./StarRating";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "f341442e";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2);
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movieRatings, setMovieRatings] = useState({});
  // Add this near your other state declarations in App component
  // Add this function in App component
  function handleRating(movieId, rating) {
    setMovieRatings((prev) => ({
      ...prev,
      [movieId]: rating,
    }));
  }
  function handleSelectMovie(id) {
    setSelectedId((currentId) => (currentId === id ? null : id));
  }
  function handleCloseDetails() {
    setSelectedId(null);
  }
  function handleDeleteMovie(id) {
    setWatched((currentWatched) =>
      currentWatched.filter((movie) => movie.imdbID !== id)
    );
  }
  useEffect(
    function () {
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && selectedId) {
          handleCloseDetails();
        }
        return function () {
          document.removeEventListener("keydown", handleCloseDetails);
        };
      });
    },
    [selectedId]
  );
  function handleAddWatched(movie) {
    if (watched.some((m) => m.imdbID === movie.imdbID)) {
      setWatched((currentWatched) =>
        currentWatched.map((m) =>
          m.imdbID === movie.imdbID ? { ...m, userRating: movie.userRating } : m
        )
      );
    } else {
      setWatched((currentWatched) => [...currentWatched, movie]);
    }
  }
  const controller = new AbortController();
  useEffect(
    function () {
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
      handleCloseDetails();
      MovieRender();
      return function () {
        controller.abort(); // Abort the fetch request if the component unmounts or query changes
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : !query ? (
            <Welcome />
          ) : error ? (
            <Error message={error} />
          ) : movies.length > 0 ? (
            <MovieList
              movies={movies}
              setMovies={setMovies}
              onSelect={handleSelectMovie}
            />
          ) : (
            <Error message="No movies found with that Name" />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onClose={handleCloseDetails}
              onAddWatched={handleAddWatched}
              watched={watched}
              setWatched={setWatched}
              onSetRating={handleRating}
              movieRatings={movieRatings}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                setWatched={setWatched}
                onDelete={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}
function Error({ message }) {
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  );
}
function Welcome() {
  return (
    <p className="welcome">
      <span role="img">👋</span> Welcome to usePopcorn!
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function NumResults({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className="num-results">No results found</p>;
  }
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function MovieList({ movies, onSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelect }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function MovieDetails({
  selectedId,
  onClose,
  onAddWatched,
  onSetRating,
  movieRatings,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  function handleSetRating(rating) {
    setUserRating(rating);
    onSetRating(selectedId, rating);
  }
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reset after animation
    onClose();
  };
  const [movie, setMovie] = useState({});
  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    Plot: plot,
    ReleaseDate: releaseDate,
    Actors: actors,
    Director: director,
    Writer: writer,
    Genre: genre,
    imdbRating,
  } = movie;
  function handleAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating: userRating,
    };
    onAddWatched(newWatchedMovie);
    onClose();
  }

  useEffect(
    function () {
      async function MovieDetailsRender() {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await response.json();
        // console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      MovieDetailsRender();
    },
    [selectedId]
  );
  // Update the document title when the component mounts
  // This effect runs when the component mounts or when the title changes

  useEffect(
    function () {
      if (!title) return; // Prevent setting title if title is not available
      document.title = `usePopcorn | ${title || "Movie Details"}`;
      // Cleanup function to reset the title when the component unmounts
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              onClick={handleClick}
              className={`btn-back ${isClicked ? "clicked" : ""}`}
            >
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{releaseDate}</p>
              <p>{genre} </p>
              <p>
                <span>⭐️</span>
                <span>{imdbRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{runtime}</span>
              </p>
            </div>
          </header>
          <section>
            <StarRating
              maxRating={10}
              size={24}
              onSetRating={handleSetRating}
              defaultRating={movieRatings[selectedId] || 0}
            />
            {movieRatings[selectedId] > 0 ? (
              <button className="btn-add" onClick={() => handleAddWatched()}>
                + Add to Watchlist
              </button>
            ) : null}
            <p>
              <em>Plot</em>
            </p>
            <p>{plot}</p>
            <p>
              <em>Cast</em>
            </p>
            <p>{actors}</p>
            <p>
              <em>Director</em>
            </p>
            <p>{director}</p>
            <p>
              <em>Writer</em>
            </p>
            <p>{writer}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie, onDelete }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}

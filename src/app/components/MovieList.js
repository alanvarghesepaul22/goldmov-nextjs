"use client";

import { useState } from "react";

export default function MovieList({
  movies,
  addMovie,
  updateMovie,
  deleteMovie,
}) {
  const [movieList, setMovieList] = useState(movies);
  const [newMovie, setNewMovie] = useState("");
  const [hasChanged, setHasChanged] = useState({});
  const [firstInputChanged, setFirstInputChanged] = useState(false);


  const handleAddMovie = async () => {
    if (newMovie.trim() === "") return;

    await addMovie(newMovie);
    setNewMovie("");
    setMovieList([...movieList, { title: newMovie, watched: false }]);
    console.log("Added new movie");
  };

  const handleFirstChange = (id) => {
    // Function that triggers only on the first input change
    console.log(`First change detected for movie with ID: ${id}`);
    setFirstInputChanged(true)
  };

  const handleInputChange = (id, value) => {
    // If it is the first change, trigger the handleFirstChange function
    if (!hasChanged[id]) {
      handleFirstChange(id);
      setHasChanged({ ...hasChanged, [id]: true }); // Mark this movie as changed
    }

    // Update the edit state
    setMovieList(
      movieList.map((movie) =>
        movie._id === id ? { ...movie, title: value } : movie
      )
    );
  };

  const handleUpdateMovie = async (id, updatedTitle, watched) => {
    await updateMovie(id, updatedTitle, watched);
    setMovieList(
      movieList.map((movie) =>
        movie._id === id ? { ...movie, title: updatedTitle, watched } : movie
      )
    );
    console.log("Updated movie");
  };

  const handleDeleteMovie = async (id) => {
    await deleteMovie(id);
    setMovieList(movieList.filter((movie) => movie._id !== id));
    console.log("Deleted movie");
  };

  return (
    <div>
      <h1>Movie List</h1>
      <input
        type="text"
        value={newMovie}
        onChange={(e) => setNewMovie(e.target.value)}
        placeholder="Add new movie"
        className="bg-gray-200 p-2"
      />
      <button onClick={handleAddMovie} className="bg-blue-500 text-white p-2">
        Add
      </button>

      <ul className="m-10">
        {movieList.map((movie, index) => (
          <li key={index} className="p-1">
            <input
              type="text"
              value={movie.title}
              onChange={(e) => handleInputChange(movie._id, e.target.value)}
              className="bg-gray-100 p-2"
            />
{
  firstInputChanged ?  <button
              onClick={() => handleUpdateMovie(movie._id, movie.title, movie.watched)}
              className="bg-yellow-500 text-white p-2 mx-4"
            >
              Update
            </button>
            : ""
}
           

            <button
              onClick={() =>
                handleUpdateMovie(movie._id, movie.title, !movie.watched)
              }
              className={
                movie.watched
                  ? "bg-green-400 text-white p-2 mx-4"
                  : "bg-red-400 text-black p-2 mx-4"
              }
            >
              {movie.watched ? "Watched" : "Not Watched"}
            </button>
            <button
              onClick={() => handleDeleteMovie(movie._id)}
              className="bg-red-400 text-white p-2 mx-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

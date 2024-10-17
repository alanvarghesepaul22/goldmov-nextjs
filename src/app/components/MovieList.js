"use client";

import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX, Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

export default function MovieList({
  movies,
  addMovie,
  updateMovie,
  deleteMovie,
}) {
  const [movieList, setMovieList] = useState(movies);
  const [newMovie, setNewMovie] = useState("");
  const [hasChanged, setHasChanged] = useState({}); // Track changes for each movie

  const handleAddMovie = async () => {
    if (newMovie.trim() === "") return;

    await addMovie(newMovie);
    setNewMovie("");
    setMovieList([...movieList, { title: newMovie, watched: false }]);
    console.log("Added new movie");
  };

  const handleInputChange = (id, value) => {
    // Mark the movie as changed on first input change
    setHasChanged({ ...hasChanged, [id]: true });

    // Update the movieList with the new input value
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
    setHasChanged({ ...hasChanged, [id]: false }); // Reset change tracking after update
    console.log("Updated movie");
  };

  const handleDeleteMovie = async (id) => {
    await deleteMovie(id);
    setMovieList(movieList.filter((movie) => movie._id !== id));
    console.log("Deleted movie");
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 mt-4">
      <h1 className="font-bold text-3xl text-yellow-500">GoldMov</h1>
      <div className="flex justify-center items-center  gap-4 mt-10">
        <input
          type="text"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          placeholder="Add new movie...."
          className="bg-stone-100 px-4 py-2 rounded-sm"
        />
        <Button
          onClick={handleAddMovie}
          className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 px-5 "
        >
          <Plus />
          <p>Add</p>
        </Button>
      </div>

      <ul className="m-10">
        {movieList.map((movie, index) => (
          <li key={index} className="p-1 flex justify-center items-center gap-1">
            <div className="flex relative  bg-stone-100  items-center rounded-sm">
              <input
                type="text"
                value={movie.title}
                onChange={(e) => handleInputChange(movie._id, e.target.value)}
                className={`p-2 bg-transparent outline-none ${
                  hasChanged[movie._id] ? "w-[80%]" : ""
                } `}
              />
              {hasChanged[movie._id] ? (
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleUpdateMovie(movie._id, movie.title, movie.watched)
                  }
                  className="p-2 mx-1 z-40 right-0 absolute"
                >
                  <Pencil className="text-stone-600"/>
                </Button>
              ) : (
                ""
              )}
            </div>

            <Button
              onClick={() =>
                handleUpdateMovie(movie._id, movie.title, !movie.watched)
              }
              className={
                movie.watched
                  ? "bg-green-400 text-white p-3 mx-3"
                  : "bg-red-400 text-white p-3 mx-3"
              }
              title={movie.watched ? "Mark it not done" : "Mark it done"}
            >
              {movie.watched ? <CircleCheckBig /> : <CircleX />}
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleDeleteMovie(movie._id)}
              className="bg-stone-100 hover:bg-stone-200 p-3 mx-1"
              title="Delete"
            >
              <Trash className="text-red-400" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

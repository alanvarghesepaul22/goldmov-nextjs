import connectToDatabase from "@/lib/mongodb";
import Movie from "@/models/Movie";
import MovieList from "../components/MovieList";

export const dynamic = 'force-dynamic'; // Use dynamic rendering

// Server action: Add a movie
export async function addMovie(newTitle) {
  'use server';
  await connectToDatabase();
  const newMovie = new Movie({ title: newTitle });
  await newMovie.save();
}

// Server action: Update a movie (mark as watched/unwatched or edit title)
export async function updateMovie(id, updatedTitle, watched) {
  'use server';
  await connectToDatabase();
  await Movie.findByIdAndUpdate(id, { title: updatedTitle, watched });
}

// Server action: Delete a movie
export async function deleteMovie(id) {
  'use server';
  await connectToDatabase();
  await Movie.findByIdAndDelete(id);
}

// Server component to fetch and pass data to the client
export default async function HomePage() {
  await connectToDatabase();
  
  // Use .lean() to get plain objects, then sanitize them
  const movies = await Movie.find({}).lean();

  // Convert _id to string and remove unwanted fields
  const sanitizedMovies = movies.map(movie => ({
    _id: movie._id.toString(),  // Convert ObjectId to string
    title: movie.title,
    watched: movie.watched
  }));

  return (
    <MovieList 
      movies={sanitizedMovies}  // Pass sanitized movies
      addMovie={addMovie} 
      updateMovie={updateMovie} 
      deleteMovie={deleteMovie} 
    />
  );
}

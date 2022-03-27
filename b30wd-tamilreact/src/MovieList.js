import { Movie } from './App';

export function MovieList({ movieList }) {
  return <div className="movie-list">
    {movieList.map(({ name, poster, rating, summary }, index) => (
      <Movie
        key={index}
        name={name}
        poster={poster}
        rating={rating}
        summary={summary} />
    ))}
  </div>;
}

import React from 'react';
import MovieCard from './MovieCard';


export default function MovieList({ movies, onRefresh }) {
if (!movies || movies.length === 0) return <p>Loading movies…</p>;


return (
<div className="movie-list">
{movies.map(m => (
<MovieCard key={m.id} movie={m} onRefresh={onRefresh} />
))}
</div>
);
}
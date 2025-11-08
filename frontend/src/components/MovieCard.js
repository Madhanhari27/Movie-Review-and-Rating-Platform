import React, { useState } from 'react';
import AddReview from './AddReview';


export default function MovieCard({ movie, onRefresh }) {
const [showDetails, setShowDetails] = useState(false);


return (
<div className="movie-card">
<img src={movie.poster} alt={movie.title} />
<div className="movie-info">
<h2>{movie.title} <span>({movie.year})</span></h2>
<p>Average Rating: {movie.averageRating ?? 0} / 5 ({movie.reviewsCount} reviews)</p>
<button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'Show'} reviews</button>


{showDetails && (
<div className="reviews">
{movie.reviews && movie.reviews.length > 0 ? (
movie.reviews.map((r, i) => (
<div key={i} className="review">
<strong>{r.name}</strong> — {r.rating}/5
<p>{r.text}</p>
</div>
))
) : (
<p>No reviews yet. Be the first!</p>
)}


<AddReview movieId={movie.id} onRefresh={onRefresh} />
</div>
)}
</div>
</div>
);
}
import React, { useEffect, useState } from 'react';
import MovieList from './components/MovieList';


export default function App() {
const [movies, setMovies] = useState([]);


useEffect(() => {
fetch('http://localhost:5000/api/movies')
.then(r => r.json())
.then(setMovies)
.catch(err => console.error(err));
}, []);


return (
<div className="app">
<header>
<h1>Movie Review & Rating — Thalapathy Vijay</h1>
<p>A simple hackathon demo (Node + React). Only Thalapathy Vijay films included.</p>
</header>


<main>
<MovieList movies={movies} onRefresh={() => {
fetch('http://localhost:5000/api/movies')
.then(r => r.json())
.then(setMovies);
}} />
</main>


<footer>
<small>Hackathon demo — modify and extend for your submission.</small>
</footer>
</div>
);
}

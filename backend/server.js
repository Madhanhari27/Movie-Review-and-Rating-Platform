// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Path to movie data
const DATA_PATH = path.join(__dirname, 'movies.json');

// Helper functions
function readData() {
  const raw = fs.readFileSync(DATA_PATH);
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// Helper to compute average rating
function computeAverage(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((total, r) => total + Number(r.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10; // round to 1 decimal
}

// -----------------------------------------------------------------------------
// 1️⃣ GET /api/movies — Get all movies
// -----------------------------------------------------------------------------
app.get('/api/movies', (req, res) => {
  const movies = readData();
  const withAverages = movies.map(movie => ({
    ...movie,
    averageRating: computeAverage(movie.reviews),
    reviewsCount: movie.reviews.length
  }));
  res.json(withAverages);
});

// -----------------------------------------------------------------------------
// 2️⃣ GET /api/movies/:id — Get one movie by ID
// -----------------------------------------------------------------------------
app.get('/api/movies/:id', (req, res) => {
  const movies = readData();
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  movie.averageRating = computeAverage(movie.reviews);
  movie.reviewsCount = movie.reviews.length;
  res.json(movie);
});

// -----------------------------------------------------------------------------
// 3️⃣ POST /api/movies/:id/reviews — Add a new review
// -----------------------------------------------------------------------------
app.post('/api/movies/:id/reviews', (req, res) => {
  const { name, rating, text } = req.body;

  if (!name || !rating) {
    return res.status(400).json({ error: 'Name and rating are required' });
  }

  const movies = readData();
  const movieIndex = movies.findIndex(m => m.id === req.params.id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const newReview = {
    name,
    rating: Number(rating),
    text: text || ''
  };

  movies[movieIndex].reviews.push(newReview);
  writeData(movies);

  const updatedMovie = movies[movieIndex];
  updatedMovie.averageRating = computeAverage(updatedMovie.reviews);
  updatedMovie.reviewsCount = updatedMovie.reviews.length;

  res.status(201).json(updatedMovie);
});

// -----------------------------------------------------------------------------
// Start the backend server
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));

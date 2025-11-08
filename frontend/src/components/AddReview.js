import React, { useState } from 'react';


export default function AddReview({ movieId, onRefresh }) {
const [name, setName] = useState('');
const [rating, setRating] = useState(5);
const [text, setText] = useState('');
const [loading, setLoading] = useState(false);


function submit(e) {
e.preventDefault();
setLoading(true);
fetch(`http://localhost:5000/api/movies/${movieId}/reviews`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, rating, text })
})
.then(r => r.json())
.then(() => {
setName('');
setRating(5);
setText('');
onRefresh?.();
})
.catch(err => console.error(err))
.finally(() => setLoading(false));
}


return (
<form className="add-review" onSubmit={submit}>
<h4>Add review</h4>
<input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
<select value={rating} onChange={e => setRating(e.target.value)}>
<option value={5}>5</option>
<option value={4}>4</option>
<option value={3}>3</option>
<option value={2}>2</option>
<option value={1}>1</option>
</select>
<textarea value={text} onChange={e => setText(e.target.value)} placeholder="Your thoughts (optional)" />
<button type="submit" disabled={loading}>{loading ? 'Posting…' : 'Post review'}</button>
</form>
);
}

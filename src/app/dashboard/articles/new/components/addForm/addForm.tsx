'use client';
import { FormEvent } from 'react';

export default function AddForm() {
	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const response = await fetch('/api/articles', {
			method: 'PUT',
			body: formData,
		});

		// Handle response if necessary
		const data = await response.json();
		// ...
	}

	return (
		<form onSubmit={onSubmit}>
			<label htmlFor="title">Title</label>
			<input type="text" name="title" id="title" />
			<label htmlFor="content">Content</label>
			<input type="text" name="content" id="content" />
			<button type="submit">Submit</button>
		</form>
	);
}

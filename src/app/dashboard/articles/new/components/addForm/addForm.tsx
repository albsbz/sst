'use client';
import { createArticle } from '@/app/actions/createArticle';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button type="submit" aria-disabled={pending}>
			Add
		</button>
	);
}

const initialState = {
	message: null,
};
export default function AddForm() {
	const [state, formAction] = useFormState(createArticle, initialState);

	return (
		<div>
			<div>New Article</div>
			<form action={formAction}>
				<label htmlFor="title">Title</label>
				<input type="text" id="title" name="title" required />
				<label htmlFor="content">Content</label>
				<input type="textarea" id="content" name="title" required />
				<SubmitButton />
				<p aria-live="polite" className="sr-only" role="status">
					{state?.message}
				</p>
			</form>
		</div>
	);
}

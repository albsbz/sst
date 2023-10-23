'use client';

import { useSession } from 'next-auth/react';

type ComponentParameters = { url: string; fileKey: string };

export default function UploadForm({ url, fileKey }: ComponentParameters) {
	const { update: updateSession } = useSession();
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();

				const file = (e.target as HTMLFormElement).file.files?.[0]!;

				const image = await fetch(url, {
					body: file,
					method: 'PUT',
					headers: {
						'Content-Type': file.type,
						'Content-Disposition': `attachment; filename="${file.name}"`,
					},
				});

				console.log('image0', image.url, fileKey);

				await fetch('/api/avatar', {
					method: 'PATCH',
					body: JSON.stringify({ fileKey, url: image.url.split('?')[0] }),
				});
				updateSession();
			}}
		>
			<input name="file" type="file" accept="image/png, image/jpeg" />
			<button type="submit">Upload</button>
		</form>
	);
}

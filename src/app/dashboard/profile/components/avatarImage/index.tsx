'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
export default function AvatarImage() {
	const { data: session } = useSession();
	return (
		<>
			{session?.user?.image ? (
				<Image
					src={session?.user?.image}
					alt="avatar"
					width={100}
					height={100}
					className="rounded-full"
					style={{ width: 'auto', height: 'auto' }}
				/>
			) : (
				<div>No avatar</div>
			)}
		</>
	);
}

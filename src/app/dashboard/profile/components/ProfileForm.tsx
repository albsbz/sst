'use client';
import { useSession } from 'next-auth/react';
import { AppForm } from '@/app/components/appForm';
import { FileUpload } from '@/app/components/types/fileUpload.type';
import { INPUT_TYPE } from '@/app/components/appForm/enums/inputType';
import { User } from '@/packages/user/types/User';
import { editUserValidationSchema } from '@/schemas/user/editUserValidation.schema';

type ComponentProperties = {
	fileUpload?: FileUpload;
	user?: User;
	onSubmit: (data: any) => Promise<void>;
};
export default function ProfileForm({
	fileUpload,
	user,
	onSubmit,
}: ComponentProperties) {
	const { data: session } = useSession();
	const authorName = session?.user?.authorName;

	const inputs = [
		{
			name: 'name',
			default: user?.name || 'Name',
			placeholder: 'Name',
			disabled: Boolean(authorName),
			label: 'Name',
		},
		{
			name: 'avatar',
			default: user?.avatar || '',
			label: 'Avatar',
			type: INPUT_TYPE.fileUpload,
			fileUpload,
		},
		{
			name: 'description',
			default: user?.description || 'Description',
			placeholder: 'Description',
			label: 'Description',
		},
	];
	return (
		<AppForm
			onSubmit={onSubmit}
			inputs={inputs}
			schema={editUserValidationSchema}
			submitLabel="Update profile"
		></AppForm>
	);
}

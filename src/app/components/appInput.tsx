import clsx from 'clsx';
import { RefCallback, useId } from 'react';
import dynamic from 'next/dynamic';
import { Control, Controller, UseFormWatch, useController } from 'react-hook-form';
import { CustomEventT } from './types';
import { FileUpload } from './types/fileUpload.type';
import FileUploadInput from './fileUploadInput';

type ComponentParameters = {
	error?: string;
	label?: string;
	type?: 'text' | 'editor' | 'fileUpload';
	placeholder?: string;
	reference: RefCallback<HTMLInputElement>;
	disabled?: boolean;
	control: Control;
	inputName: string;
	fileUpload?: FileUpload;
	setValue: (field: string, value: string) => void;
	watch:  UseFormWatch<{
		[x: string]: any;
	}>
};

const AppEditor = dynamic<{
	value: string;
	onChange: (event: CustomEventT) => void;
	name: string;
	onBlur: () => void;
	fileUpload?: FileUpload;
}>(() => import('./appEditor/appEditor'), {
	ssr: false,
});

export default function AppInput({
	error,
	label,
	placeholder = '',
	type,
	reference,
	disabled,
	control,
	inputName,
	fileUpload,
	setValue,
	watch,
	...properties
}: ComponentParameters) {
	const inputId = useId();
	const labelClasses = [
		'block',
		'mb-2',
		'text-sm',
		'font-medium',
		error ? 'text-red-700' : 'text-gray-700',
		error ? 'dark:text-red-500' : 'dark:text-white-500',
	];
	let inputClasses = [
		error ? 'bg-red-50' : 'bg-gray-50',
		'border',
		error ? 'border-red-500' : 'border-gray-300',
		error ? 'text-red-900' : 'text-gray-900',
		error && 'placeholder-red-700',
		'text-sm',
		'rounded-lg',
		error ? 'focus:ring-red-500' : 'focus:ring-blue-500',
		error ? 'focus:border-red-500' : 'focus:border-blue-500',
		'block',
		'w-full',
		'p-2.5',
		error ? 'dark:bg-red-100' : 'dark:bg-gray-700',
		error ? 'dark:border-red-400' : 'dark:border-gray-600',
	];
	if (disabled) {
		inputClasses = [...inputClasses, 'bg-gray-100', 'cursor-not-allowed'];
	}

	const {
		field: { onChange, onBlur, value, ref },
	} = useController({ name: inputName, control });

	const InputType = () => {
		console.log('properties', properties);
		if (type === 'editor') {
			return (
				<AppEditor
					key={`editor-${inputName}`}
					name={inputName}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					fileUpload={fileUpload}
					{...properties}
				/>
			);
		}
		if (type === 'fileUpload') {
			return (
				<FileUploadInput
					name={inputName}
					fileUpload={fileUpload}
					key={inputName}
					reference={reference}
					id={inputId}
					setValue={setValue}
					watch={watch}
					{...properties}
				/>
			);
		}
		return (
			<input
				key={inputName}
				{...properties}
				ref={reference}
				type={type}
				id={inputId}
				className={clsx(inputClasses)}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={disabled}
			/>
		);
	};

	return (
		<div className="mb-6">
			{label && (
				<label htmlFor={inputId} className={clsx(labelClasses)}>
					{label}
				</label>
			)}
			<InputType />
			{error && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500">
					<span className="font-medium">Oops!</span>
					{error}
				</p>
			)}
		</div>
	);
}

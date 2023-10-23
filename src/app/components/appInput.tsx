import clsx from 'clsx';
import { RefCallback, useId } from 'react';
import dynamic from 'next/dynamic';

type ComponentParameters = {
	error?: string;
	label?: string;
	type?: 'text' | 'editor';
	placeholder?: string;
	reference: RefCallback<HTMLInputElement>;
	disabled?: boolean;
};
export function AppInput({
	error,
	label,
	placeholder = '',
	type,
	reference,
	disabled,
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

	const AppEditor = dynamic<{ placeholder: string }>(
		() => import('./appEditor'),
		{
			ssr: false,
		}
	);

	return (
		<div className="mb-6">
			{label && (
				<label htmlFor={inputId} className={clsx(labelClasses)}>
					{label}
				</label>
			)}
			{type === 'editor' ? (
				<AppEditor placeholder={placeholder} />
			) : (
				<input
					{...properties}
					ref={reference}
					type={type}
					id={inputId}
					className={clsx(inputClasses)}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={disabled}
				/>
			)}
			{error && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500">
					<span className="font-medium">Oops!</span>
					{error}
				</p>
			)}
		</div>
	);
}

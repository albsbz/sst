import clsx from 'clsx';

type ComponentProperties = {
	label: string;
	classes?: string[];
	disabled?: boolean;
	onClick?: () => void;
};
export default function AppButton({
	label,
	classes,
	disabled,
	onClick,
	...properties
}: ComponentProperties) {
	let defaultClasses = [
		'text-white',
		'bg-blue-700',
		'hover:bg-blue-800',
		'focus:ring-4',
		'focus:outline-none',
		'focus:ring-blue-300',
		'font-medium',
		'rounded-lg',
		'text-sm',
		'w-full',
		'sm:w-auto',
		'px-5',
		'py-2.5',
		'text-center',
		'dark:bg-blue-600',
		'dark:hover:bg-blue-700',
		'dark:focus:ring-blue-800',
	];
	if (disabled) {
		defaultClasses = [...defaultClasses, 'cursor-not-allowed', 'bg-blue-400'];
	}
	return (
		<button
			disabled={disabled}
			className={clsx([...defaultClasses, ...(classes = [])])}
			onClick={onClick}
			{...properties}
		>
			{label}
		</button>
	);
}

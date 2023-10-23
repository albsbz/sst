import { useForm, type FieldErrors } from 'react-hook-form';
import { AppInput } from './appInput';
import { useCallback } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AppButton from './appButton';

type Input = {
	default: string | undefined;
	placeholder: string;
	type?: 'text' | 'editor';
	label?: string;
	name: string;
	disabled?: boolean;
};

type ComponentProperties = {
	submitLabel: string;
	inputs: Input[];
	schema: Record<string, z.ZodType>;
	onSubmit: (data: any) => Promise<void>;
};

export function AppForm({
	inputs,
	schema,
	onSubmit,
	submitLabel,
}: ComponentProperties) {
	const inputSchema = z.object(schema);
	type FormData = z.infer<typeof inputSchema>;
	const formatErrors = useCallback((errors: FieldErrors) => {
		return Object.keys(errors).filter((key) => {
			const message = errors?.[key]?.message;
			if (message) {
				return {
					key,
					message,
				};
			}
		});
	}, []);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
	} = useForm<FormData>({
		mode: 'onChange',
		resolver: zodResolver(inputSchema),
		defaultValues: Object.fromEntries(
			inputs.map((input) => [input.name, input.default])
		),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			{inputs.map(({ label, type, placeholder, name, disabled }: Input) => {
				const { ref, ...rest } = register(name);
				return (
					<AppInput
						key={name}
						type={type}
						placeholder={placeholder}
						label={label}
						reference={ref}
						disabled={disabled}
						{...rest}
						aria-invalid={Boolean(errors[name])}
						error={errors?.[name]?.message?.toString()}
					/>
				);
			})}

			<AppButton disabled={isSubmitting || !isValid} label={submitLabel} />
			<pre>{JSON.stringify(formatErrors(errors), null, 2)}</pre>
			<pre>{JSON.stringify(watch(), null, 2)}</pre>
			<pre>
				formState =
				{JSON.stringify(
					{ isSubmitting, isSubmitted, isDirty, isValid },
					null,
					2
				)}
			</pre>
		</form>
	);
}

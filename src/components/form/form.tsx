import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { ErrorType, FormProps, FormValues } from './form.props';
import { useRouter } from 'next/router';

const Form = ({ onSubmit, sectionTitle, values }: FormProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string[]>([]);

	const [formValue, setFormValue] = useState<FormValues>({
		title: '',
		description: '',
	});

	const router = useRouter();

	const onChange =
		(name: string) =>
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormValue({
				...formValue,
				[name]: e.target.value,
			});
		};

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			await onSubmit(formValue);
			router.push('/');
		} catch (error) {
			const result = error as ErrorType;
			setLoading(false);
			if (result.response.data.message) {
				setError(result.response.data.message);
			} else {
				setError([result.message]);
			}
		}
	};

	const removeErrorItem = (item: string) => {
		setError(error.filter(err => err !== item));
	};

	useEffect(() => {
		setFormValue({ title: values?.title, description: values?.description });
		// eslint-disable-next-line
	}, [router.query.slug]);

	return (
		<>
			<h4 className='text-center'>{sectionTitle}</h4>
			<main className='form-signin w-75 text-black m-auto'>
				{error.length &&
					error.map(e => (
						<div
							key={e}
							className='alert alert-warning alert-dismissible fade show'
							role='alert'
						>
							{e}
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='alert'
								aria-label='Close'
								onClick={() => removeErrorItem(e)}
							/>
						</div>
					))}

				<form onSubmit={submitHandler}>
					<div className='form-floating'>
						<input
							name='title'
							type='text'
							className='form-control'
							id='floatingInput'
							placeholder='Title'
							value={formValue.title}
							onChange={onChange('title')}
						/>
						<label htmlFor='floatingInput'>Title</label>
					</div>
					<div className='form-floating'>
						<textarea
							name='description'
							className='form-control'
							placeholder='Description'
							id='floatingDescription'
							style={{ height: '200px' }}
							value={formValue.description}
							onChange={onChange('description')}
						></textarea>
						<label htmlFor='floatingDescription'>Description</label>
					</div>

					<button
						disabled={loading}
						className='btn btn-primary w-100 py-2'
						type='submit'
					>
						{loading ? 'Loading...' : 'Submit'}
					</button>
				</form>
			</main>
		</>
	);
};

export default Form;

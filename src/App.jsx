import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './app.module.css'
import { Field } from './components'

const validateSchema = yup.object().shape({
	email: yup.string().email('Некорректный email'),
	password: yup
		.string()
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, 'Пароль должен содержать заглавную букву, строчную букву и цифру')
		.max(32, 'Пароль должен быть не более 32 символов')
		.min(8, 'Пароль должен быть не менее 8 символов'),
	passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordConfirm: '',
		},
		resolver: yupResolver(validateSchema),
	})

	const emailError = errors.email?.message
	const passwordError = errors.password?.message
	const passwordConfirmError = errors.passwordConfirm?.message

	const submitButtonRef = useRef(null)

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus()
		}
	}, [isValid])

	const onSubmit = (formData) => {
		console.log(formData)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Field name='email' type='email' placeholder='E-mail' error={emailError} {...register('email')} required />

			<Field name='password' type='password' placeholder='Пароль' error={passwordError} {...register('password')} required />

			<Field
				name='passwordConfirm'
				type='password'
				placeholder='Повторите пароль'
				error={passwordConfirmError}
				{...register('passwordConfirm')}
				required
			/>

			<button ref={submitButtonRef} type='submit' className={styles.button} disabled={Object.keys(errors).length > 0}>
				Зарегистрироваться
			</button>
		</form>
	)
}

import { useState, useRef, useEffect } from 'react'
import styles from './app.module.css'
import { Field } from './components'

const validateFields = (name, value, password = null) => {
	switch (name) {
		case 'email':
			if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Некорректный email'
			return null
		case 'password':
			if (value.length < 8) return 'Пароль должен быть не менее 8 символов'
			if (value.length > 32) return 'Пароль должен быть не более 32 символов'
			if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value)) return 'Пароль должен содержать заглавную букву, строчную букву и цифру'
			return null
		case 'passwordConfirm':
			if (value !== password) return 'Пароли не совпадают'
			return null
		default:
			return null
	}
}

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordConfirm: '',
	})
	const [errors, setErrors] = useState({
		email: null,
		password: null,
		passwordConfirm: null,
	})

	const submitButtonRef = useRef(null)

	const isFieldValid = Object.values(errors).some((value) => value !== null)
	const isFormValid = Object.keys(formData).every((field) => {
		const error = validateFields(field, formData[field], formData.password)
		return error === null
	})

	const onChange = ({ target }) => {
		const { name, value } = target

		setFormData({ ...formData, [name]: value })
		setErrors({ ...errors, [name]: null })
	}

	const onBlur = ({ target }) => {
		const { name, value } = target

		setErrors({ ...errors, [name]: validateFields(name, value, formData.password) })
	}

	useEffect(() => {
		if (isFormValid) {
			submitButtonRef.current?.focus()
		}
	}, [isFormValid])

	const onSubmit = (event) => {
		event.preventDefault()

		if (!isFormValid) return

		console.log(formData)
	}

	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<Field
				name='email'
				type='email'
				placeholder='E-mail'
				value={formData.email}
				onChange={onChange}
				onBlur={onBlur}
				error={errors.email}
				required
			/>

			<Field
				name='password'
				type='text'
				placeholder='Пароль'
				value={formData.password}
				onChange={onChange}
				onBlur={onBlur}
				error={errors.password}
				required
			/>

			<Field
				name='passwordConfirm'
				type='text'
				placeholder='Повторите пароль'
				value={formData.passwordConfirm}
				onChange={onChange}
				onBlur={onBlur}
				error={errors.passwordConfirm}
				required
			/>

			<button ref={submitButtonRef} type='submit' className={styles.button} disabled={isFieldValid}>
				Зарегистрироваться
			</button>
		</form>
	)
}

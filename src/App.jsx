import { useState, useRef, useEffect } from 'react'
import styles from './app.module.css'
import { Field } from './components'

export const App = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordСonfirm] = useState('')
	const [emailError, setEmailError] = useState(null)
	const [passwordError, setPasswordError] = useState(null)
	const [passwordConfirmError, setPasswordСonfirmError] = useState(null)

	const submitButtonRef = useRef(null)

	const onEmailChange = ({ target }) => {
		setEmail(target.value)
		setEmailError(null)
	}

	const onEmailBlur = ({ target }) => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(target.value)) {
			setEmailError('Некорректный email')
		}
	}

	const onPasswordChange = ({ target }) => {
		setPassword(target.value)
		setPasswordError(null)

		if (target.value.length > 32) {
			setPasswordError('Пароль должен быть не более 32 символов')
		}
	}

	const onPasswordBlur = ({ target }) => {
		if (target.value.length < 8) {
			setPasswordError('Пароль должен быть не менее 8 символов')
		} else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(target.value)) {
			setPasswordError('Пароль должен содержать заглавную букву, строчную букву и цифру')
		}
	}

	const onPasswordСonfirmChange = ({ target }) => {
		setPasswordСonfirm(target.value)
		setPasswordСonfirmError(null)
	}

	const onPasswordСonfirmBlur = () => {
		if (passwordConfirm !== password) {
			setPasswordСonfirmError('Пароли не совпадают')
		}
	}

	const onSubmit = (event) => {
		event.preventDefault()

		console.log({ email, password, passwordConfirm })
	}

	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<Field name='email' type='email' placeholder='E-mail' value={email} onChange={onEmailChange} onBlur={onEmailBlur} error={emailError} required />

			<Field
				name='password'
				type='password'
				placeholder='Пароль'
				value={password}
				onChange={onPasswordChange}
				onBlur={onPasswordBlur}
				error={passwordError}
				required
			/>

			<Field
				name='passwordConfirm'
				type='password'
				placeholder='Повторите пароль'
				value={passwordConfirm}
				onChange={onPasswordСonfirmChange}
				onBlur={onPasswordСonfirmBlur}
				error={passwordConfirmError}
				required
			/>

			<button ref={submitButtonRef} type='submit' className={styles.button} disabled={!!passwordError || !!emailError || !!passwordConfirmError}>
				Зарегистрироваться
			</button>
		</form>
	)
}

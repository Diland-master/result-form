export const validateFields = (name, value, password = null) => {
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

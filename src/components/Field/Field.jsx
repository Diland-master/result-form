import styles from './Field.module.css'

export const Field = ({ type = 'text', error, ...props }) => {
	return (
		<label className={styles.label}>
			{error && <span className={styles.error}>{error}</span>}
			<input type={type} {...props} className={styles.field + (error ? ' ' + styles.invalid : '')} />
		</label>
	)
}

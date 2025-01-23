import styles from '@/css/components/Buttons.module.css'

export function ToggleButton ({ handleToggle = () => {}, isChecked, name }) {
  return (
    <div className={styles.check}>
      <input
        id={name}
        type='checkbox'
        onChange={handleToggle}
        checked={isChecked}
        aria-label=''// toggle button
        name={name}
      />
      <label htmlFor={name} />
    </div>
  )
}

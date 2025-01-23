import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import styles from '@/css/components/Dialog.module.css'

export function DialogFooter ({ onClose, pending }) {
  return (
    <footer className={styles.footer}>
      <Button
        type='button'
        variant='secondary'
        clickHandler={onClose}
      >
        Cancel
      </Button>
      <Button
        variant='secondary'
        type='submit'
      >
        {pending && <Loader />}
        Confirm
      </Button>
    </footer>
  )
}

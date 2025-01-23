'use client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { showToast } from '@/components/ui/Toast'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import formStyles from '@/css/components/Form.module.css'
import styles from '@/css/components/Dialog.module.css'

export default function LoginPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit (ev) {
    ev.preventDefault()

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false
      })

      if (res.error === 'credentials') {
        return showToast({
          title: 'Invalid credentials',
          type: 'error'
        })
      }

      window.location.href = 'https://localhost/admin/categories'
    } catch (e) {
      console.log('credentials error ', e)
      showToast({
        title: 'An error occured while trying to sign in',
        type: 'error'
      })
    }
  }

  return (
    <main
      id='dialogRoot'
      className={styles.dialog}
    >
      <form
        onSubmit={handleSubmit}
        className={styles.content}
        aria-label='Send sign in form'
      >
        <h2>Welcome</h2>
        <div>
          <label htmlFor='name'>Username</label>
          <Input
            required
            id='name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
            type='text'
            className={formStyles.input}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <Input
            required
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            type='password'
            className={formStyles.input}
          />
        </div>

        <Button type='submit' variant='secondary'>Sign in</Button>
      </form>
    </main>
  )
}

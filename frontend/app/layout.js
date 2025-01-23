import './globals.css'
import { Header } from '@/components/layout/Header'
import { inter } from '@/components/ui/fonts'
import styles from '@/css/Layout.module.css'

export const metadata = {
  title: 'FactoSport',
  description: 'FactoSport is an online store specializing in sports products, offering a wide variety of items for all disciplines and skill levels.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={`${styles.layout} ${inter.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

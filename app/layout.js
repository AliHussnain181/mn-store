import Navbar from '@/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { ContextProvider } from '@/components/context'
import Footer from '@/components/footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gaffor Grocery Outlet',
  description: 'Gaffor Grocery Outlet Store',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        </ContextProvider>
      </body>
    </html>
  )
}

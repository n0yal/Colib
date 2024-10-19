import './globals.css'

export const metadata = {
  title: 'Colib - Your Library App',
  description: 'A modern library application for book lovers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="debug-screens">{children}</body>
    </html>
  )
}
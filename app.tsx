import type { ComponentType } from 'react'
import React from 'react'
import Menu from './components/Menu.tsx'

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  return (
    <main>
      <head>
        <title>Codestar [Aleph]</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <Menu />
      <Page {...pageProps} />
    </main>
  )
}

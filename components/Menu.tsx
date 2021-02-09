import { useDeno } from 'aleph'
import React from 'react'
// import Logo from '../components/logo.tsx'
// import useCounter from '../lib/useCounter.ts'

export default function Menu() {
//   const [count, isSyncing, increase, decrease] = useCounter()
  const version = useDeno(() => Deno.version.deno)

  return (
    <p className="links">
        <a href="/">Home</a>
        <span></span>
        <a href="/publications">Codestar Publications</a>
        {/* <a href="https://alephjs.org/docs/get-started" target="_blank">Get Started</a>
        <span></span>
        <a href="https://alephjs.org/docs" target="_blank">Docs</a>
        <span></span>
        <a href="https://github.com/alephjs/aleph.js" target="_blank">Github</a> */}
      </p>
  )
}




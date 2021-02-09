import { useDeno } from 'aleph'
import React from 'react'
import Menu from '../components/Menu.tsx'

export default function Publications() {
  return (
    <div className="page">
      <link rel="stylesheet" href="../style/index.css" />
      <h1>Codestar Publications</h1>
      <Menu />
    </div>
  )
}

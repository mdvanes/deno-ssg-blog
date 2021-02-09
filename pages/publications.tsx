import { useDeno } from 'aleph'
import React from 'react'
import { Button } from "https://esm.sh/@material-ui/core@4.11.3";
import Menu from '../components/Menu.tsx'

export default function Publications() {
  return (
    <div className="page">
      {/* <link rel="stylesheet" href="../style/index.css" /> */}
      <h1>Codestar Publications</h1>
      <Menu />
      <Button color="primary" variant="contained">hoi</Button>
    </div>
  )
}

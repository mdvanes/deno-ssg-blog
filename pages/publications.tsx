import { useDeno } from 'aleph'
import React from 'react'
import { Button } from "https://esm.sh/@material-ui/core@4.11.3";
import AppTopBar from "../components/AppTopBar.tsx";

export default function Publications() {
  return (
    <div className="page">
      <AppTopBar />
      {/* <link rel="stylesheet" href="../style/index.css" /> */}
      <h1>Codestar Publications</h1>
      <Button color="primary" variant="contained">hoi</Button>
    </div>
  )
}

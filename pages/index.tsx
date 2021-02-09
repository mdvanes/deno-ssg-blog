import { useDeno } from "aleph";
import React from "react";
import AppTopBar from "../components/AppTopBar.tsx";
import Logo from "../components/logo.tsx";
import useCounter from "../lib/useCounter.ts";
import {
  Container, Card, CardContent
} from "https://esm.sh/@material-ui/core@4.11.3";

export default function Home() {
  const [count, isSyncing, increase, decrease] = useCounter();
  const version = useDeno(() => Deno.version.deno);

  return (
    <>
      <AppTopBar />
      <Container fixed>
        <Card>
          <CardContent>
            <div className="page">
              {/* <link rel="stylesheet" href="../style/index.css" /> */}
              <p className="logo">
                <Logo />
              </p>
              <h1>
                Welcome to use <strong>Aleph.js</strong>!
              </h1>
              <div className="counter">
                <span>Counter:</span>
                {isSyncing && <em>...</em>}
                {!isSyncing && <strong>{count}</strong>}
                <button onClick={decrease}>-</button>
                <button onClick={increase}>+</button>
              </div>
              <p className="copyinfo">Built by Aleph.js in Deno {version}</p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

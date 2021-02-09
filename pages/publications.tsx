import React, { useEffect } from "react";
import AppTopBar from "../components/AppTopBar.tsx";
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
} from "https://esm.sh/@material-ui/core@4.11.3";

const getPublications = async () => {
  const feed = await fetch("/test.json");
  console.log(await feed.json());
//   const feed = await fetch("https://medium.com/feed/codestar-blog");
};

export default function Publications() {
  useEffect(() => {
    console.log("on load");
    getPublications();
  }, []);

  return (
    <>
      <AppTopBar />
      <Container fixed>
        <Typography variant="h3">Codestar Publications</Typography>
        <Card>
          <CardContent>
            <Button color="primary" variant="contained">
              hoi
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

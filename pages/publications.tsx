import React from "react";
import AppTopBar from "../components/AppTopBar.tsx";
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
} from "https://esm.sh/@material-ui/core@4.11.3";

export default function Publications() {
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

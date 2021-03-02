import React, { useEffect, useState } from "react";
import AppTopBar from "../components/AppTopBar.tsx";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Button,
} from "@material-ui/core";

const getPublications = async () => {
  // const feed = await fetch("https://medium.com/feed/codestar-blog");
  const feed = await fetch("/api/posts");
  const posts = await feed.json();
  return posts;
};

export default function Publications() {
  const [posts, setPosts] = useState<{ title: string }[]>([]);

  useEffect(() => {
    (async () => {
      const publications = await getPublications();
      setPosts(publications);
    })();
  }, []);

  return (
    <>
      <AppTopBar />
      <Container fixed style={{ marginTop: "1rem" }}>
        <Card>
          <CardHeader title="Codestar Publications" />
          <CardContent>
            {(posts as { title: string }[]).map((post) => (
              <Button
                key={posts.title}
                color="primary"
                variant="contained"
                style={{ marginRight: "0.5rem" }}
              >
                {post.title}
              </Button>
            ))}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Button from "@mui/material/Button";
import { ProductList } from "./ProductList";
import Head from "next/head";

export default function Home() {
  const [quantityCart, setQuantityCart] = useState(0);

  useEffect(() => {
    if (localStorage.cart) {
      setQuantityCart(JSON.parse(localStorage.cart).length);
    }
  }, []);

  return (
    <Grid container direction="column" alignItems="center">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar quantity={quantityCart} />
      <Grid
        item
        container
        sx={{ width: "80%" }}
        direction="column"
        alignItems="center"
      >
        <Grid
          item
          container
          alignItems="center"
          direction="column"
          sx={{ position: "relative" }}
          mb={16}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              position: "absolute",
              top: "90px",
              borderRadius: "12px",
              width: "180px",
              height: "60px",
              fontFamily: "'Lato',sans-serif",
            }}
          >
            Sản phẩm
          </Button>
          <hr style={{ width: "100%", marginTop: "120px" }} />
        </Grid>

        <ProductList />
      </Grid>
    </Grid>
  );
}

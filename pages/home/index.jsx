import { Grid } from "@mui/material";
import * as React from "react";
import NavBar from "./NavBar";
import Button from "@mui/material/Button";
import ProductList from "./ProductList";

export default function Home() {
  return (
    <Grid container direction="column" alignItems="center">
      <NavBar/>
      <Grid item container sx={{ width: "80%"}} direction="column" alignItems="center" >
        <Grid
          item
          container
          alignItems="center"
          direction="column"
          sx={{ position: "relative"}}
          mb={20}
        >
          <Button
            variant="contained"
            
            size="large"
            sx={{ position: "absolute", top: "90px", borderRadius: "12px",width:'180px',height:'60px'}} 
          >
            Tất cả
          </Button>
          <hr style={{ width: "100%", marginTop: "120px" }} />
        </Grid>

        <ProductList />
      </Grid>
    </Grid>
  );
}

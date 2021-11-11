import React, { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import CommentList from "./CommentList";
import CommentItem from "./CommentItem";

export default function DetailProduct() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fix memory leak || product state declare
    let isFetching = true;
    const fetchDataById = async () => {
      const params = { id: productId };
      const response = await productApi.getDetailProduct(params);
      const productItem = response[0];
      if (isFetching) {
        setProduct(productItem);
      }
    };
    fetchDataById();

    return () => {
      isFetching = false;
    };
  }, [productId]);

  return (
    <Grid container direction="column" px={28} py={8} sx={{ height: "100%" }}>
      <Grid container item>
        <Grid item xs={5}>
          <img
            src={product.image}
            alt={product.description}
            width="300px"
            height="300px"
          />
        </Grid>
        <Grid item xs={7}>
          <h1 style={{ height: "50px", marginBottom: "100px" }}>
            {product.description}
          </h1>
          <div>
            <h3>
              Price: <span style={{ color: "red" }}> {product.price}</span>
            </h3>
            <span>Số lượng</span>
            <input
              style={{ width: "50px", margin: "8px 8px",opacity:1 }}
              type="number"
              value={quantity}
              min="1"
              max={product.quantity}
              onChange={(e) => setQuantity((prev) => (prev = e.target.value))}
            /> <br />
            <span>Còn lại: {product.quantity}</span>
          </div>
        </Grid>
      </Grid>

      <Grid container item sx={{borderTop:'1px solid black'}} mt={12}>
        <CommentList comments={product.comments} />
        <CommentItem></CommentItem>
      </Grid>
    </Grid>
  );
}

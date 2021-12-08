import React, { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import CommentList from "./CommentList";
import CommentItem from "./CommentItem";
import NavBar from "../home/NavBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function DetailProduct() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(() => ({
    image: "",
    description: "",
    price: "",
    quantity: "",
    comments: [],
  }));
  const [quantity, setQuantity] = useState(1);
  const [quantityCart, setQuantityCart] = useState(0);

  const addShoppingCart = () => {
    let cart = JSON.parse(localStorage.cart);
    let isDuplicate = false
    let productItem = {
      id: productId,
      description: product.description,
      quantity: quantity,
      price: product.price,
      image: product.image,
    };
    for (let e of cart) {
      if (e.id == productItem.id) {
        e.quantity = parseInt(e.quantity) + parseInt(productItem.quantity)
        isDuplicate = true 
      }
    }

    if(!isDuplicate) {
       cart.push(productItem);
    }

  
    localStorage.cart = JSON.stringify(cart);
    setQuantityCart(JSON.parse(localStorage.cart).length);
  };

  // quantityCart
  useEffect(() => {
    if (!localStorage.cart) {
      localStorage.cart = JSON.stringify([]);
    }
    setQuantityCart(JSON.parse(localStorage.cart).length);
  }, []);

  useEffect(() => {
    // Fix memory leak || product state declare
    let isFetching = true;
    const fetchDataById = async () => {
      try {
        const params = { id: productId };
        const response = await productApi.getDetailProduct(params);
        const productItem = response[0];
        if (isFetching) {
          setProduct({
            image: productItem.image,
            description: productItem.description,
            price: productItem.price,
            quantity: productItem.quantity,
            comments: productItem.comments,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataById();

    return () => {
      isFetching = false;
    };
  }, []);

  return (
    <>
      <NavBar quantity={quantityCart} />
      <Grid
        container
        direction="column"
        px={28}
        py={8}
        sx={{ width: "100%", height: "100%" }}
      >
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
            <h1 style={{ height: "50px", marginBottom: "100px",fontWeight:'bold' }}>
              {product.description}
            </h1>
            <div>
              <h3>
                Price: <span style={{ color: "red" }}> {product.price}</span>
              </h3>
              <span>Số lượng</span>
              <input
                style={{ width: "50px", margin: "8px 8px", opacity: 1 }}
                type="number"
                value={quantity}
                min="1"
                max={product.quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />{" "}
              <br />
              <span>Còn lại: {product.quantity}</span>
            </div>
          </Grid>
        </Grid>

        <Grid item container justifyContent="center">
          <Button
            startIcon={<AddShoppingCartIcon />}
            variant="contained"
            onClick={addShoppingCart}
          >
            Add to cart
          </Button>
        </Grid>

        <Grid container item sx={{ borderTop: "1px solid black" }} mt={12}>
          <CommentList comments={product.comments} />
          <CommentItem></CommentItem>
        </Grid>
      </Grid>
    </>
  );
}

import React, { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import CommentList from "./CommentList";
import CommentItem from "./CommentItem";
import NavBar from "../home/NavBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import userApi from "../api/userApi";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function DetailProduct() {
  const router = useRouter();
  const { pid, uid } = router.query;
  const [product, setProduct] = useState(() => ({
    image: "",
    description: "",
    price: "",
    quantity: "",
    comments: [],
  }));
  const [quantity, setQuantity] = useState(1);
  const [quantityCart, setQuantityCart] = useState(0);
  const [open, setOpen] = useState(false);
  const [reason,setReason] = useState("")

  const handleClose = () => {
    setOpen(false);
  };

  const handleDonationRequest = async () => {
    try {
      const params = { productId: pid, userId: uid,reason:reason };
      await userApi.handleAssistance(params)
      setReason("");
      setOpen(false);
      alert("Success")
    } catch (err) {
      alert(err);
    }
    
  };

  const addShoppingCart = () => {
    let cart = JSON.parse(localStorage.cart);
    let isDuplicate = false;
    let productItem = {
      id: pid,
      description: product.description,
      quantity: quantity,
      price: product.price,
      image: product.image,
    };
    for (let e of cart) {
      if (e.id == productItem.id) {
        e.quantity = parseInt(e.quantity) + parseInt(productItem.quantity);
        isDuplicate = true;
      }
    }

    if (!isDuplicate) {
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
        const params = { id: pid };
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
        alert(err);
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
        sx={{ width: "100%", height: "100%",flexWrap: "nowrap" }}
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
            <h1
              style={{
                height: "50px",
                marginBottom: "100px",
                fontWeight: "bold",
              }}
            >
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
            sx={{ marginRight: "24px" }}
          >
            Thêm vào giỏ hàng
          </Button>
          <Button
            endIcon={<VolunteerActivismIcon />}
            variant="contained"
            color="success"
            onClick={() => setOpen(true)}
          >
            Xin nhận hỗ trợ
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Đơn xin nhận hỗ trợ</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Hãy điền lí do bạn muốn nhân sản phẩm hỗ trợ này để chủ shop có
                thể xem xét nhé
              </DialogContentText>
              <TextField fullWidth variant="standard" required value={reason} onChange={(e)=> setReason(e.target.value)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDonationRequest}>Send</Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid container item sx={{ borderTop: "1px solid black" }} mt={12} pt={4}>
          <CommentList comments={product.comments} />
        </Grid>
      </Grid>
    </>
  );
}

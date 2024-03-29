import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Navbar from "../home/NavBar";
import { Button } from "@mui/material";
import { Delete, Payment } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import billApi from "../api/orderApi";
import userApi from "../api/userApi";

const TruncateTypo = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  visibility: "visible",
  letterSpacing: "0.6px",
});

const schema = yup
  .object({
    productId: yup.string(),
    address: yup.string(),
    quantity: yup.number(),
  })
  .required();

export default function Cart() {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [address, setAddress] = useState("");
  const idRef = useRef(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if(address) {
        const cart = JSON.parse(localStorage.cart);
        let item = cart.filter((e) => e.id === idRef.current);
        Object.assign(data,...item)
        await billApi.makePayment(data);
        localStorage.cart = JSON.stringify(
          cart.filter((e) => e.id !== idRef.current)
        );
        alert("Success");
      }else {
        alert("Cập nhật thông tin cá nhân ngay")
      }
    } catch (err) {
      alert(err);
    }

    setRefresh((prev) => !prev);
    setOpen(false);
  };

  const handleClickOpen = (event) => {
    idRef.current = event.target.parentNode.id;
    setOpen(true);
  };

  const handleClickDelete = (event) => {
    const cart = JSON.parse(localStorage.cart);
    localStorage.cart = JSON.stringify(
      cart.filter((e) => e.id !== event.target.parentNode.id)
    );
    setRefresh((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let items = JSON.parse(localStorage.cart);
    if (items) {
      setProduct(items);
    }
  }, [refresh]);

  useEffect(() => {
    let isFetching = true;
    const fetchData = async () => {
      const response = await userApi.getInfo();
      const { address } = response;

      if (isFetching) {
        setAddress(address);
      }
    };
    fetchData();

    return () => {
      isFetching = false;
    };
  }, []);

  return (
    <Grid container flexDirection="column">
      <Navbar />
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Thông tin thanh toán</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "16px",
            height: "200px",
          }}
        >
          <TextField
            label="Address"
            defaultValue={address ? address : "Cập nhật địa chỉ ngay"}
            size="small"
            variant="filled"
            {...register("address")}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: true,
            }}
          />
          <ErrorMessage errors={errors} name="address" />
          <TextField
            value="Thanh toán trực tiếp"
            variant="filled"
            label="Phương thức thanh toán"
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit(onSubmit)}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        px={16}
        mt={8}
        flexDirection="column"
        sx={{ rowGap: "16px" }}
      >
        {product.length !== 0 ? (
          product.map((product) => (
            <Grid
              key={product.id}
              container
              item
              sx={{
                width: "70%",
                height: "200px",
                boxShadow: "0px -1px 16px 6px rgba(210,201,201,1)",
              }}
              alignItems="center"
              px={2}
            >
              <Grid item xs={3}>
                <img
                  width="100%"
                  height="125px"
                  src={product.image}
                  alt="Product"
                />
              </Grid>
              <Grid container item xs={5} flexDirection="column" pl={2}>
                <TruncateTypo sx={{ width: "80%" }}>
                  {product.description}
                </TruncateTypo>
                <p>Số lượng: {product.quantity}</p>
                <p>Tổng tiền: {Number(product.quantity * product.price)}</p>
              </Grid>
              <Grid
                container
                item
                xs={4}
                sx={{ height: "40px", gap: "12px" }}
                id={product.id}
              >
                <Button
                  startIcon={<Payment />}
                  color="primary"
                  variant="outlined"
                  onClick={handleClickOpen}
                >
                  Thanh toán
                </Button>
                <Button
                  startIcon={<Delete />}
                  color="error"
                  variant="outlined"
                  onClick={handleClickDelete}
                >
                  Xóa
                </Button>
              </Grid>
            </Grid>
          ))
        ) : (
          <h1>Hiện không có gì trong giỏ hàng</h1>
        )}
      </Grid>
    </Grid>
  );
}

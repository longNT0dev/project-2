import { Grid } from "@mui/material";
import React, { useEffect, useState,useRef } from "react";
import orderApi from "../api/orderApi";
import userApi from "../api/userApi";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import ReviewsIcon from "@mui/icons-material/Reviews";
import UndoIcon from "@mui/icons-material/Undo";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from '@mui/material/Rating';

const TruncateTypo = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  visibility: "visible",
  letterSpacing: "0.6px",
});

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);
  const [rating, setRating] = useState(0)
  const [comment,setComment] = useState("")
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const productRef = useRef(null)

  const handleCancelOrder = async (e) => {
    try {
      const id = e.target.value;
      await orderApi.cancel({ id: id });
      setReload((prev) => !prev);
    } catch (err) {
      alert(err);
    }
  };

  const handleWriteReview = async () => {
    try {
      const params = {id: productRef.current,rating: rating,comment:comment}
      await userApi.sendReview(params)
      alert("Cảm ơn nhận xét của bạn")
      setOpen(false)
    } catch (err) {
      alert(err);
    }
  };

  const handleUndo = async (e) => {
    try {
      let id = orders[e.target.value]._id;
      await orderApi.undoCancel({ id: id });
      setReload((prev) => !prev);
    } catch (err) {
      alert(err);
    }
  };
  // list of order
  useEffect(() => {
    let isFetching = true;
    const fetchData = async () => {
      const response = await orderApi.getOrders();
      if (isFetching) {
        setOrders(response);
      }
    };
    fetchData();

    return () => {
      isFetching = false;
    };
  }, [reload]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Đánh giá sản phẩm</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "16px",
            height: "200px",
          }}
        >
           <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField label="Enter your review" onChange={(e) => setComment(e.target.value)}/>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleWriteReview}>Gửi</Button>
        </DialogActions>
      </Dialog>
      {orders.length !== 0 ? (
        orders.map((e, i) => (
          <Grid
            container
            px={16}
            mt={8}
            flexDirection="column"
            sx={{ rowGap: "16px", height: "auto" }}
            key={e._id}
          >
            <Grid
              container
              item
              sx={{
                width: "70%",
                height: "240px",
                boxShadow: "0px -1px 16px 6px rgba(210,201,201,1)",
              }}
              alignItems="center"
              px={2}
            >
              <Grid item xs={3}>
                <img width="100%" height="125px" src={e.image} alt="Product" />
              </Grid>
              <Grid
                container
                item
                xs={5}
                flexDirection="column"
                pl={2}
                sx={{ height: "100%" }}
              >
                <TruncateTypo sx={{ width: "80%" }}>
                  {e.description}
                </TruncateTypo>
                <p>Đơn giá: {e.price}</p>
                <p>Số lượng: {e.quantity}</p>
                <p>Tổng tiền: {e.quantity * e.price}</p>
                <p>Địa chỉ: {e.address}</p>
              </Grid>
              <Grid container item xs={4} sx={{ height: "40px", gap: "12px" }}>
                {e.status !== -1 ? (
                  <>
                    <Button
                      startIcon={<CancelIcon />}
                      value={e._id}
                      color="error"
                      disabled={e.status === 0 ? false : true}
                      variant="outlined"
                      onClick={(e) => handleCancelOrder(e)}
                      xs={{ width: "45%" }}
                    >
                      Hủy đơn hàng
                    </Button>
                    <Button
                      startIcon={<ReviewsIcon />}
                      color="primary"
                      id={e.productId}
                      disabled={e.status === 1 ? false : true}
                      variant="outlined"
                      onClick={(e) => {
                        setOpen(true)
                        productRef.current = e.target.id
                      }}
                      xs={{ width: "45%" }}
                    >
                      Đánh giá đơn hàng
                    </Button>
                  </>
                ) : (
                  <Button
                    startIcon={<UndoIcon />}
                    color="primary"
                    value={i}
                    variant="outlined"
                    onClick={(e) => handleUndo(e)}
                    xs={{ width: "45%" }}
                  >
                    Mua lại
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))
      ) : (
        <p>Bạn chưa có đơn hàng nào</p>
      )}
    </>
  );
}

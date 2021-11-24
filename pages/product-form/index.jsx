import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import userApi from "../api/userApi";
import base64Converter from "../ultis/base64Converter";
import axios from "axios";
import NavBar from "../home/NavBar";

const schema = yup
  .object({
    image: yup.mixed().required(),
    description: yup.string().required().max(120, "Too long"),
    category: yup.string().required(),
    price: yup
      .number()
      .integer("Nhập vào số nguyên")
      .min(10000, "Số tiền quá nhỏ")
      .required(),
    quantity: yup
      .number()
      .integer("Nhập vào số nguyên")
      .min(1, "Số lượng quá ít")
      .required(),
  })
  .required();

export default function ProductForm() {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (product) => {
    let baseUrl = await base64Converter(product.image[0]);

    let formData = new FormData();
    formData.append("image", baseUrl);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`,
        "Content-type": "multipart/form-data",
      },
    };

    let response = await axios.post(
      "http://localhost:5000/users/post-product",
      formData,
      axiosConfig
    );
    console.log(response);

    reset(response);
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <NavBar />
      <form
        style={{
          margin: "120px auto",
          width: "32%",
          boxShadow: " -1px 2px 5px 8px rgb(177 175 175 / 75%)",
          padding: "20px 32px",
          borderRadius: "8px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          sx={{ width: "100%" }}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          rowSpacing={3}
        >
          <Grid item container alignItems="center">
            <Grid item xs={3}>
              <label>Choose image:</label>
            </Grid>
            <Grid item xs={9} container direction="column">
              <TextField
                type="file"
                required
                {...register("image")}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <ErrorMessage errors={errors} name="image" />
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Grid item xs={3}>
              <label>Description:</label>
            </Grid>
            <Grid item xs={9}>
              <TextField
                type="text"
                multiline
                fullWidth
                {...register("description")}
              />
              <ErrorMessage errors={errors} name="description" />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" rowSpacing={4}>
            <Grid item xs={3}>
              <label>Category:</label>
            </Grid>
            <Grid item xs={9}>
              <TextField select defaultValue="Quần" {...register("category")}>
                <MenuItem key="Quần" value="Quần">
                  Quần
                </MenuItem>
                <MenuItem key="Áo" value="Áo">
                  Áo
                </MenuItem>
                <MenuItem key="Giày" value="Giày">
                  Giày
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Grid item xs={3}>
              <label>Price:</label>
            </Grid>
            <Grid item container direction="column" xs={9}>
              <TextField
                type="number"
                defaultValue="10000"
                style={{ width: "125px" }}
                {...register("price")}
              />
              <ErrorMessage errors={errors} name="price" />
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Grid item xs={3}>
              <label>Quantity:</label>
            </Grid>
            <Grid item container direction="column" xs={9}>
              <TextField
                type="number"
                defaultValue="1"
                style={{ width: "85.75px" }}
                {...register("quantity")}
              />
              <ErrorMessage errors={errors} name="quantity" />
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Button type="submit" variant="contained" size="large" fullWidth>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

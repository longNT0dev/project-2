import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import authenticationBg from "../../public/AuthenticationBg.jpg";
import avatar from "../../public/Avatar.jpg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authApi from "../api/authApi.js";

const LoginContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "8px",
  width: "30%",
  height: "70%",
  padding: "24px 48px",
  position: "absolute",
  top: "18%",
  left: "7%",
});

const schema = yup
  .object({
    phoneNumber: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    let response = await authApi.login(data);
    if (response) {
      setTimeout(() => {
        localStorage.jwt = response.token
        if(response.role === "admin") {
          router.push("/admin")
        }else {
          router.push("/home");
        }
      }, 800);
    }
  };

  return (
    <LoginContainer>
      <Image
        src={authenticationBg}
        alt="Authentication background"
        layout="responsive"
      ></Image>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <span>
          Don't have account?
          <Link href="/register">
            <a style={{ color: "rgb(19, 76, 201)" }}> Sign up</a>
          </Link>
        </span>
        <h2>Welcome back</h2>
        <Image src={avatar} alt="Avatar" width={60} height={60}></Image>
        <Grid container mt="12px" rowSpacing={3}>
          <Grid item xs={12}>
            <TextField
              type="tel"
              {...register("phoneNumber")}
              fullWidth
              label="PhoneNumber"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <ErrorMessage errors={errors} name="phoneNumber" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={showPassword ? "text" : "password"}
              {...register("password")}
              label="Password"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ErrorMessage errors={errors} name="password" />
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            item
            xs={12}
          >
            <FormControlLabel
              control={
                <Checkbox
                // onChange={() => setChecked((prev) => !prev)}
                // checked={checked}
                />
              }
              label="Remember me"
            />
            <Button type="submit" variant="contained" size="medium">
              Log in
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end" item>
            <Link href="/forgot-password">
              <a style={{ color: "#2020b3", cursor: "pointer" }}>
                Forgot password?
              </a>
            </Link>
          </Grid>
        </Grid>
      </Form>
    </LoginContainer>
  );
}

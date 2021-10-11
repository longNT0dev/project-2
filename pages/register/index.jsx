import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import authenticationBg from "../../public/AuthenticationBg.jpg";
import avatar from "../../public/Avatar.jpg";
import logo from "../../public/logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
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

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <LoginContainer>
      <div>
        <Image src={logo} alt={logo} width={80} height={80}></Image>
      </div>
      <Image
        src={authenticationBg}
        alt="Authentication background"
        layout="responsive"
      ></Image>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <span>
          Have an account?
          <Link href="/login">
            <a style={{ color: "rgb(19, 76, 201)" }}> Sign in</a>
          </Link>
        </span>
        <h2>Welcome</h2>
        <Image src={avatar} alt="Avatar" width={60} height={60}></Image>
        <Grid container mt="12px" rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              {...register("email")}
              fullWidth
              label="Email"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <ErrorMessage errors={errors} name="email" />
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
          <Grid item xs={12}>
            <TextField
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              label="Re-enter password"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <ErrorMessage errors={errors} name="confirmPassword" />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" size="medium">
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Form>
    </LoginContainer>
  );
}

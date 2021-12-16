
import { Grid, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import userApi from "../api/userApi";
import SaveIcon from '@mui/icons-material/Save';

const Form = styled("form")({
  borderRadius: "8px",
  width: "100%",
  height: "600px",
});

const schema = yup
  .object({
    name: yup.string().nullable(),
    address: yup.string().nullable(),
    phoneNumber: yup.string(),
  })
  .required();

export default function AccountDetail() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [readOnly, setReadOnly] = useState(true);
  const [upload,setUpload] = useState(false)
  const [info, setInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });


  const onSubmit = async (data) => {
    if(data.phoneNumber != info.phoneNumber || data.address != info.address || data.name != info.name) {
      try {
        await userApi.updateInfo(data)
        setUpload(true)
      }catch(err) {
        console.log(err)
      }
    }else {
      alert("Dữ liệu không đổi")
    }
  };

 
  useEffect(() => {
    let isFetching = true;
    const fetchData = async () => {
      const response = await userApi.getInfo();
      const { name, address, phoneNumber } = response;
      if (isFetching) {
        setInfo({ name: name, address: address, phoneNumber: phoneNumber });
        setValue("name",name);
        setValue("address",address);
        setValue("phoneNumber",phoneNumber);
        setUpload(false)
      }
    };
    fetchData();

    return () => {
      isFetching = false;
    };
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={{ width: "50%",height:'100%' }} px={16} mt={8} direction="column"  gap={5}>
        <TextField
          label="Name"
          size="small"
          defaultValue={info.name}
          variant={readOnly ? "filled" : "outlined"}
          {...register("name")}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        <ErrorMessage errors={errors} name="name" />

        <TextField
          label="Address"
          defaultValue={info.address}
          size="small"
          variant={readOnly ? "filled" : "outlined"}
          {...register("address")}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        <ErrorMessage errors={errors} name="address" />

        <TextField
          label="phoneNumber"
          defaultValue={info.phoneNumber}
          size="small"
          variant={readOnly ? "filled" : "outlined"}
          {...register("phoneNumber")}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        <ErrorMessage errors={errors} name="phoneNumber" />

        <Grid container justifyContent="space-between">
          <Grid item xs={5}>
            <Button variant="contained" startIcon={<EditIcon/>} size="medium" fullWidth color="error" onClick={() => setReadOnly((prev) => !prev)}>
              Edit
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button type="submit" variant="contained" size="medium" fullWidth endIcon={<SaveIcon/>}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}

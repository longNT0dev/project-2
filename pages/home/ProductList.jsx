import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProductItem from "./ProductItem";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import productApi from "../api/productApi.js";

export default function ProductList() {
  const config = {
    productPerRow: 4,
    limit: 20,
  };
  const products = [
    {
      id: 1,
      description:
        "loremfdjfkfjdkfjdfkdjfkdjfdkfjdfjdkjkjkhjhjhjfdfdfdfdfdfdfdffdfdffdff",
      price: "2000",
      quantity: 4,
    },
    { id: 2, description: "Testing", price: "2000", quantity: 4 },
    { id: 3, description: "Testing", price: "2000", quantity: 4 },
    { id: 4, description: "Testing", price: "2000", quantity: 4 },
    { id: 5, description: "Testing", price: "2000", quantity: 4 },
    { id: 6, description: "Testing", price: "2000", quantity: 4 },
    { id: 7, description: "Testing", price: "2000", quantity: 4 },
    { id: 8, description: "Testing", price: "2000", quantity: 4 },
    { id: 9, description: "Testing", price: "2000", quantity: 4 },
    { id: 10, description: "Testing", price: "2000", quantity: 4 },
    { id: 11, description: "Testing", price: "2000", quantity: 4 },
    { id: 12, description: "Testing", price: "2000", quantity: 4 },
  ];
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchDataByPage = async () => {
      const params = { page: page, limit: config.limit };
      const response = await productApi.getProductPerPage(params);
      console.log(response);
    };
    fetchDataByPage();

    return () => {};
  }, [page]);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: `repeat(${config.productPerRow}, 1fr)`,
          height: "80%",
          gap: "24px",
        }}
        mb={24}
      >
        {products.map((v, i) => {
          return (
            <ProductItem
              key={v.id}
              description={v.description}
              price={v.price}
              quantity={v.quantity}
            ></ProductItem>
          );
        })}
      </Box>
      <Pagination
        count={10}
        color="secondary"
        onChange={(event, value) => setPage(value)}
      />
    </>
  );
}
/*
find().limit(limit).skip((page-1)*limit)
*/

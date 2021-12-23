import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import productApi from "../api/productApi";
import ProductItemWaiting from "./ProductItemWaiting";

export default function ProductListWait() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isFetching = true;
    const fetchData = async () => {
      const response = await productApi.getProductWaiting();
      const { products,count } = response;
      if (isFetching) {
        setProducts(products);
      }
    };
    fetchData();

    return () => {
      isFetching = false;
    };
  },[]);

  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={6} mt={6} px={6}>
      {products &&
        products.map((v, i) => {
          return (
            <ProductItemWaiting
              src={v.image}
              id={v._id}
              key={v._id}
              description={v.description}
              price={v.price}
              quantity={v.quantity}
              status={v.status}
            ></ProductItemWaiting>
          );
        })}
    </Box>
  );
}

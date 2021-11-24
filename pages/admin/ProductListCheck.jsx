import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import productApi from "../api/productApi";
import ProductItemCheck from "./ProductItemCheck";

export default function ProductListCheck() {
  const [products, setProducts] = useState([]);
  const [count,setCount] = useState(0)

  useEffect(() => {
    let isFetching = true;
    const fetchDataByPage = async () => {
      const response = await productApi.getProductWaiting();
      const { products,count } = response;
      if (isFetching) {
        setProducts(products);
        setCount(count)
      }
    };
    fetchDataByPage();

    return () => {
      isFetching = false;
    };
  },[]);

  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={6} mt={6} px={6}>
      {products &&
        products.map((v, i) => {
          return (
            <ProductItemCheck
              src={v.image}
              id={v._id}
              key={v._id}
              description={v.description}
              price={v.price}
              quantity={v.quantity}
            ></ProductItemCheck>
          );
        })}
    </Box>
  );
}

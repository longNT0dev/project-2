import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ProductItem from "./ProductItem";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import productApi from "../api/productApi.js";
import NoResultSearching from "./NoResultSearching";
import { useRouter } from "next/router";
import Link from "next/link";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: "rgb(236 228 228)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "62%",
  "&:hover": {
    backgroundColor: "rgb(252 236 236)",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "auto",
    border: "none",
    border: "1px solid #7f7878",
    borderRadius: "30px",
  },
}));

export function ProductList() {
  const config = {
    productPerRow: 4,
    limit: 12,
  };

  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearchTerm, setHasSearchTerm] = useState(null);
  const router = useRouter();

  const handleSearching = async (e) => {
    if (e.charCode == 13) {
      let searchTerm =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      if (searchTerm) {
        let products = await productApi.getProductByCategory({
          category: searchTerm,
        });
        setHasSearchTerm(searchTerm);
        setProducts(products);
        products.length == 0
          ? setTotalProduct(products.length + 1)
          : setTotalProduct(products.length);
      } else {
        setHasSearchTerm(null);
        setPage(1);
      }
    }
  };

  // const handleShowDetailProduct = (e) => {
  //   let id = e.currentTarget.closest("[id]").id;
  //   let detailProduct = products.find((product) => product._id == id);
  //   console.log(detailProduct);
  //   router.push({
  //     pathname: `/${id}`,
  //     query: { productId: id, userId: detailProduct.user_id },
  //     asPath: `/${id}`,
  //   });
  // };

  useEffect(() => {
    let isFetching = true;
    const fetchDataByPage = async () => {
      const params = { page: page, limit: config.limit };
      const response = await productApi.getProductPerPage(params);
      const { products, count } = response;
      if (isFetching) {
        console.log(products);
        setProducts(products);
        setTotalProduct(count);
        setIsLoading(false);
      }
    };
    fetchDataByPage();

    return () => {
      isFetching = false;
    };
  }, [page]);

  return (
    <>
      <Grid container>
        <Grid item xs={8} mb={12}>
          {hasSearchTerm ? (
            <div>
              <span style={{ fontSize: "25px" }}>
                Sản phẩm liên quan đến{" "}
                <b style={{ color: "red", fontSize: "36px" }}>
                  {hasSearchTerm}
                </b>
              </span>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={4}>
          <Search onKeyPress={(e) => handleSearching(e)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm sản phẩm..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: `repeat(${
            products.length != 0 ? config.productPerRow : 1
          }, 1fr)`,
          height: "80%",
          gap: "24px",
        }}
        mb={18}
      >
        {products.length != 0
          ? products.map((v, i) => {
              return (
                <Link
                  href={{
                    pathname: v._id,
                    query: { pid: v._id, uid: v.user_id },
                  }}
                  key={v._id}
                >
                  <a>
                    <ProductItem
                      src={v.image}
                      description={v.description}
                      price={v.price}
                      quantity={v.quantity}
                    ></ProductItem>
                  </a>
                </Link>
              );
            })
          : !isLoading && <NoResultSearching />}
      </Box>
      <Pagination
        count={Math.ceil(totalProduct / config.limit)}
        color="secondary"
        onChange={(event, value) => setPage(value)}
      />
    </>
  );
}

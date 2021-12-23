import React from "react";
import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { Box } from "@mui/system";
import SupportItemWaiting from "./SupportItemWaiting";

export default function SupportListWait() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let isFetching = true;
    const fetchData = async () => {
      const response = await userApi.getAssistances();
      console.log(response);
      if (isFetching) {
        setList(response);
      }
    };
    fetchData();

    return () => {
      isFetching = false;
    };
  }, []);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gap={6}
      mt={6}
      px={6}
      sx={{ height: "auto" }}
    >
      {list &&
        list.map((v, i) => {
          return (
            <SupportItemWaiting
              src={v.image}
              id={v._id}
              key={v._id}
              sendId={v.sendId}
              description={v.description}
              reason={v.reason}
            ></SupportItemWaiting>
          );
        })}
    </Box>
  );
}

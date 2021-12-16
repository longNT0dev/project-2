import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProductListWait from "./ProductListWait";
import HomeIcon from '@mui/icons-material/Home';
import AccountDetail from './AccountDetail'
import OrderList from "./OrderList";

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function MyAccount() {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab icon={<HomeIcon/>} component="a" href="/home" {...a11yProps(0)} />
          <Tab label="Chờ duyệt sản phẩm" {...a11yProps(1)} />
          <Tab label="Chờ duyệt đơn xin" {...a11yProps(2)} />
          <Tab label="Thông tin cá nhân" {...a11yProps(3)} />
          <Tab label="Đơn hàng" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      {
        {
          1: <ProductListWait/>,
          2: <p>Hi</p>,
          3: <AccountDetail />,
          4: <OrderList/>,
        }[value]
      }
    </Box>
  );
}

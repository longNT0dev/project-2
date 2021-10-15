import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Error from "./Error.jsx";
import logo from "../public/logo.png";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import pro1 from "../public/pro1.png";
import pro2 from "../public/pro2.png";
import pro3 from "../public/pro3.png";
import "swiper/css";
import "swiper/css/navigation";

const useStyle = makeStyles({
  rootContainer: {
    height: "auto",
  },
  Section1: {
    backgroundImage: "url('/banner.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "100vh",
  },
  navigation: {
    width: "100%",
    color: "white",
    textTransform: "uppercase",
    fontSize: "16px",
    height: "90px",
    backgroundColor: "#ed242e",
    borderRadius: "8px",
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "34px!important",
    left: "50%!important",
    transform: "translateX(-50%)",
    cursor: "pointer",
    zIndex: 1,
  },
  title: {
    position: "relative",
    top: "12%",
    zIndex: 1,
    color: "white",
  },
  about: {
    width: "90%",
    position: "relative",
    top: "-60px",
    boxShadow: "0px -1px 24px 11px rgba(219,211,211,0.75);",
    borderRadius: "100px",
    backgroundColor: "white",
    height: "600px",
  },
  Section2: {
    height: "2000px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  takeAction: {
    width: "90%",
    backgroundImage: "url('/project.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "600px",
  },
  SlideStyle: {
    paddingTop: "200px",
    paddingLeft: "65px",
    fontFamily: "Poppins sans-serif",
  },
  slideContain: {
    width: "300px",
    height: "200px",
    borderRadius: "12px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  Section3: {
    height: "auto",
  },
});

export default function Home() {
  const classes = useStyle();
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
      if(isSmallDevice) {

      }
  },[isSmallDevice])
 
  return isSmallDevice ? (
    <Error />
  ) : (
    <Grid
      className={classes.rootContainer}
      container
      direction="column"
      alignItems="center"
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,200&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Grid id="home" item container className={classes.Section1}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          pl={12}
          pr={20}
          className={classes.navigation}
        >
          <Grid item>
            <Link href="#">
              <a>Home</a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="#about">
              <a>About</a>
            </Link>
          </Grid>
          <Grid item>
            {" "}
            <Link href="#takeAction">
              <a>Take Action</a>
            </Link>
          </Grid>
          <Grid item>
            {" "}
            <Link href="#home">
              <div className={classes.logo}>
                <a
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    letterSpacing: "1px",
                  }}
                >
                  Covid
                </a>
                <Image src={logo} alt="logo" layout="fixed"></Image>
              </div>
            </Link>
          </Grid>
          <Grid item>
            {" "}
            <Link href="#news">
              <a>News</a>
            </Link>
          </Grid>
          <Grid item>
            {" "}
            <Link href="#contact">
              <a>Contact</a>
            </Link>
          </Grid>
          <Grid item>
            {" "}
            <Link href="/login">
              <a>
                <AccountBoxIcon></AccountBoxIcon>
              </a>
            </Link>
          </Grid>
        </Grid>
        {/* done navbar */}
        <Grid
          container
          direction="column"
          className={classes.title}
          pl={24}
          pt={12}
        >
          <h1 style={{ fontSize: "89px", fontFamily: "Poppins sans-serif" }}>
            Sharing <br /> what you have
          </h1>
          <span>
            Join with us to share your resources with people{" "}
            <Link href="/login">
              <a
                style={{
                  backgroundImage:
                    "linear-gradient(to right,#1a2a6c,#b21f1f,#fdbb2d)",
                  padding: "10px 20px",
                  fontFamily: "Poppins sans-serif",
                }}
              >
                Sign in now{" "}
              </a>
            </Link>{" "}
          </span>
        </Grid>
        {/* done title */}
      </Grid>
      {/* end Section1 */}

      <Grid item container id="about" className={classes.about} px={12} py={8}>
        <Grid
          item
          xs={6}
          container
          direction="column"
          alignItems="flex-start"
          pr={4}
        >
          <h1
            style={{
              textTransform: "uppercase",
              fontFamily: "Poppins sans-serif",
            }}
          >
            About Corona Virus
          </h1>
          <span
            style={{
              height: "12px",
              width: "100px",
              backgroundColor: "red",
              borderRadius: "12px",
            }}
          />
          <p style={{ fontSize: "17px", lineHeight: "24px" }}>
            Coronaviruses are a type of virus. There are many different kinds,
            and some cause disease. A coronavirus identified in 2019,
            SARS-CoV-2, has caused a pandemic of respiratory illness, called
            COVID-19.
          </p>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            backgroundImage: "url('/about.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></Grid>
      </Grid>

      <Grid
        item
        container
        className={classes.Section2}
        direction="column"
        alignItems="center"
      >
        <h1
          style={{
            fontSize: "45px",
            textTransform: "uppercase",
            color: "#353d47",
            fontWeight: "bold",
            fontFamily: "Poppins sans-serif",
          }}
        >
          Symptom
        </h1>
        <Grid
          item
          container
          style={{
            backgroundImage: "url('/corona.png')",
            width: "60%",
            height: "500px",
            backgroundRepeat: "no-repeat",
            textAlign: "end",
          }}
        ></Grid>
        <h1
          style={{
            fontSize: "45px",
            textTransform: "uppercase",
            color: "#353d47",
            fontWeight: "bold",
            fontFamily: "Poppins sans-serif",
          }}
        >
          How to protect Yourself
        </h1>
        <Grid id="takeAction" item container className={classes.takeAction}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            navigation={true}
            loop={true}
            className={classes.swiperContainer}
          >
            <SwiperSlide className={classes.SlideStyle}>
              <div className={classes.slideContain}>
                <Image
                  src={pro1}
                  alt="mask-image"
                  layout="fixed"
                  width={75}
                  height={75}
                ></Image>
                <h2>Wear Mask</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide className={classes.SlideStyle}>
              <div className={classes.slideContain}>
                <Image
                  src={pro2}
                  alt="wash your hand"
                  layout="fixed"
                  width={75}
                  height={75}
                ></Image>
                <h2>Wash your hand</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide className={classes.SlideStyle}>
              <div className={classes.slideContain}>
                <Image
                  src={pro3}
                  alt="stay at home"
                  layout="fixed"
                  width={75}
                  height={75}
                ></Image>
                <h2>Stay at home</h2>
              </div>
            </SwiperSlide>
          </Swiper>
        </Grid>

        <Grid
          id="news"
          item
          container
          direction="column"
          alignItems="center"
          mt={30}
        >
          <h1
            style={{
              fontSize: "45px",
              textTransform: "uppercase",
              color: "#353d47",
              fontWeight: "bold",
              fontFamily: "Poppins sans-serif",
            }}
          >
            Corona Virus Cases
          </h1>
          <Grid item></Grid>
        </Grid>
      </Grid>
      {/* end Section2 */}

      <Grid
        container
        direction="column"
        alignItems="center"
        id="contact"
        className={classes.Section3}
      >
        <h1
          style={{
            fontSize: "45px",
            textTransform: "uppercase",
            color: "#353d47",
            fontWeight: "bold",
            fontFamily: "Poppins sans-serif",
          }}
        >
          Get every update...
        </h1>
        <Grid item container direction="column" alignItems="center">
          <Grid
            item
            container
            style={{
              height: "300px",
              backgroundImage: "url('/ever_bg.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Grid>
          <Grid
            item
            container
            style={{
              height: "500px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Grid item direction="column" alignItems="center" container xs={3}>
              <h3>Resources</h3>
            </Grid>
            <Grid item direction="column" alignItems="center" container xs={3}>
              <h3>About</h3>
            </Grid>
            <Grid item direction="column" alignItems="center" container xs={3}>
              <h3>Contact us</h3>
            </Grid>
            <Grid item direction="column" alignItems="center" container xs={3}>
              <h3>Country</h3>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* end Section3 */}
    </Grid>
  );
}

// const styles = () =>
//   createStyles({
//     h: {
//       '&::before': {
//         content: '"some content"',
//         display: 'block',
//         height: 60,
//         marginTop: -60
//       }
//     }
//   });

import "./App.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MultipleSelect from "./Select";
import { useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
// @ts-ignore
import "moment/dist/locale/ar";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./Redux/weatherApiSlice";
import { RootState, AppDispatch } from "./Redux/store";
import CircularProgress from '@mui/material/CircularProgress';
import { CssBaseline, Typography } from "@mui/material";

export interface IAPI {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

function App() {
  const [dateAndTime, setDateAndTime] = useState<string | null>(null);
  const [translate, setTranslate] = useState("en");
  const { t, i18n } = useTranslation();

  const { city, dataWeather, isLoading, errorMassage } = useSelector((state: RootState) => state.weatherApiReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handelTranslateClick = () => {
    const newLang = translate === "en" ? "ar" : "en";
    // Date And Time language
    moment.locale(newLang);
    // Translate App
    i18n.changeLanguage(newLang);
    // Update State Translate
    setTranslate(newLang);
  };

  useEffect(() => {
    // Get Api Weather
    dispatch(fetchWeather(city));
    // Date And Time
    moment.locale(translate);
    // Update Date And Time
    setDateAndTime(moment().locale(translate).format("LLLL"));
  }, [translate, dispatch, city]);

  // Theme
  const theme = createTheme({
    typography: {
      fontFamily: "Rubik, sans-serif",
    },
    palette: {
      
      primary: {
        main: "#33ABBB",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col justify-center items-start h-screen bg-gradient-to-r from-cyan-700 to-teal-400">
        <Container maxWidth="sm">
          <div
            dir={translate === "en" ? "ltr" : "rtl"}
            className="content text-zinc-900 flex flex-col justify-center gap-3"
          >
            <MultipleSelect />

            <Box className="font-bold bg-white/20 backdrop-blur-3xl p-5 md:p-10 rounded-lg">
              {/* City And Time */}
              <div className="title flex justify-between items-center mb-3 text-xl">
                <Typography className="!font-[900]">{t(dataWeather?.country)}</Typography>
                <Typography className="!text-sm !font-[800]">{dateAndTime}</Typography>
              </div>

              <hr className="my-3" />

              {/* Temperature And Image */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row items-start">
                    <Typography className="!text-5xl !md:text-7xl">
                      {isLoading ? <CircularProgress className="!text-white" /> : dataWeather?.temp || errorMassage}
                    </Typography>
                    {dataWeather?.icon && (
                      <img src={dataWeather.icon} alt="weather icon" />
                    )}
                  </div>

                  <Typography className="!font-[600]">{t(dataWeather?.description) ?? "--"}</Typography>

                  <div className="flex gap-10">
                    <Typography className="!font-[800]">
                      {t("Min")} : <b>{dataWeather?.temp_min ?? "--"}</b>
                    </Typography>
                    <Typography className="!font-[800]">
                      {t("Max")} : <b>{dataWeather?.temp_max ?? "--"}</b>
                    </Typography>
                  </div>
                </div>

                {/* Icon */}
                <div>
                  <CloudIcon className="!text-[8rem] !md:text-[10rem] !text-white" />
                </div>
              </div>
            </Box>

            {/* Translation Arabic */}
            <div dir={translate === "en" ? "ltr" : "rtl"}>
              <Button
                onClick={handelTranslateClick}
                className="!font-bold"
                variant="contained"
              >
                {translate === "en" ? "ARABIC" : "انجليزى"}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

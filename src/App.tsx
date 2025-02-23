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
    moment.locale(newLang);
    i18n.changeLanguage(newLang);
    setTranslate(newLang);
  };

  useEffect(() => {
    dispatch(fetchWeather(city));
    moment.locale(translate);
    setDateAndTime(moment().locale(translate).format("LLLL"));
  }, [translate, dispatch, city]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#33ABBB",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col justify-center items-start h-screen bg-gradient-to-r from-cyan-700 to-teal-400">
        <Container maxWidth="sm">
          <div
            dir={translate === "en" ? "ltr" : "rtl"}
            className="content flex flex-col justify-center gap-3"
          >
            <MultipleSelect />

            <Box className="font-bold bg-white/20 backdrop-blur-3xl p-5 md:p-10 rounded-lg">
              {/* City And Time */}
              <div className="title flex justify-between items-center mb-3 text-xl">
                <h2>{t(dataWeather?.country)}</h2>
                <h2 className="text-sm">{dateAndTime}</h2>
              </div>

              <hr className="my-3" />

              {/* Temperature And Image */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row items-start">
                    <h2 className="text-5xl md:text-7xl">
                      {isLoading ? <CircularProgress className="!text-white" /> : dataWeather?.temp || errorMassage}
                      <sup>°C</sup>
                    </h2>
                    {dataWeather?.icon && (
                      <img src={dataWeather.icon} alt="weather icon" />
                    )}
                  </div>

                  <h2>{t(dataWeather?.description) ?? "--"}</h2>

                  <div className="flex gap-10">
                    <span>
                      {t("Min")} : <b>{dataWeather?.temp_min ?? "--"}°C</b>
                    </span>
                    <span>
                      {t("Max")} : <b>{dataWeather?.temp_max ?? "--"}°C</b>
                    </span>
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

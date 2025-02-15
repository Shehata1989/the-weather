import "./App.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { reducer } from "./Reducer/reducer";
import MultipleSelect from "./Select";
import { useEffect, useReducer, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "moment/dist/locale/ar";

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

export interface IState {
  temp: number;
  country: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
}

const initialState: IState = {
  temp: 0,
  country: "",
  temp_min: 0,
  temp_max: 0,
  description: "",
  icon: "",
};

interface City {
  name: string;
  lat: number;
  lon: number;
}

const defaultCity: City = {
  name: "Alexandria",
  lat: 31.205753,
  lon: 29.924526,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dateAndTime, setDateAndTime] = useState<string | null>(null);
  const [city, setCity] = useState<City>(defaultCity);
  const [translate, setTranslate] = useState("en");

  const { t, i18n } = useTranslation();

  const handelTranslateClick = () => {
    const newLang = translate === "en" ? "ar" : "en";
    moment.locale(newLang);
    i18n.changeLanguage(newLang);
    setTranslate(newLang);
  };

  useEffect(() => {
    moment.locale(translate);
    setDateAndTime(moment().locale(translate).format("LLLL"));
  }, [translate]);

  useEffect(() => {
    if (!city) return;

    const API_KEY = "dccc4ff7e4cd9f1ffc2ba4016a6c649c";
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`;

    axios
      .get(URL)
      .then((res) => {
        dispatch({ type: "FETCH_DATA", payload: res.data });
      })
      .catch((err) => console.log(err));
  }, [city]);

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
          <div dir={translate === "en" ? "ltr" : "rtl"} className="content flex flex-col justify-center gap-3">
            <MultipleSelect city={city} setCity={setCity} />

            <Box className="font-bold bg-white/20 backdrop-blur-3xl p-5 md:p-10 rounded-lg">
              {/* City And Time */}
              <div className="title flex justify-between items-center mb-3 text-xl">
                <h2>{t(state?.country)}</h2>
                <h2 className="text-sm">{dateAndTime}</h2>
              </div>

              <hr className="my-3" />

              {/* Temperature And Image */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row items-start">
                    <h2 className="text-5xl md:text-7xl">
                      {state?.temp ?? "--"}
                      <sup>°C</sup>
                    </h2>
                    {state?.icon && <img src={state.icon} alt="weather icon" />}
                  </div>

                  <h2>{state?.description ?? "--"}</h2>

                  <div className="flex gap-10">
                    <span>
                      Min: <b>{state?.temp_min ?? "--"}°C</b>
                    </span>
                    <span>
                      Max: <b>{state?.temp_max ?? "--"}°C</b>
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
                {translate === "en" ? "العربية" : "English"}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

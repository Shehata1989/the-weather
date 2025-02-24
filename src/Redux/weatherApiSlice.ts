import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export interface IState {
  city: { name: string; lat: number; lon: number };
  dataWeather: {
    temp: string;
    country: string;
    temp_min: string;
    temp_max: string;
    description: string;
    icon: string;
  };
  isLoading: boolean;
  errorMassage: string;
}

export const fetchWeather = createAsyncThunk(
  "fetchWeather",
  async (city: { name: string; lat: number; lon: number }) => {
    const API_KEY = "dccc4ff7e4cd9f1ffc2ba4016a6c649c";
    if (city.lat === 0 || city.lon === 0) throw new Error("Invalid city coordinates");
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`;

    const response = await axios.get(URL);
    const data = response.data;

    return {
      temp: parseFloat((data.main.temp - 273.15).toFixed(1)) + "°C",
      country: data.sys.country || "--",
      temp_min: parseFloat((data.main.temp_min - 273.15).toFixed(1)) + "°C",
      temp_max: parseFloat((data.main.temp_max - 273.15).toFixed(1)) + "°C",
      description: data.weather[0].description || "No response",
      icon: data.weather[0].icon
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        : "",
    };
  }
);

const initialState: IState = {
  city: { name: "", lat: 0, lon: 0 },
  dataWeather: {
    temp: "",
    country: "",
    temp_min: "",
    temp_max: "",
    description: "",
    icon: "",
  },
  isLoading: false,
  errorMassage: "",
};

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.dataWeather = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.errorMassage = action.error.message || "";
    });
  },
});

export const { setCity } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;

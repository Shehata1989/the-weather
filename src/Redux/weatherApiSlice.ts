import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export interface IState {
  city: {name: string, lat: number, lon: number};
  dataWeather: {
    temp: number;
    country: string;
    temp_min: number;
    temp_max: number;
    description: string;
    icon: string;
  };
}


export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather", async (city: { name: string; lat: number; lon: number }) => {
    const API_KEY = "dccc4ff7e4cd9f1ffc2ba4016a6c649c";
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`;
  
    const response = await axios.get(URL);
    const data = response.data;
  
    return {
      temp: parseFloat((data.main.temp - 273.15).toFixed(1)),
      country: data.sys.country || "--",
      temp_min: parseFloat((data.main.temp_min - 273.15).toFixed(1)),
      temp_max: parseFloat((data.main.temp_max - 273.15).toFixed(1)),
      description: data.weather[0].description || "No response",
      icon: data.weather[0].icon
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        : "",
    };
  })


const initialState: IState = {
  city: { name: "Alexandria", lat: 31.205753, lon: 29.924526 },
  dataWeather: {
    temp: 0,
    country: "",
    temp_min: 0,
    temp_max: 0,
    description: "",
    icon: "",
  },
};

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.dataWeather = action.payload;
    });
  },
});

export const { setCity } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;

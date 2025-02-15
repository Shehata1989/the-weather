import { IAPI, IState } from "../App";

export const reducer = (
  state: IState,

  action: { type: string; payload: IAPI }
): IState => {
  if (action.type === "FETCH_DATA") {
    const data = action.payload;

    if (!data.main || !data.sys || !data.weather || data.weather.length === 0) {
      return state;
    }

    return {
      temp: parseFloat((data.main.temp - 273.15).toFixed(1)),
      country: data.sys.country || "--",
      temp_min: parseFloat((data.main.temp_min - 273.15).toFixed(1)),
      temp_max: parseFloat((data.main.temp_max - 273.15).toFixed(1)),
      description: data.weather[0].description || "No data",
      icon: data.weather[0].icon
        ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        : "",
    };
  }

  return state;
};

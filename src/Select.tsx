/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "./Redux/weatherApiSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface City {
  name: string;
  lat: number;
  lon: number;
}

const cities: City[] = [
  { name: "Alexandria", lat: 31.205753, lon: 29.924526 },
  { name: "Cairo", lat: 30.033333, lon: 31.233334 },
  { name: "Giza", lat: 30.0131, lon: 31.2089 },
  { name: "Port Said", lat: 31.2565, lon: 32.2841 },
  { name: "Suez", lat: 29.9668, lon: 32.5498 },
  { name: "Ismailia", lat: 30.59, lon: 32.2655 },
  { name: "Mansoura", lat: 31.05, lon: 31.38 },
  { name: "Damietta", lat: 31.4165, lon: 31.8133 },
  { name: "Tanta", lat: 30.787, lon: 31.0019 },
  { name: "Zagazig", lat: 30.5833, lon: 31.5167 },
  { name: "Beni Suef", lat: 29.0661, lon: 31.0994 },
  { name: "Fayoum", lat: 29.3084, lon: 30.8428 },
  { name: "Minya", lat: 28.1099, lon: 30.7503 },
  { name: "Asyut", lat: 27.186, lon: 31.171 },
  { name: "Sohag", lat: 26.56, lon: 31.6952 },
  { name: "Qena", lat: 26.1642, lon: 32.7267 },
  { name: "Luxor", lat: 25.6872, lon: 32.6396 },
  { name: "Aswan", lat: 24.0889, lon: 32.8998 },
  { name: "Marsa Matrouh", lat: 31.3541, lon: 27.2373 },
  { name: "Hurghada", lat: 27.2579, lon: 33.8116 },
  { name: "Sharm el-Sheikh", lat: 27.9158, lon: 34.3299 },
  { name: "Arish", lat: 31.1316, lon: 33.7984 },
];

export default function MultipleSelect() {
  const { t, i18n } = useTranslation();
  const { city } = useSelector((state: any) => {
    return state.weatherApiReducer;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCity = cities.find((c) => c.name === event.target.value);
    if (selectedCity) {
      dispatch(setCity(selectedCity));
    }
  };

  return (
    <div>
      <FormControl className="w-full">
        <InputLabel
          className="!text-zinc-900 !font-semibold"
          id="city-select-label"
        >
          {t("City")}
        </InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={city?.name || ""}
          onChange={handleChange}
          input={<OutlinedInput label="City" />}
          MenuProps={MenuProps}
          className="!text-zinc-900 !font-semibold"
        >
          {cities.map((c) => (
            <MenuItem
              className="!text-zinc-900 !font-semibold"
              key={c.name}
              value={c.name}
            >
              {t(c.name)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

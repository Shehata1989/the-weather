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
];

export default function MultipleSelect() {
  const { t, i18n } = useTranslation();
const {city} = useSelector((state: any ) => {
  return state.weatherApiReducer
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
        <InputLabel className="!text-zinc-900 !font-semibold" id="city-select-label">
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
            <MenuItem className="!text-zinc-900 !font-semibold" key={c.name} value={c.name}>
              {t(c.name)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

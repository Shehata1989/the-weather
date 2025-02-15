import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface City {
  name: string;
  lat: number;
  lon: number;
}

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

const cities: City[] = [
  { name: "Alexandria", lat: 31.205753, lon: 29.924526 },
  { name: "Cairo", lat: 30.033333, lon: 31.233334 },
];

export default function MultipleSelect({
  city,
  setCity,
}: {
  city: City;
  setCity: Dispatch<SetStateAction<City>>;
}) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCity = cities.find((c) => c.name === event.target.value);
    if (selectedCity) {
      setCity(selectedCity);
    }
  };

  return (
    <div>
      <FormControl className="w-full">
        <InputLabel
          className="!text-black !font-semibold"
          id="city-select-label"
        >
          {t("City")}
        </InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={city.name}
          onChange={handleChange}
          input={<OutlinedInput label="City" />}
          MenuProps={MenuProps}
          className="!text-black !font-semibold"
        >
          {cities.map((c) => (
            <MenuItem
              className="!text-black !font-semibold"
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

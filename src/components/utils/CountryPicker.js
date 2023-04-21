import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

function CountryPicker({ text }) {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <Select
      placeholder={text}
      options={options}
      value={value}
      onChange={changeHandler}
    />
  );
}

export default CountryPicker;

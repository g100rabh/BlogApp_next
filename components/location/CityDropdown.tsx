import React, { useState, useEffect } from "react";
import { City, Country, State } from "country-state-city";

export default function CityDropdown({ country, state, onSelect, val }) {
  const [cities, setCities] = useState<string[]>([]);
  const countryData = Country.getAllCountries();

  useEffect(() => {
    const fetchCities = () => {
      if (country && state) {
        const countryCode = countryData.find(
          (i) => i.name === country,
        )?.isoCode;
        const stateData = State.getStatesOfCountry(countryCode);
        const stateCode = stateData.find((i) => i.name === state)?.isoCode;
        if (countryCode && stateCode) {
          const cityData = City.getCitiesOfState(countryCode, stateCode).map(
            (c) => c.name,
          );
          setCities([...cityData]);
        }
      }
    };

    fetchCities();
  }, [country, state]);

  return (
    <select onChange={(e) => onSelect(e.target.value)} value={val}>
      <option value="">Select City</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}

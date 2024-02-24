import React, { useEffect, useState } from "react";
import axios from "axios";

export default function States() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selCountries, setSelCountries] = useState([]);
  const [selStates, setSelStates] = useState([]);
  const [selCities, setSelCities] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const res = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    apiCall();
  }, []);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const res = await axios.get(
          `https://crio-location-selector.onrender.com/country=${selCountries}/states`
        );
        setStates(res.data);
        setSelStates("");
        setCities([]);
        setSelCities("");
      } catch (e) {
        console.log(e);
      }
    };
    if (selCountries) apiCall();
  }, [selCountries]);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const res = await axios.get(
          `https://crio-location-selector.onrender.com/country=${selCountries}/state=${selStates}/cities`
        );
        setCities(res.data);
        setSelCities("");
      } catch (e) {
        console.log(e);
      }
    };
    if (selCountries && selStates) apiCall();
  }, [selStates]);

  return (
    <div>
      <h1>Select Location</h1>
      <div>
        <select
          value={selCountries}
          onChange={(e) => setSelCountries(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select
          value={selStates}
          onChange={(e) => setSelStates(e.target.value)}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select
          value={selCities}
          onChange={(e) => setSelCities(e.target.value)}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      {selCities ? (
        <div>
          You selected {selCities}, {selStates}, {selCountries}
        </div>
      ) : (
        false
      )}
    </div>
  );
}

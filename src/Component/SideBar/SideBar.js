import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../Redux/Store';

export default function SideBar() {
  const store = useContext(StoreContext);
  const checkEnter = event => {
    if (event.key === 'Enter') {
      if (store.LatLonName.length > 0) {
        store.LatLonNameAction({
          type: 'resetLatLon',
          payload: [],
        });
        store.getOnClickAPI({
          type: 'resetLatLon',
          payload: [],
        });
      }
      getCityInPut(event.target.value);
    }
  };

  const [city, getCityAPI] = useState(null);
  const [cityInput, getCityInPut] = useState(null);

  useEffect(() => {
    const apiKey = '439d4b804bc8187953eb36d2a8c26a02';
    if (cityInput) {
      let city = cityInput.toLowerCase().replaceAll(' ', '');
      fetch(
        `https://openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}`
      )
        .then(res => res.json())
        .then(data => getCityAPI(data));
    }
  }, [cityInput]);

  return (
    <div className="side-bar">
      <input
        onKeyDown={event => checkEnter(event)}
        id="citySearch"
        className="search-bar"
        placeholder="Seach..."
      />
      <p className="enter2search">Enter to seach.</p>
      {city &&
        city.list.map((city, index) => (
          <div
            key={index}
            className="search-city-container"
            onClick={() => {
              store.LatLonNameAction({
                type: 'putLatLonName',
                payload: [city.coord.lat, city.coord.lon, city.name],
              });
              store.getOnClickAPI({
                type: 'resetLatLon',
                payload: [],
              });
            }}
          >
            <div className="city-info">
              <img
                style={{ width: 28 }}
                src={`https://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`}
                alt=""
              />
              <p style={{ marginLeft: 4 }}>{city.name}</p>
            </div>
            <div className="city-temp">
              <p style={{ marginRight: 4 }}>
                {(city.main.temp - 273.15).toFixed(2)}
              </p>
              <p>
                temperature from {(city.main.temp_min - 273.15).toFixed(2)} to{' '}
                {(city.main.temp_max - 273.15).toFixed(2)}
              </p>
            </div>
            <div className="city-wind">
              <p>
                wind {city.wind.speed} m/s. clouds {city.clouds.all}%
              </p>
            </div>
            <div className="city-geo">
              <p>
                Geo coords [{city.coord.lat}, {city.coord.lon}]
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

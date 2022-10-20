import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../Redux/Store";
import OnClickDay from "../OnClickDay/OnClickDay";

export default function MainContent() {
  const store = useContext(StoreContext);

  const [latLonName, getLatLonName] = useState(null);
  const [lsLatLonAPI, getLatLonAPI] = useState(null);

  let arrDays =
    "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
  let arrMonths =
    "January Febuary March April May June July August September October November December".split(
      " "
    );

    useEffect(() => {
      if (store.LatLonName.length > 0) {
        getLatLonName(store.LatLonName);
      }
      if(store.LatLonName.length === 0){
        getLatLonAPI(null);
      }
    }, [store.LatLonName]);

  useEffect(() => {
    if (latLonName !== null) {
      const apiKey = "439d4b804bc8187953eb36d2a8c26a02";
      fetch(
        `https://openweathermap.org/data/2.5/onecall?lat=${latLonName[0]}&lon=${latLonName[1]}&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => getLatLonAPI(data));
    }
  }, [latLonName]);
  return (
    <div className="main">
      {lsLatLonAPI && (
        <>
          <div className="country-time">
            <h1>
              {new Date(lsLatLonAPI.current.dt * 1000).getHours()} :{" "}
              {new Date(lsLatLonAPI.current.dt * 1000).getMinutes()}{" "}
              {new Date(lsLatLonAPI.current.dt * 1000).getHours() < 12
                ? "AM"
                : "PM"}
            </h1>
            <p>
              {arrDays[new Date(lsLatLonAPI.current.dt * 1000).getDay()]}
              {", "}
              {new Date(lsLatLonAPI.current.dt * 1000).getDate()}{" "}
              {arrMonths[new Date(lsLatLonAPI.current.dt * 1000).getMonth()]}
              {", "}
              {new Date(lsLatLonAPI.current.dt * 1000).getUTCFullYear()}
            </p>
          </div>
          <div className="welcome-message">
            <h1>Welcome to {latLonName[2]}.</h1>
          </div>
          <div className="next-days">
            {lsLatLonAPI.daily.map((day, index) => (
              <div
                onClick={() => {
                  store.getOnClickAPI({
                    type: "putOnClickData",
                    payload: [day],
                  });
                }}
                key={index}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt=""
                />
                <p>{arrDays[new Date(day.dt * 1000).getDay()].slice(0, 3)}</p>
                <p>{day.temp.day}°C</p>
              </div>
            ))}
          </div>
          <OnClickDay />
        </>
      )}
    </div>
  );
}

import React from "react";
import { useContext } from "react";
import { StoreContext } from "../Redux/Store";

export default function OnClickDay() {

  const store = useContext(StoreContext);
  function SunMoonStr(dt) {
    let APM = dt.getHours() > 12 ? "PM" : "AM";
    return `${dt.getHours() % 12 < 10 ? "0" : ""}${dt.getHours() % 12}:${
      dt.getMinutes() < 10 ? "0" : ""
    }${dt.getMinutes()} ${APM}`;
  }

  let arrDays =
    "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
  return (
    store.onClickAPI.length > 0 && (
      <div className="current-day">
        <h1>{arrDays[new Date(store.onClickAPI[0].dt * 1000).getDay()]}</h1>
        <div className="current-day-detail">
          <div>
            <div>
              <div className="current-day-2nd-div">
                <p className="current-day-2nd-div-header">Sun and Moon</p>
                <p className="current-day-2nd-div-child">
                  Sunrise :{" "}
                  {SunMoonStr(new Date(store.onClickAPI[0].sunrise * 1000))}
                </p>
                <p className="current-day-2nd-div-child">
                  Sunset :{" "}
                  {SunMoonStr(new Date(store.onClickAPI[0].sunset * 1000))}
                </p>
                <p className="current-day-2nd-div-child">
                  Moonrise :{" "}
                  {SunMoonStr(new Date(store.onClickAPI[0].moonrise * 1000))}
                </p>
                <p className="current-day-2nd-div-child">
                  Moonset :{" "}
                  {SunMoonStr(new Date(store.onClickAPI[0].moonset * 1000))}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="current-day-2nd-div">
              <p className="current-day-2nd-div-header">Temperature</p>
              <p className="current-day-2nd-div-child">
                Day : {store.onClickAPI[0].temp.day}°C
              </p>
              <p className="current-day-2nd-div-child">
                Min : {store.onClickAPI[0].temp.min}°C
              </p>
              <p className="current-day-2nd-div-child">
                Max : {store.onClickAPI[0].temp.max}°C
              </p>
              <p className="current-day-2nd-div-child">
                Night : {store.onClickAPI[0].temp.night}°C
              </p>
            </div>
          </div>
          <div>
            <div className="current-day-2nd-div">
              <p className="current-day-2nd-div-header">Feels like</p>
              <p className="current-day-2nd-div-child">
                Day : {store.onClickAPI[0].feels_like.day}°C
              </p>
              <p className="current-day-2nd-div-child">
                Night : {store.onClickAPI[0].feels_like.night}°C
              </p>
              <p className="current-day-2nd-div-child">
                Evening : {store.onClickAPI[0].feels_like.eve}°C
              </p>
              <p className="current-day-2nd-div-child">
                Morning : {store.onClickAPI[0].feels_like.morn}°C
              </p>
            </div>
          </div>
          <div>
            <div className="current-day-2nd-div">
              <p className="current-day-2nd-div-header">Other</p>
              <p className="current-day-2nd-div-child">
                Wind degrees : {store.onClickAPI[0].wind_deg}°
              </p>
              <p className="current-day-2nd-div-child">
                Wind speed : {store.onClickAPI[0].wind_speed}m/s
              </p>
              <p className="current-day-2nd-div-child">
                Cloud : {store.onClickAPI[0].clouds}%
              </p>
              <p className="current-day-2nd-div-child">
                UV : {store.onClickAPI[0].uvi}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

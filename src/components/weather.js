import React from "react";

const Weather = props => (
  <div className="infoWeath">
  {props.city &&
    <div>
      <p>Местоположение: {props.city}, {props.country}</p>
      <p>Температура: {props.temp}</p>
      <p>Восход Солнца: {props.sunrise}</p>
      <p>Заход Солнца: {props.sunset}</p>
      <p>Давление: {props.pressure}</p>
    </div>
  }
  <p className="error">{props.error}</p>
  </div>
);

export default Weather;

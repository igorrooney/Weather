import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "6ddf2bb020debcdf465bd55482d9d14d";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    pressure: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    const time = ms => {
      var date = new Date(ms*1000);
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();
      return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }


    if(city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var sunrise = data.sys.sunrise;
      var date = new Date();
      console.log(date);
      date.setTime(sunset);
      console.log(date);
      var sunset_date = time(sunset);
      var sunrise_date = time(sunrise);

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunrise: sunrise_date,
        sunset: sunset_date,
        pressure: data.main.pressure,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        pressure: undefined,
        error: "Введите название города"
      });
    }


  }

  render() {
    return (
      <div className="wrapper">
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info">
              <Info />
            </div>
            <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather} />
              <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                pressure={this.state.pressure}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>


      </div>
    );
  }
}

export default App;

import React, { useState } from "react";
import "./Weather.css";
import { Air, Search, Water } from "@mui/icons-material";
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import humidityy from "./assets/humidity.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import sunny  from "./assets/sunny.webp"; 
import wind  from "./assets/wind.png"; 
function Weather() {
  let api_Key = "9e6740581d2b9ce97c2a0f2a2ee015ef";
  const handleClick = () => {
    search();
  };

  const handleKeyDown = (event) => {
    console.log('Key pressed:', event.key);
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      search();
    }
  };
  const [wicon,setwicon] = useState(clear);
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");

    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_Key}`;
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const windSpeed = document.getElementsByClassName("windspeed");
    const temperature = document.getElementsByClassName("temp");
    const location = document.getElementsByClassName("place");
    const description = document.getElementsByClassName("desc");

    humidity[0].innerHTML = data.main.humidity + "%";
    windSpeed[0].innerHTML = Math.floor(data.wind.speed) + "km/hr";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;
    description[0].innerHTML = data.weather[0].description;

if(data.weather[0].icon==="01d"||data.weather[0].icon==="01n"){
      setwicon(sunny);
}
else if(data.weather[0].icon==="02d"||data.weather[0].icon==="02n"){
      setwicon(cloud);
}
else if(data.weather[0].icon==="03d"||data.weather[0].icon==="03n"){
      setwicon(drizzle);
}
else if(data.weather[0].icon==="04d"||data.weather[0].icon==="04n"){
      setwicon(wind);
}
else if(data.weather[0].icon==="09d"||data.weather[0].icon==="09n"){
      setwicon(rain);
}
else if(data.weather[0].icon==="10d"||data.weather[0].icon==="10n"){
      setwicon(humidityy);
}
else if(data.weather[0].icon==="13d"||data.weather[0].icon==="13n"){
      setwicon(snow);
}
else if(data.weather[0].icon==="50d"||data.weather[0].icon==="50n"){
      setwicon(humidityy);
}
else{
      setwicon(clear);
}

  };

  return (
    <div className="box p-4">
      <div className="wrapper flex flex-col justify-center gap-6 items-center">
        <div className="search flex items-center gap-4 ">
          <div className="input flex items-center">
            <input
            onKeyDown={handleKeyDown}
              className="cityInput px-4 h-[50px] w-[370px] rounded-[40px] border-none text-black  "
              type="text"
              placeholder="Enter the city"
            />
          </div>
          <div 
          
            onClick={handleClick}
            tabIndex="0"
            className="searchIcon bg-white rounded-[50%] p-2  cursor-pointer"
          >
            <Search style={{ fontSize: "36px", color: "black" }} />
          </div>
        </div>
        <div className="weatherIcon">
          <img src= {wicon}  height='100px' width='100px' alt=" Icons" />
        </div>
        <div className="weatherDescription ">
          <p className="desc">Clear Sky</p>
        </div>

        <div className="temperature ">
          <p className="temp">21°C</p>
        </div>
        
        <div className="place">London</div>
        <div className="weatherReport flex items-center justify-between gap-[5rem] ">
          <div className=" flex flex-col">
            <div className="flex items-center justify-center gap-2">
              <Water />
              <p className="humidity-percent">64%</p>
            </div>
            <h4 className="text-[18px] font-medium"> Humidity</h4>
          </div>
          <div className="wind flex flex-col ">
            <div className="flex gap-2 items-center justify-center ">
              <Air />

              <p className="windspeed"> 45km/hr</p>
            </div>
            <h4 className="text-[18px] font-medium"> Wind Speed</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

import { useState, useEffect } from "react";

import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';

const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-12-04&end_date=2023-12-06"

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const sliderStyle = {
  initialSlide: 1,
  slideSize: "70%",
  slideGap: "md",
  withIndicators: false,
  includeGapInSize: false,
  styles: {
    slide: {
      backgroundColor: "yellow",
      borderRadius: "30px"
    },

  }
}

function App() {

  const [weather, setWeather] = useState({});

  const getData = () => {
    setWeather({...weather, isLoading: true});

    return fetch(`${API}`)
      .then(checkReponse)
      .then(response => setWeather( {...weather, data: response, isLoading: false, hasError: false} ))
      .catch(e => setWeather({...weather, loading: false, hasError: true}));
  }

  useEffect(() => {
    getData();
  }, []);

  if (weather.data) {
    console.log(weather.data);
  }

  return (
    <>
      <h1>Weather App</h1>

      {
        weather.data &&
        <Carousel {...sliderStyle}>
          {
            weather.data.daily.time.map((item, index) => (
              <Carousel.Slide key={index}>
                <p style={{backgroundColor: "green"}}>{item}</p>
                <p>{weather.data.daily.temperature_2m_max[index]}</p>
                <p>{weather.data.daily.temperature_2m_min[index]}</p>
              </Carousel.Slide>
            ))
          }
        </Carousel>
      }

    </>
  );
}

export default App;

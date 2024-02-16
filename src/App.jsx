
import './App.css';
import Header from './components/Header';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';



function App() {

  const[city, setCity] = useState('');
  const[weatherdata, setWeatherData] = useState('');
  const[imagesrc, setImageSrc] = useState('');
 

  const API_KEY = 'dd94f859a0e52d6e4767fddf735f04a7';

  
  const getWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

      setWeatherData(response.data);

      const iconCode = response.data.weather[0]?.icon;
      const imagesrc = `https://openweathermap.org/img/w/${iconCode}.png`;
      setImageSrc(imagesrc);

      
      

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
  };
  
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };


  return (
    <div className='App'>
        <Header/>
        <div className="d-flex justify-content-center align-items-center mt-0" style={{ height: '70vh' }}>
          <Card  style={{ width: '30rem', background: 'url("https://i.pinimg.com/originals/9f/72/a4/9f72a4881c7f3791da3dadf12e218efb.gif")', backgroundSize: 'cover' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text> */}
              <InputGroup className="mb-3 mt-5">
                <FormControl placeholder="Search" aria-label="Search" value={city} 
                  onChange={(e) => setCity(e.target.value)} type='text' />
                <Button variant="primary" onClick={getWeatherData}>Search</Button>
              </InputGroup>
              <Card.Text className='text-light'>
                <h2><b>{weatherdata.name}</b></h2>
              </Card.Text>
              <img src={imagesrc} alt="" style={{ width: '200px' }}/>
              <Card.Text className='text-light'>
                <h3><b>Tempature : {kelvinToCelsius(weatherdata?.main?.temp).toFixed(2)}°C</b></h3>
              </Card.Text>
              <Card.Text className='text-light'>
                <h3><b>Humidity : {weatherdata?.main?.humidity }%</b></h3>
              </Card.Text>
            </Card.Body>
          </Card> 
        </div> 
    </div>
  );
}

export default App;

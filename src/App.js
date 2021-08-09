import React, { useState } from 'react';
import './App.css';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'react-multi-carousel/lib/styles.css';
import useOpenWeatherMapApi from './hooks/useWeatherMapAPI';
import { TextField, Button, Radio } from '@material-ui/core';
import BarChat from './components/barChat';
import WeatherCarousel from './components/weatherCarousel';
import Loading from './components/loading';

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedValue, setSelectedValue] = React.useState('fahrenheit');
    const [cityName, setCityName] = useState('Munich');
    const { isLoading, data, fetchData } = useOpenWeatherMapApi(cityName);

    return (
        <div className="App">
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField id="outlined-basic" label="Enter City Name" variant="outlined" onChange={e => setCityName(e.target.value)} value={cityName} autoComplete="off" />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setSelectedValue('fahrenheit');
                                    fetchData(cityName);
                                }}
                            >
                                GO
                                </Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <RadioGroup aria-label="tempType" name="tempType" row value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                                <FormControlLabel value="fahrenheit" control={<Radio />} label="Fahrenheit" />
                                <FormControlLabel value="celsius" control={<Radio />} label="Celsius" />
                            </RadioGroup>
                        </div>
                        <WeatherCarousel
                            setCurrentIndex={setCurrentIndex}
                            data={data}
                            selectedValue={selectedValue}
                            currentIndex={currentIndex}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BarChat data={data[currentIndex || 0]?.items} selectedValue={selectedValue} />
                        </div>
                    </>
            }
        </div>

    );
}

export default App;


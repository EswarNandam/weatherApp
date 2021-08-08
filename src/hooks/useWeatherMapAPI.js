import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST, API_KEY, promise } from '../helpers/utils';


const useWeatherMapApi = initialCity => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const avgTemp = (weatherListData) => {
        let totalTemp = 0;
        weatherListData.forEach(element => {
            totalTemp += element.temperature
        });
        return totalTemp / weatherListData.length;
    }

    const fetchData = async (city) => {
        setIsError(false);
        setIsLoading(true);

        const [err, result] = await promise(
            axios.get(
                `${API_HOST}/forecast?q=${city}&mode=json&units=metric&appid=${API_KEY}`
            )
        );

        if (err) {
            setIsLoading(false);
            setData([]);
            return setIsError(true);
        }
        const data = result.data;
        const groupedByDays = data.list
            .map(item => {
                const date = new Date(item.dt_txt);
                const day = date.toLocaleDateString();
                const hour = date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
                return {
                    date: day,
                    id: item.weather[0],
                    temperature: item.main.temp,
                    celsiusTemp: (item.main.temp - 32) * (5 / 9),
                    day: new Date(item.dt_txt.replace(/-/g, "/")).getDay(),
                    hour: hour,
                }
            });
        const groupingByDate = groupedByDays.reduce(function (h, obj) {
            h[obj.date] = (h[obj.date] || []).concat(obj);
            return h;
        }, []);
        // Sort by dates and return with array format
        const sortedDataSet = Object.keys(groupingByDate)
            .sort(function (a, b) {
                return new Date(b[0].date) - new Date(a[0].date);
            });

        const finalData = sortedDataSet.map(key => ({
            date: key, items: groupingByDate[key],
            avgTemp: avgTemp(groupingByDate[key]),
            avgTempCelsius: (avgTemp(groupingByDate[key]) - 32) * (5 / 9),
        }));
        setData(finalData);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData(initialCity);
    }, []);

    return {
        data,
        isError,
        fetchData,
        isLoading
    };
};

export default useWeatherMapApi;

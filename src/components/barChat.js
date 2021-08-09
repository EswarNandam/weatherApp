import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';



export default function BarChat({data, selectedValue}) {
    console.log(selectedValue);
    return (
        <BarChart width={800} height={400} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
            <XAxis dataKey="hour">
            <Label value="Time" offset={0} position="bottom" />
            </XAxis>
            <YAxis dataKey={selectedValue === 'celsius' ? 'celsiusTemperature' : 'temperature'} label={{ value: `Temperature (${selectedValue === 'celsius' ? 'C' : 'F'})`, angle: -90, position: 'left' }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey={selectedValue === 'celsius' ? 'celsiusTemperature' : 'temperature'} barSize={20} fill="#8884d8" />
            <Legend align="right" verticalAlign="bottom"/>
        </BarChart>
    );
}

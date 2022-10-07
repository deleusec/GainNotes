import React, {useEffect, useRef, useState} from 'react';
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import data from '../data/weight.json';
import {format} from 'date-fns'

function LineChart({scaleValue}) {
    // useStates
    const [datesArray, setDatesArray] = useState([])
    const [xAbsisValues, setXAbsisValues] = useState([])
    const [yAbsisValues, setYAbsisValues] = useState([])

    let currentDate = new Date();
    let date = currentDate;
    let dates = [date.getDate()]

    if (scaleValue === "Week") {
        // Get previous dates
        for (let i = 0; i < 3; i++) {
            const previousDate = date.getTime() - 86400000;
            date = new Date(previousDate)
            dates.push(date.getDate())

        }
        dates.reverse()
        date = currentDate;
        for (let i = 0; i < 3; i++) {
            const previousDate = date.getTime() + 86400000;
            date = new Date(previousDate)
            dates.push(date.getDate())

        }
    } else if (scaleValue === "Month") {

    } else if (scaleValue === "Year") {

    }


    return (
        <Line
            datasetIdKey={'id'}
            options={{
                scales: {
                    y: {
                        max: 80,
                        min: 70,
                    }
                },
            }}
            data={{
                labels: dates,
                datasets: [
                    {
                        showInLegend: true,
                        id: 1,
                        label: '',
                        data: [75, null, 74, 73],

                        tension: 0.4,
                        fill: true,
                        borderColor: '#c084fc',
                        spanGaps: true,
                        backgroundColor: 'rgba(192,132,252,0.5)'

                    }
                ],
            }}/>

    );
}

export default LineChart;

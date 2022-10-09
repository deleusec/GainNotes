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
    const [maxYValue, setMaxYValue] = useState(0)
    const [minYValue, setMinYValue] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let currentDate = new Date();
        let editableDate = currentDate;

        if (scaleValue === "Week") {

            /**
             * Y ABSIS
             */

            // Get Min and Max value on the X absis
            const weights = data.weights.map((item)=>{
                return item.weight
            })
            setMaxYValue( Math.round(Math.max(...weights)+ 10))
            setMinYValue( Math.round(Math.min(...weights)- 10))


            /**
             * X ABSIS
             */

            // Add current date in array
            let dates = [editableDate.getTime()]

            // Get previous dates
            for (let i = 0; i < 3; i++) {
                const previousDate = editableDate.getTime() - 86400000;
                editableDate = new Date(previousDate)
                dates.push(editableDate.getTime())

            }
            dates.reverse()
            editableDate = currentDate;
            // Get next dates
            for (let i = 0; i < 3; i++) {
                const nextDate = editableDate.getTime() + 86400000;
                editableDate = new Date(nextDate)
                dates.push(editableDate.getTime())

            }

            let datesFormat = []
            const datesNumber = dates.map((item)=>{
                datesFormat.push(format(new Date(item), "dd/MM/yyyy"))
                return new Date(item).getDate()
            })
            setXAbsisValues(datesNumber)

            const lastDates = datesFormat.slice(0,-3)
            let values = []
            lastDates.forEach((date)=>{
                let isUpdate = false
                data.weights.forEach((value)=>{
                    if(value.date === date){
                        values.push(value.weight)
                        isUpdate = true
                    }
                })
                if(!isUpdate){
                    values.push(null)
                }
            })
            setDatesArray(values)

        } else if (scaleValue === "Month") {
            console.log('month !')
            setDatesArray([])
            setXAbsisValues([])
            setMaxYValue("")
            setMinYValue("")
        } else if (scaleValue === "Year") {
            console.log('year !')
            setDatesArray([])
            setXAbsisValues([])
            setMaxYValue("")
            setMinYValue("")
        }

    }, [scaleValue])

    useEffect(()=>{
        if(minYValue !== "" && maxYValue !=="" && xAbsisValues !== [] && datesArray !== []){
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    },[xAbsisValues,minYValue,maxYValue,datesArray])

    return (
        <div className={'min-h-[100px]'}>
            {isLoading ? <Line
                datasetIdKey={'id'}
                options={{
                    scales: {
                        y: {
                            max: maxYValue,
                            min: minYValue,
                        }
                    },
                }}
                data={{
                    labels: xAbsisValues,
                    datasets: [
                        {
                            showInLegend: true,
                            id: 1,
                            label: '',
                            data: datesArray,

                            tension: 0.4,
                            fill: true,
                            borderColor: '#c084fc',
                            spanGaps: true,
                            backgroundColor: 'rgba(192,132,252,0.5)'

                        }
                    ],
                }}/> : "In progress..."}
        </div>


    );
}

export default LineChart;

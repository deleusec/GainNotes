import React, {useEffect, useRef} from 'react';
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
import {Line} from 'react-chartjs-2'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart(props) {


    console.log(new Date())

    return (
        <div>
            <Line
                datasetIdKey={'id'}
                data={{
                    labels: ['Jun', 'Jul', 'Aug'],
                    datasets: [
                        {
                            id: 1,
                            label: '',
                            data: [5, 6, 7],
                        },
                        {
                            id: 2,
                            label: '',
                            data: [3, 2, 1],
                        },
                    ],
                }}/>
        </div>

    );
}

export default LineChart;

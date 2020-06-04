import React, { useState, useEffect} from 'react';
import { fetchDailyData } from '../../API';
import { Line, HorizontalBar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts = ({ data:{confirmed, recovered, deaths}, country }) => {
    
    // state={ dailyData:{} } 
    // we use 'hooks' instead as below

    const [dailyData, setDailyData] = useState([]); //instead of providing a initial value, we set it to empty array since daily data is an empty array
    
    useEffect( () => { 
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []); //we add a blank array '[]' at last so that the 'useEffect' gets called only once otherwise it will keep getting called

    const lineChart = (
        dailyData.length 
            ?(
            <Line 
                data={{
                    labels:dailyData.map(({ date }) => date), 
                    datasets: [{
                                    data: dailyData.map(({ confirmed })=> confirmed),
                                    label: 'Infected',
                                    borderColor: '#3333ff',
                                    fill: true,
                                },
                                {
                                    data: dailyData.map(({ deaths })=> deaths),
                                    label: 'Deaths',
                                    borderColor: 'red',
                                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                                    fill: true,
                                }],
                    }}/>
            ) : null
    )

    // BAR-CHART
    const barChart = (
        confirmed
        ?(
            <HorizontalBar
                data= {{
                    labels: ['Total Cases', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'Population',
                        backgroundColor: [ 'rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)' ],
                        data: [ confirmed.value, recovered.value, deaths.value] 
                    }]
                }}
                options={{
                    legend: { display: false},
                    title: {display: true, text:`Current scenario in ${country}`}
                }}
            />
        ) : null
    );
    return ( 
        <div className = {styles.container}>
            {country ? barChart : lineChart }
        </div>
     );
}
 
export default Charts;
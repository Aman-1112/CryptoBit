import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Typography, Grid } from '@mui/material';

import {
	Chart as ChartJS,
	Title,
	Tooltip,
	LineElement,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	Filler,
} from 'chart.js';
import moment from 'moment/moment';
ChartJS.register(
	Title,
	Tooltip,
	LineElement,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	Filler
);

const LineChart = ({ coinHistory, currentPrice, coinName,timePeriod }) => {

	////for good looking graph only
	let skip;
	if(['7d', '3h', '24h'].includes(timePeriod)){
		skip=3;
	}
	else{
		skip=8;
	}
	////

	const coinPrice = [];
	const coinTimestamp = [];

	for (let i = 0; i < coinHistory?.history?.length; i += skip) {
		coinPrice.push(parseInt(coinHistory?.history[i].price));
	}

	for (let i = 0; i < coinHistory?.history?.length; i += skip) {
		coinTimestamp.push(
			moment.unix(coinHistory?.history[i].timestamp).format('L')
		);
	}

	coinPrice.reverse();
	coinTimestamp.reverse();

	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: 'Price In USD',
				data: coinPrice,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
				// tension:0,
				// fill:true
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return (
		<div>
			<Grid className='chart-header'>
				<Typography className='chart-title'>{`${coinName} Price Chart`}</Typography>
				<Grid className='price-container'>
					<Typography
						variant='h6'
						className='price-change'>{`${coinHistory?.change}%`}</Typography>
					<Typography
						variant='h6'
						className='current-price'>{`current price $${currentPrice}`}</Typography>
				</Grid>
			</Grid>
			<Line data={data} options={options}></Line>
		</div>
	);
};

export default LineChart;

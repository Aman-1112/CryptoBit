import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Typography, Grid } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TagIcon from '@mui/icons-material/Tag';
import OpacityIcon from '@mui/icons-material/Opacity';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HTMLReactParser from 'html-react-parser';
import LineChart from './LineChart';

function CryptoDetail(props) {
	const { cryptoId } = useParams();

	const [cryptoDetails, setCryptoDetails] = useState({});
	const [timePeriod, setTimePeriod] = useState('7d');
	const [coinHistory, setCoinHistory] = useState([]);

	function fetchingCoinDetails() {
		const options = {
			method: 'GET',
			url: `https://coinranking1.p.rapidapi.com/coin/${cryptoId}`,
			params: { referenceCurrencyUuid: cryptoId, timePeriod: '24h' },
			headers: {
				'X-RapidAPI-Key': '0b62127c8emsh03ace0871161dc0p1fb107jsnb8262a981e9a',
				'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
			},
		};
		axios
			.request(options)
			.then(function (response) {
				setCryptoDetails(response.data.data.coin);
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	function fetchingCoinHistory() {
		const options = {
			method: 'GET',
			url: `https://coinranking1.p.rapidapi.com/coin/${cryptoId}/history`,
			params: { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: timePeriod },
			headers: {
				'X-RapidAPI-Key': '0b62127c8emsh03ace0871161dc0p1fb107jsnb8262a981e9a',
				'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
			},
		};
		axios
			.request(options)
			.then(function (response) {
				setCoinHistory(response.data.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	useEffect(() => {
		fetchingCoinDetails();
	}, []);

	useEffect(() => {
		fetchingCoinHistory();
	}, [timePeriod]);

	const time = ['7d', '3h', '24h', '30d', '1y', '3m', '3y', '5y'];

	let stats;

	if (Object.keys(cryptoDetails).length !== 0) {
		stats = [
			{
				title: 'Price to USD',
				value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
				icon: <MonetizationOnIcon />,
			},
			{ title: 'Rank', value: cryptoDetails?.rank, icon: <TagIcon /> },
			{
				title: '24h Volume',
				value: millify(cryptoDetails['24hVolume']),
				icon: <OpacityIcon />,
			},
			{
				title: 'Market Cap',
				value: `$ ${
					cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
				}`,
				icon: <LocalAtmIcon />,
			},
			{
				title: 'All-time-high',
				value: `$ ${
					cryptoDetails?.allTimeHigh?.price &&
					millify(cryptoDetails?.allTimeHigh?.price)
				}`,
				icon: <EmojiEventsIcon />,
			},
		];
	}

	if (Object.keys(cryptoDetails).length === 0) {
		return <Typography variant='h4'>Loading...</Typography>;
	}

	return (
		<div>
			<Grid className='coin-detail-container'>
				<Grid className='coin-heading-container'>
					<Typography variant='h2' className='coin-name'>
						{cryptoDetails?.name} Price
					</Typography>
					<Typography variant='paragraph'>
						{cryptoDetails?.name} live price in Us Dollars view value statistics
						,market cap and supply.
					</Typography>
				</Grid>
				<select
					className='time-period'
					onChange={(e) => setTimePeriod(e.target.value)}>
					{time.map((t, i) => (
						<>
							<option key={i} value={t}>
								{t}
							</option>
						</>
					))}
				</select>
				{Object.keys(coinHistory).length && (
					<LineChart
						coinHistory={coinHistory}
						currentPrice={millify(cryptoDetails.price)}
						coinName={cryptoDetails.name}
						timePeriod={timePeriod}
					/>
				)}
				<Grid className='stats-container'>
					<Grid className='coin-value-statistics'>
						<Grid className='coin-value-statistics-heading'>
							<Typography variant='h3' className='coin-detail-heading'>
								{cryptoDetails?.name} Value Statistics
							</Typography>
						</Grid>
						{stats.map(({ icon, title, value }) => (
							<Grid className='coin-stats'>
								<Grid className='coin-stats-name'>
									<Typography>{icon}</Typography>
									<Typography>{title}</Typography>
								</Grid>
								<Typography className='stats'>{value}</Typography>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
			<Grid className='coin-desc-link'>
				<Grid className='coin-desc'>
					<Typography variant='h3'>
						<h3>What is {cryptoDetails.name}?</h3>
						{HTMLReactParser(cryptoDetails.description)}
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

export default connect()(CryptoDetail);

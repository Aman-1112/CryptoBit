import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material';
import millify from 'millify';

function Exchanges() {
	const [exchanges, setExchanges] = useState([]);

	function fetchingCoinExchanges() {
		const options = {
			method: 'GET',
			url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges',
			params: {
				referenceCurrencyUuid: 'yhjMzLPhuIDl',
				limit: '50',
				offset: '0',
			},
			headers: {
				'X-RapidAPI-Key': '0b62127c8emsh03ace0871161dc0p1fb107jsnb8262a981e9a',
				'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
			},
		};

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data.data.exchanges);
				setExchanges(response.data.data.exchanges);
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	useEffect(() => {
		fetchingCoinExchanges();
	}, []);

	if (exchanges.length == 0) {
		return <Typography variant='h4'>Loading...</Typography>;
	}

	return (
		<div>
			<Typography variant='h2' pl={4}>Coin Exchanges</Typography>
			<hr></hr>
			<Box sx={{ m: 5, mt: 0 }}>
				<Grid className='coin-header' container>
					<Grid xs={1} item></Grid>
					<Grid xs={3} item>
						Coin
					</Grid>
					<Grid xs={3} item>
						24hVolume
					</Grid>
					<Grid xs={3} item>
						No. of Markets
					</Grid>
					<Grid xs={2} item>
						Price
					</Grid>
				</Grid>
				{exchanges.map((coin) => (
					<Grid className='coin-stats' container>
						<Grid xs={1} item>{`#${coin.rank}`}</Grid>
						<Grid xs={3} item>
							<Typography variant='paragraph'>{coin.name}</Typography>
						</Grid>
						<Grid xs={3} item>
							<Typography variant='paragraph'>
								{millify(coin['24hVolume'], { space: true })}
							</Typography>
						</Grid>
						<Grid xs={3} item>
							<Typography variant='paragraph'>
								{coin.numberOfMarkets}
							</Typography>
						</Grid>
						<Grid xs={2} item justifyContent={'center'}>
							<Typography variant='paragraph'>
								{millify(coin.price, { space: true })}
							</Typography>
						</Grid>
					</Grid>
				))}
			</Box>
		</div>
	);
}
//container == row
//items == columns
export default Exchanges;

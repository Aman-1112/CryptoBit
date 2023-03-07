import React, { useEffect, useState } from 'react';
import { Grid, Typography, Title } from '@mui/material';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { fetchCoins } from '../actions/fetchCoins';
import { fetchNews } from '../actions/fetchNews';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

function Homepage(props) {
	useEffect(() => {
		if (Object.keys(props.fetchedCoins).length == 0) props.fetchCoins('10');
		if (props.fetchedNews.length == 0) props.fetchNews('6');
	}, []);

	if (Object.keys(props.fetchedCoins).length === 0) {
		return <Typography variant='h4'>Loading....</Typography>;
	} else {
		return (
			<>
			<Typography variant='h4' ml={2.5} >World Cryptocurrency Statistics</Typography>
				<Grid m={3} container spacing={2} >
					<Grid xs={12} md={6}>
						<Typography className='heading' variant='h6'>Total Cryptocurrencies</Typography>
						<Typography variant='h4'>
							{millify(props.fetchedCoins?.stats?.total)}
						</Typography>
					</Grid>
					<Grid xs={12} md={6}>
						<Typography className='heading' variant='h6'>Total Exchanges</Typography>
						<Typography variant='h4'>
							{millify(props.fetchedCoins?.stats?.totalExchanges, {
								space: true,
							})}
						</Typography>
					</Grid>
					<Grid xs={12} md={6}>
						<Typography className='heading' variant='h6'>Total Market Cap</Typography>
						<Typography variant='h4'>
							{millify(props.fetchedCoins?.stats?.totalMarketCap, {
								space: true,
							})}
						</Typography>
					</Grid>
					<Grid xs={12} md={6}>
						<Typography className='heading' variant='h6'>Total 24h Volume</Typography>
						<Typography variant='h4'>
							{millify(props.fetchedCoins?.stats?.total24hVolume, {
								space: true,
							})}
						</Typography>
					</Grid>
					<Grid xs={12} md={6}>
						<Typography className='heading' variant='h6'>Total Markets</Typography>
						<Typography variant='h4'>
							{millify(props.fetchedCoins?.stats?.totalMarkets, {
								space: true,
							})}
						</Typography>
					</Grid>
				</Grid>
				<div className='home-heading-container'>
					<Typography variant='h5' className='home-title'>
						Top 10 Cryptocurrencies in the world
					</Typography>
					<Typography variant='subtitle1' className='show-more'>
						<Link to='/cryptocurrencies'>Show More</Link>
					</Typography>
				</div>
				<Cryptocurrencies specified />
				<div className='home-heading-container'>
					<Typography variant='h5' className='home-title'>
						Latest Cryptocurrencies News
					</Typography>
					<Typography variant='subtitle1' className='show-more'>
						<Link to='/news'>Show More</Link>
					</Typography>
				</div>
				<News specified />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fetchedCoins: state.fetchCoinsReducer,
		fetchedNews: state.fetchNewsReducer,
	};
};

export default connect(mapStateToProps, { fetchCoins, fetchNews })(Homepage);

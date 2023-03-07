import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Typography,
	Grid,
	Card,
	CardHeader,
	CardMedia,
	Input,
	Box,
} from '@mui/material';
import { fetchCoins } from '../actions/fetchCoins';

function Cryptocurrencies(props) {
	const [cryptos, setCryptos] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [raised, setRaised] = useState(-1);

	//IF CRYTOCURRENCIES PAGE IS RELOADED SO CALL FETCH
	useEffect(() => {
		if (Object.keys(props.fetchedCoins).length <= 10 && !props.specified) {
			props.fetchCoins('100');
		}
	}, []);

	//ONCE DATA GETS STORED IN REDUX STORE USE IT TO UPDATE THE STATE
	useEffect(() => {
		if (Object.keys(props.fetchedCoins).length !== 0) {
			setCryptos(props.fetchedCoins.coins);
		}
	}, [props.fetchedCoins.coins]);

	//TAKE OUT COINS FROM REDUX STORE AND FILTER OUT THE MATCHED COINS
	useEffect(() => {
		let filteredCoins = props.fetchedCoins?.coins?.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setCryptos(filteredCoins);
	}, [searchTerm]);

	if (!cryptos) {
		return <Typography variant='h4'>Loading....</Typography>;
	} else {
		return (
			<div className='outer-crypto-container'>
				{!props.specified && (
					<div className='search-crypto'>
						<Input
							placeholder='Search Cryptocurrency'
							onChange={(e) => setSearchTerm(e.target.value)}
							value={searchTerm}></Input>
					</div>
				)}
				<Grid ml={2} mr={2} container spacing={2} sx={{display:"flex",flexDirection:"row"}}>
					{cryptos.map((currency, index) => {
						if (props.specified && index >= 10) {
							return null;
						}
						return (
							<Grid id="crypto-container" item  xs={12} sm={6} md={4}  lg={3} container spacing={2} key={currency.uuid}>
								<Link to={`/crypto/${currency.uuid}`}>
									<div className='crypto-card-container'>
										<Card
											raised={raised === index ? true : false}
											onMouseOver={() => setRaised(index)}
											onMouseLeave={() => setRaised(-1)}
											className='crypto-card'>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													paddingRight: '5px',
												}}>
												<CardHeader
													title={`${currency.rank}. ${currency.name}`}
												/>
												<CardMedia
													className='crypto-image'
													component='img'
													image={currency.iconUrl}
													alt='unable to load'
												/>
											</Box>
											<hr
												style={{
													color: 'gray',
													opacity: '34%',
													margin: '10px',
													borderWidth: '1px 0 0 0',
												}}
											/>
											<p>Price:{millify(currency.price)}</p>
											<p>Market Cap:{millify(currency.price)}</p>
											<p>Daily Change:{millify(currency.price)}%</p>
										</Card>
									</div>
								</Link>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { fetchedCoins: state.fetchCoinsReducer };
};

export default connect(mapStateToProps, { fetchCoins })(Cryptocurrencies);

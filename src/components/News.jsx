import React, { useEffect, useState } from 'react';
import { fetchNews } from '../actions/fetchNews';
import { connect } from 'react-redux';
import {
	Avatar,
	Card,
	FormControl,
	Grid,
	Typography,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import moment from 'moment/moment';

function News(props) {
	const [options, setOptions] = useState('Cryptocurrency');

	useEffect(() => {
		if (props.fetchedNews.length <= 6 && !props.specified) {
			props.fetchNews('12', options);
		}
	}, []);

	useEffect(() => {
		if (options !== 'Cryptocurrency') {
			props.fetchNews('12', options);
		}
	}, [options]);

	if (props.fetchedNews.length === 0) {
		return <Typography variant='h4'>Loading...</Typography>;
	}

	return (
		<div>
			{!props.specified && (
				<FormControl style={{marginLeft:"1.5rem"}} variant='standard'>
					<InputLabel id='select-label'>Select any CryptoCoin</InputLabel>
					<Select
						className='select-news'
						labelId='select-label'
						value={options}
						onChange={(e) => setOptions(e.target.value)}>
						<MenuItem disabled value={options}>
							{options}
						</MenuItem>
						{props.fetchedCoins?.coins?.map((coin) => (
							<MenuItem value={`${coin.name}`}>{coin.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			)}

			<Grid  my={2} container spacing={2}>
				{props.fetchedNews.map((news, i) => {
					if (props.specified && i >= 6) return null;
					return (
						<Grid item xs={12} lg={4} key={i}>
							<Card className='news-card'>
								<a href={news.url} target='_blank' rel='noreferrer'>
									<div className='news-image-container'>
										<Typography className='news-title'>{news.name}</Typography>
										<img
											style={{ maxWidth: '200px', maxHeight: '100px' }}
											src={news?.image?.thumbnail?.contentUrl}
											alt='no newsimage found'
										/>
									</div>
									<Typography variant='paragraph'>
										{news.description.length > 300
											? news.description.substring(0, 200).concat('....')
											: news.description}
									</Typography>
									<div className='provider-container'>
										<div>
											<Avatar
												src={news.provider[0]?.image?.thumbnail?.contentUrl}
												alt='no avatar found'>
											</Avatar>
											<Typography className='provider-name'>
												{news.provider[0]?.name}
											</Typography>
										</div>
										<Typography>
											{moment(news.datePublished).startOf('hour').fromNow()}
										</Typography>
									</div>
								</a>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		fetchedNews: state.fetchNewsReducer,
		fetchedCoins: state.fetchCoinsReducer,
	};
};

export default connect(mapStateToProps, { fetchNews })(News);

//TODO CAN'T SEE THE COINS SO WE HAVE TO FETCH COINS HERE ALSO AT INTIAL RENDER

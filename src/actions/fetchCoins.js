import axios from 'axios';
let options = {
	params: {
		referenceCurrencyUuid: 'yhjMzLPhuIDl',
		timePeriod: '24h',
		'tiers[0]': '1',
		orderBy: 'marketCap',
		orderDirection: 'desc',
		limit: '',
		offset: '0',
	},
	headers: {
		'X-RapidAPI-Key': '0b62127c8emsh03ace0871161dc0p1fb107jsnb8262a981e9a',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
	},
};

export const fetchCoins = (customLimit) => {
	return async (dispatch) => {
		options.params.limit = customLimit;
		const res = await axios.get(
			'https://coinranking1.p.rapidapi.com/coins',
			options
		);
		console.log("fetched data in redux here action ")
		dispatch({ type: 'FETCH_COINS', payload: res.data.data });
	};
};

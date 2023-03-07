import axios from 'axios';

const options = {
	params: {
		q: 'cryptocurrency',
		freshness:'Day',
		offset: '0',
		count: '4',
		// sortBy: 'Date',
		originalImg: 'true',
		textFormat: 'Raw',
		safeSearch: 'Off',
	},
	headers: {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Key': '0b62127c8emsh03ace0871161dc0p1fb107jsnb8262a981e9a',
		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
	},
};

export const fetchNews = (customLimit, customQuery) => {
	return async (dispatch) => {
		if(customLimit)options.params.count = customLimit;
		if(customQuery)options.params.q = customQuery;
		console.log(options)
		const res = await axios.get(
			'https://bing-news-search1.p.rapidapi.com/news/search',
			options
		);
		console.log("NEWS BELOW\n")
		console.log(res);
		dispatch({ type: 'FETCH_NEWS', payload: res.data.value });
	};
};

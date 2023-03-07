import React from 'react';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Exchanges from './components/Exchanges';
import Cryptocurrencies from './components/Cryptocurrencies';
import News from './components/News';
import CryptoDetail from './components/CryptoDetail';
import Footer from './components/footer';

import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import './App.css';
function App() {
	return (
		<div className='app'>
			<div className='navbar'>
				<Navbar />
			</div>
			<div className='main'>
				<Box>
					<Routes>
						<Route path='/' element={<Homepage />}></Route>
						<Route path='/exchanges' element={<Exchanges />}></Route>
						<Route path='/cryptocurrencies'element={<Cryptocurrencies />}></Route>
						<Route path='/crypto/:cryptoId' element={<CryptoDetail />}></Route>
						<Route path='/news' element={<News />}></Route>
					</Routes>
				</Box>
				<Footer />
			</div>
		</div>
	);
}

export default App;

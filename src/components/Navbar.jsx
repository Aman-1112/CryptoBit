import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, MenuItem, MenuList, Drawer } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import MenuIcon from '@mui/icons-material/Menu';

import icon from './images/crypto.png';

function Navbar() {
	const [show, setShow] = useState(false);

	return (
		<div className='nav-container'>
			<div className='logo-container'>
				<div className='logo-name'>
					<div class='logo-pic'>
						<img src={icon} alt='crypto figure'></img>
						<Typography className='logo'>
							<Link to='/'> RYPTOBITE</Link>
						</Typography>
					</div>
					<MenuIcon onClick={() => setShow(!show)} id='menu-icon' />
				</div>
				<div className='nav-computer'>
					<MenuList variant='Menu'>
						<Link to='/'>
							<MenuItem id='menu-item'>
								<HomeIcon className='nav-icon' /> <p>Home</p>
							</MenuItem>
						</Link>
						<Link to='/cryptocurrencies'>
							<MenuItem id='menu-item'>
								<CurrencyBitcoinIcon className='nav-icon'/> <p>Cryptocurrencies</p>
							</MenuItem>
						</Link>
						<Link to='/exchanges'>
							<MenuItem id='menu-item'>
								<MonetizationOnIcon className='nav-icon'/> <p>Exchanges</p>
							</MenuItem>
						</Link>
						<Link to='/news'>
							<MenuItem id='menu-item'>
								<LightbulbIcon className='nav-icon' /> <p>News</p>
							</MenuItem>
						</Link>
					</MenuList>
				</div>
				{
					<Drawer anchor='right' open={show} onClose={() => setShow(false)}>
						<div className='nav-mobile'>
							<MenuList variant='Menu'>
								<MenuItem onClick={() => setShow(!show)} id='menu-item'>
									<Link to='/'>
										<HomeIcon /> <span>Home</span>
									</Link>
								</MenuItem>
								<MenuItem onClick={() => setShow(!show)} id='menu-item'>
									<Link to='/cryptocurrencies'>
										<CurrencyBitcoinIcon /> <span>Cryptocurrencies</span>
									</Link>
								</MenuItem>
								<MenuItem onClick={() => setShow(!show)} id='menu-item'>
									<Link to='/exchanges'>
										<MonetizationOnIcon /> <span>Exchanges</span>
									</Link>
								</MenuItem>
								<MenuItem onClick={() => setShow(!show)} id='menu-item'>
									<Link to='/news'>
										<LightbulbIcon /> <span>News</span>
									</Link>
								</MenuItem>
							</MenuList>
						</div>
					</Drawer>
				}
			</div>
		</div>
	);
}

export default Navbar;

//BUG problem with drawer when opened and viewport is changed

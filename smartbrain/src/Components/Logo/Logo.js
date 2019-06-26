import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Brain from './brain.png';

function Logo() {
  return (
    <div className='mt0 ml5'>
    	<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
	 		<div className="Tilt-inner pa3"><img style={{paddingTop:'1px'}} src={Brain} alt="Logo"/></div>
		</Tilt>
    </div>
  );
}

export default Logo;
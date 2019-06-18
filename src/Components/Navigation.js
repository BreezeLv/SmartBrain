import React from 'react';

class Navigation extends React.Component {
	render() {
	  return (
	    <nav style={{display:'flex', justifyContent:'flex-end'}}>
	      <p className='f3 link dim black pa3 underline pointer' onClick={()=>this.props.onRouteChange("signin")}>Sign Out</p>
	    </nav>
	  );
	}
}

export default Navigation;
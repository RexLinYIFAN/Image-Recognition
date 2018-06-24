import React from 'react';

const Navigation=({isSignedin,onRouteChange})=>{
	if(isSignedin){
		return(
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
			<p onClick={()=>{onRouteChange('Signout')}} className="f3 link dim black underlines pa3 pointer">Sign out</p>
			</nav>
		) 
	}else{
		return(
			<div>
				<nav style={{display:'flex',justifyContent:'flex-end'}}>
					<p onClick={()=>{onRouteChange('Signin')}} className="f3 link dim black underlines pa3 pointer">Sign in</p>
					<p onClick={()=>{onRouteChange('Register')}} className="f3 link dim black underlines pa3 pointer">Register</p>
				</nav>
			</div>
		)
	}
	
}

export default Navigation;
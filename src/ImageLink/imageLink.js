import React from 'react';
import './imageLink.css';

const ImageLink=({inputChange,onSubmit})=>{ 
	return(
		<div className="">
			<p className="f3 tc">
			{'Input image link here we will detect where the man face is.'}
			</p>
			<div className="flex justify-center ">
				<div className= "pa4 br3 shadow-1 boxBody">
					<input className="f4 pa2 center w-70" type="text" onChange={inputChange}/>
					<button className="w-30 grow f4 link ph3 pv2 white bg-light-purple" onClick={onSubmit}>Detect</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLink;
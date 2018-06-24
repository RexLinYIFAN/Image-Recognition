import React from 'react';
import './facerecognition.css'

const FaceRecognition=({imageUrl,box})=>{ 
	return(
		<div className='flex justify-center ma'>
			<div className="absolute mt2 ma">
				<img id="imageDisplay" alt='' src={imageUrl} width='300px' height='auto'/>
				<div className="face" style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
			</div>
		</div>		 
	)
}

export default FaceRecognition;
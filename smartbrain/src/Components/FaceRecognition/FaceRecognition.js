import React from 'react';
import './FaceRecognition.css';

function FaceRecognition({imageUrl,box}) {
    const boundingboxes = box.map((box,idx)=>{
        return (<div key={idx} className='bounding_box' style={{top: `${box.top_row*100}%`, right: `${(1-box.right_col)*100}%`, bottom: `${(1-box.bottom_row)*100}%`, left: `${box.left_col*100}%`}}></div>);
    });

  return (
    <div className='center ma'>
        <div className='absolute mt2'>
            <img src={imageUrl} alt={"Detection"} width='500px' height='auto' />
            {boundingboxes}
        </div>
    </div>
  );
}

export default FaceRecognition;
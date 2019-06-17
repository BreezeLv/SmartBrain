import React from 'react';

function FaceRecognition({imageUrl}) {
  return (
    <div className='center ma'>
        <div className='absolute mt2'>
            <img src={imageUrl} alt={"Detection"} width='500px' height='auto' />
        </div>
    </div>
  );
}

export default FaceRecognition;
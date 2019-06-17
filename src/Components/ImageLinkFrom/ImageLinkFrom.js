import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm({onInputChanged,onButtonDetect}) {
  return (
    <div>
    	<p className='f3'>
    		{"Give it a try! Smart Brain can detect faces in images!"}
    	</p>
    	<div className='center'>
    		<div className='form center pa4 br3 shadow-5'>
	    		<input className='f4 pa2 w-70-ns center-ns' type='text' onChange={onInputChanged}/>
	    		<button className='w-30-ns f4 grow link ph3 pv2 dib white bg-blue' onClick={onButtonDetect}>Detect</button>
	    	</div>
    	</div>
    </div>
  );
}

export default ImageLinkForm;
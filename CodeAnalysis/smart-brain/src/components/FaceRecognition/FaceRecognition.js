import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, boxes }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        {/* Old solution for individual faces */}
        {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
        {/* my solution for multiple faces */}
        { boxes && boxes.length 
        ? boxes.map((box, index) => {
          return <div className='bounding-box' key={'kBox_'+index} style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        })
        : null
        }
      </div>
    </div>
  );
}

export default FaceRecognition;
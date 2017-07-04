/**
 * Created by t_mehes on 3/7/17.
 */

import React from 'react';
import './index.css';

export default (props) => {

  let overflow = false
    , value = 0;

  if(props.value > props.max) {
    overflow = true;
    value = 100;
  } else {
    value = props.value * 100 / props.max;
  }

  return (<div className="progressBar">

    <div className="bar-container">
      <svg className="bar-svg" width="100%" height="100%"
           viewBox="0 0 100 10"
           preserveAspectRatio="none"
           xmlns="http://www.w3.org/2000/svg">
        <line className={`path ${overflow ? 'highlight-overflow': ''}`} x1="0" y1="5" x2="100%" y2="5"
              strokeWidth="10"
              strokeDasharray="100"
              strokeDashoffset={0}
              style={{transform: `translateX(${value - 100}%)`}}/>
      </svg>
    </div>
    <div className="bar-text"><span>{Math.round(props.value * 100 / props.max)}</span><span>%</span></div>

  </div>)
}
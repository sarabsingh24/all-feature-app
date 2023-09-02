import React from 'react'

const colorArray = [
  '#42a5f5',
  '#ab47bc',
  '#d32f2f',
  '#f57c00',
  '#0288d1',
  '#388e3c',
  '#b71c1c',
  '#880e4f',
  '#4a148c',
  '#d50000',
  '#c51162',
  '#aa00ff',
  '#004d40',
  '#006064',
];

export const randomColorPiker = () => {

const number = Math.floor((Math.random() * colorArray.length ));

  return colorArray[number];
}



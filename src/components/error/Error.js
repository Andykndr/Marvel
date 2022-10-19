import React from 'react';
import img from './Error.gif';

export default function Error() {
  return (
    <img
      style={{ borderRadius: '30%', width: '30rem' }}
      src={img}
      alt="error"
    />
  );
}

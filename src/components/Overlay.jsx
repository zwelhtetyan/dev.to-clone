import React from 'react';
import { OverlayLayer } from '../styles/OverlayStyle';

const Overlay = ({ onClose }) => {
   return <OverlayLayer onClick={onClose} />;
};

export default Overlay;

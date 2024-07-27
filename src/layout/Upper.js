import React from 'react';
import HeaderUpper from './../pages/upper/upper-layout/Header-Upper'
import BodyUpper from '../pages/upper/upper-layout/Body-Upper';
import FooterUpper from '../pages/upper/upper-layout/Footer-Upper';

const Upper = () => {
    return (
        <div>
            <HeaderUpper></HeaderUpper>
            <BodyUpper></BodyUpper>
            <FooterUpper></FooterUpper>
        </div>
    );
};

export default Upper;
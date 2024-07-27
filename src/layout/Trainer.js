import React from 'react';
import HeaderTrainer from '../pages/trainers/trainers-layout/Header-trainer'
import BodyTrainer from '../pages/trainers/trainers-layout/Body-trainer';
import FooterTrainer from '../pages/trainers/trainers-layout/Footer-trainer'

const Trainer = () => {
    return (
        <div>
            <HeaderTrainer></HeaderTrainer>
            <BodyTrainer></BodyTrainer>
            <FooterTrainer></FooterTrainer>
        </div>
    );
};

export default Trainer;
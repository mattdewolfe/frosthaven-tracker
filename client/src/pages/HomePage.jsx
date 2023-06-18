import React, { useState } from "react";
import bonfire from '../assets/bonfire.jpg';
import bonfire3 from '../assets/bonfire3.gif'
import { Link } from "react-router-dom";
import RouteMap from "../routes";
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    return (
        <>
        <Button variant="primary">Primary</Button>{' '}
        <Button variant="secondary">Secondary</Button>{' '}
        <Button variant="success">Success</Button>{' '}
        <Button variant="warning">Warning</Button>{' '}
        <Button variant="danger">Danger</Button>{' '}
        <Button variant="info">Info</Button>{' '}
        <Button variant="light">Light</Button>{' '}
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
      </>
    );
  }


        

        

    


export default HomePage;


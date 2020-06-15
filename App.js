import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import Routes from './src/routes'

export default function App() {
  
 
  return (
    <>
    <StatusBar 
      backgroundColor="orangered"
      barStyle='dark-content'
      animated={true}
    />


    <Routes />
    



    </>
  );
}


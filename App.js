/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    SafeAreaView,
    StatusBar
} from 'react-native';
import styled from 'styled-components';
import Ratings from './app/components/Ratings'
const Poster = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 50px;
`;
const PosterImage = styled.Image`
  width: 100%;
  height: 300px;
`;
const AlignSelfCentered = styled.View`
  align-self: center;
  padding-top: 15px;
`;
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <Poster>
              <PosterImage source={require('./app/assets/poster.jpg')} resizeMode="contain" />
          </Poster>
          <AlignSelfCentered>
              <Ratings size={35} useGestureState />
          </AlignSelfCentered>
      </SafeAreaView>
    </>
  );
};

export default App;
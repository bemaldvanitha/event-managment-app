import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBDr-JwbL8RTbe9LMIXUFP3RLstXZjDUS4",
  authDomain: "event-management-1c0bb.firebaseapp.com",
  databaseURL: "https://event-management-1c0bb.firebaseio.com",
  projectId: "event-management-1c0bb",
  storageBucket: "event-management-1c0bb.appspot.com",
  messagingSenderId: "10273636800",
  appId: "1:10273636800:web:68f160654986c71d278825",
  measurementId: "G-FB1TLVZPTW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import eventReducer from './store/reducer/eventReducer';
import FinalNavigation from './navigation/EventNavigation';

const rootReducer = combineReducers({
  'events': eventReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFont = () => {
  return Font.loadAsync({
    'raleway_black': require('./assets/fonts/Raleway-Black.ttf'),
    'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
    'roboto': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    'roboto_italic': require('./assets/fonts/RobotoCondensed-Italic.ttf')
  });
};

export default function App() {
  const [setFont,isSetFont] = useState(false);
  if(!setFont){
    return (
        <AppLoading startAsync={fetchFont} onFinish={() => {isSetFont(true)}}/>
    )
  }
  return (
      <Provider store={store}>
        <FinalNavigation/>
      </Provider>
  );
}

const styles = StyleSheet.create({

});

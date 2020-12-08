import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet,Platform,ScrollView,FlatList,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../constants/Colors";
import Event from "../components/Event";
import {fetchPosts} from '../store/actions/eventAction';

const EventScreen = props => {
    const events = useSelector(state => state.events.events);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    },[dispatch]);

    if(events.length === 0){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.secondary}/>
                <Text>No Events or data is Loading</Text>
            </View>
        )
    }

    return(
        <FlatList data={events} keyExtractor={(item) => item.id} renderItem={(itemData) => {
            return(
                <Event data={itemData.item} onSelect={() => {props.navigation.navigate({routeName: 'EventDetail',params: {'product':itemData.item,'editable': false}})}}/>
            )
        }}/>
    )
};

EventScreen.navigationOptions = navData => {
  return{
      headerTitle: 'Current Events',
      headerLeft: () => {
          return(
              <Ionicons name={Platform.OS === 'android' ? 'md-menu': 'ios-menu'} size={24} color={Platform.OS === 'android' ? 'white': Colors.primary} onPress={()=> {
                  navData.navigation.toggleDrawer();
              }}/>
          )
      }
  }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EventScreen;
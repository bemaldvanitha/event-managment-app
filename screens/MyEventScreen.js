import React from 'react';
import {View, Text, StyleSheet, Platform, FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from 'react-redux';

import Colors from "../constants/Colors";
import Event from "../components/Event";

const MyEventScreen = props => {
    const myEvent = useSelector(state => state.events.myEvents);
    //console.log(myEvent);
    return(
        <FlatList data={myEvent} keyExtractor={(item) => item.id} renderItem={(itemData) => {
            return(
                <Event data={itemData.item} onSelect={() => {props.navigation.navigate({routeName: 'EventDetail',params: {'product':itemData.item,'editable':true}})}}/>
            )
        }}/>
    )
};

MyEventScreen.navigationOptions = navData => {
    return{
        headerTitle: 'My Events',
        headerLeft: () => {
            return(
                <Ionicons name={Platform.OS === 'android' ? 'md-menu': 'ios-menu'} size={24} color={Platform.OS === 'android' ? 'white': Colors.primary} onPress={()=> {
                    navData.navigation.toggleDrawer();
                }}/>
            )
        },
        headerRight: () => {
            return(
                <Ionicons name={Platform.OS==='android'? 'md-add':'ios-add'} size={24} color={Platform.OS === 'android'? 'white': Colors.primary} onPress={() => {
                    navData.navigation.navigate({routeName: 'AddEvent',params: {'id': null}});
                }}/>
            )
        }
    }
};

const styles = StyleSheet.create({

});

export default MyEventScreen;
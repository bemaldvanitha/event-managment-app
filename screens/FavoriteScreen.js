import React from 'react';
import {View, Text, StyleSheet, Platform,FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from 'react-redux';

import Colors from "../constants/Colors";
import Event from "../components/Event";

const FavoriteScreen = props => {
    const favEvents = useSelector(state => state.events.favEvents);
    //console.log(favEvents);
    return(
        <FlatList data={favEvents} keyExtractor={(item) => item.id} renderItem={(itemData) => {
            return(
                <Event data={itemData.item} onSelect={() => {props.navigation.navigate({routeName: 'EventDetail',params: {'product':itemData.item}})}}/>
            )
        }}/>
    )
};

FavoriteScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Favorite Events',
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

});

export default FavoriteScreen;
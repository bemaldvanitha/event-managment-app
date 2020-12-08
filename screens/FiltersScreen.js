import React,{useState} from 'react';
import {View, Text, StyleSheet, Platform,Button,Switch} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";


const FiltersScreen = props => {
    return(
        <Text>Hello</Text>
    )
};

FiltersScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Filters',
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

export default FiltersScreen;
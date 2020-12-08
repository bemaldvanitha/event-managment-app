import React from 'react';
import {Platform} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {SimpleLineIcons,MaterialIcons,AntDesign} from '@expo/vector-icons';

import EventScreen from "../screens/EventScreen";
import EventDetailScreen from "../screens/EventDetailscreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import FiltersScreen from "../screens/FiltersScreen";
import MyEventScreen from "../screens/MyEventScreen";
import AddEventScreen from "../screens/AddEventScreen";
import AuthScreen from "../screens/AuthScreen";
import DrawerHeader from "../components/NavigationHeader";
import Colors from "../constants/Colors";

const EventNavigation = createStackNavigator({
   EventList: {
       screen: EventScreen
   },
    EventDetail: {
       screen: EventDetailScreen
   },
    AddEvent: {
        screen: AddEventScreen
    }
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'raleway_black',
            textAlign: 'center'
        }
    },
});

const FavoriteNavigation = createStackNavigator({
   Favorite: {
       screen: FavoriteScreen
   }
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'raleway_black',
            textAlign: 'center'
        }
    },
});

const MyEventNavigation = createStackNavigator({
   MyEventList: {
       screen: MyEventScreen
   },
    AddEvent: {
       screen: AddEventScreen
    }
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'raleway_black',
            textAlign: 'center'
        }
    },
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return(
                <MaterialIcons name="event" size={24} color={Colors.primary} />
            )
        }
    }
});

const FiltersNavigation = createStackNavigator({
   Filter: {
       screen: FiltersScreen
   }
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'raleway_black',
            textAlign: 'center'
        }
    },
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return(
                <AntDesign name="filter" size={24} color={Colors.primary} />
            )
        }
    }
});

const AllEventNavigation = createBottomTabNavigator({
    EventsNavigation: {
        screen: EventNavigation,
        navigationOptions: {
            tabBarIcon: tabBarConfig =>{
                return(
                    <AntDesign name="carryout" size={24} color={tabBarConfig.tintColor} />
                )
            }
        }
    },
   FavoritesNavigation: {
        screen: FavoriteNavigation,
       navigationOptions: {
            tabBarIcon: tabBarConfig => {
                return(
                    <MaterialIcons name="favorite-border" size={24} color={tabBarConfig.tintColor} />
                )
            }
       }
   },
},{
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return(
                <MaterialIcons name="event-note" size={24} color={Colors.primary} />
            )
        }
    },
    tabBarOptions: {
        activeTintColor: Colors.primary
    }
});

const FinalNavigation = createDrawerNavigator({
   AllEvent: AllEventNavigation,
   MyEvent: MyEventNavigation,
},{
    contentOptions: {
        activeTintColor: Colors.primary,
        activeBackgroundColor: Colors.secondary,
        labelStyle: {
            fontSize: 26,
            fontFamily: 'raleway'
        }
    },
    contentComponent: (props) => <DrawerHeader {...props}/>
});

const AuthNavigator = createStackNavigator({
   Auth: AuthScreen
},{
    defaultNavigationOptions: {
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTitleStyle: {
            fontFamily: 'raleway_black',
            textAlign: 'center'
        }
    }
});

const MainNavigator = createSwitchNavigator({
   AuthNavigator,
   FinalNavigation
});

export default  createAppContainer(MainNavigator);
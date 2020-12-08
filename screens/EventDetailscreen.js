import React,{useCallback,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,Image,Dimensions,Platform,Button,Alert} from 'react-native';
import moment from "moment";
import {Ionicons} from '@expo/vector-icons';
import {useDispatch,useSelector} from 'react-redux';

import {addFavorite,deleteEvent} from '../store/actions/eventAction';
import Colors from "../constants/Colors";

const EventDetailScreen = props => {
    const dispatch = useDispatch();
    const item = props.navigation.getParam('product');
    const isFav = useSelector(state => state.events.favEvents.some(eve => eve.id === item.id));
    const editable = props.navigation.getParam('editable');

    const toggleFavorite = useCallback(() => {
        dispatch(addFavorite(item.id));
    },[dispatch,item.id]);


    useEffect(()=>{
        props.navigation.setParams({toggleFav: toggleFavorite});
        props.navigation.setParams({isFav: isFav})
    },[toggleFavorite,isFav]);

    const deleteHandler = () => {
        Alert.alert('are you sure','sure about delete',[
            {text:'cancel'},
            {text: 'ok',onPress: () => {dispatch(deleteEvent(item.id)); props.navigation.pop();}}
        ]);
    };

    return(
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image source={{uri: item.imageUrl}} style={styles.image}/>
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.sub}>
                <View style={styles.item}>
                    <Text style={{fontSize: 18,fontFamily: 'roboto_italic'}}>place :- {item.place}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={{fontSize: 18,fontFamily: 'roboto_italic'}}>date :- {moment(item.date).format('MMM Do YY')}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={{fontSize: 18,fontFamily: 'roboto_italic'}}>price :- Rs. {item.price}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={{fontSize: 18,fontFamily: 'roboto_italic'}}>email :- {item.email}</Text>
                </View>
            </View>
            {editable && <View style={styles.buttonCard}>
                <Button title='edit' color={Colors.primary} onPress={() => {
                    props.navigation.navigate({routeName:'AddEvent',params: {'id': item.id}});
                }}/>
                <Button title='delete' color={Colors.secondary} onPress={deleteHandler}/>
            </View>}
        </ScrollView>
    )
};

EventDetailScreen.navigationOptions = navData => {
    const isFav = navData.navigation.getParam('isFav');
    const toggleFav = navData.navigation.getParam('toggleFav');
  return{
    headerTitle: navData.navigation.getParam('product').name,
    headerRight: () => (
        <Ionicons name={isFav? 'ios-star': 'ios-star-outline'} color={Platform.OS === 'android' ? 'white': Colors.primary} size={24}
        onPress={toggleFav}/>
    )
  }
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.4,
    },
    main: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    title: {
        fontFamily: 'raleway',
        fontSize: 30
    },
    description: {
        fontFamily: 'roboto_italic'
    },
    sub: {
        alignItems: 'center',
        paddingHorizontal: 15
    },
    item: {
        marginVertical: 10,
        borderWidth: 1,
        padding: 15,
        borderStyle: 'dashed',
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: '#e6ffee'
    },
    buttonCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    }
});

export default EventDetailScreen;
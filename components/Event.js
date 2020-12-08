import React from 'react';
import {View,Text,StyleSheet,Image,Dimensions,TouchableNativeFeedback} from 'react-native';
import moment from 'moment';
import {MaterialIcons,AntDesign,FontAwesome} from "@expo/vector-icons";

const Event = props => {
    const {name,imageUrl,place,date,price} = props.data;
      return(
          <TouchableNativeFeedback onPress={props.onSelect}>
              <View style={styles.card}>
                  <Image style={styles.image} source={{uri: imageUrl}}/>
                  <View style={{paddingTop: 10,paddingBottom: 20}}>
                      <Text style={styles.title}>{name}</Text>
                  </View>
                  <View style={styles.eventRow}>
                      <View style={styles.block}>
                        <Text style={{fontFamily: 'roboto'}}>{place}</Text>
                          <MaterialIcons name="place" size={24} color="black" />
                      </View>
                      <View style={styles.block}>
                        <Text style={{fontFamily: 'roboto'}}>{moment(date).format('MMM Do YY')}</Text>
                          <AntDesign name="calendar" size={24} color="black" />
                      </View>
                      <View style={styles.block}>
                        <Text style={{fontFamily: 'roboto'}}>Rs. {price}</Text>
                          <FontAwesome name="dollar" size={24} color="black" />
                      </View>
                  </View>
              </View>
          </TouchableNativeFeedback>
      )
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height:  5
        },
        elevation: 6,
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: '#FFFFE0',
        height: Dimensions.get('screen').height * 0.45,
        borderRadius: 20
    },
    image: {
        width: '100%',
        height: '50%',
        overflow: 'hidden'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'raleway_black',
        fontSize: 30
    },
    eventRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    block: {
        flexDirection: 'column'
    }
});

export default Event;
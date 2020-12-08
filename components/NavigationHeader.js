import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';


const DrawerHeader = props => {
    return(
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.imageWrap}>
                    <Image source={require('../assets/images/fluid.jpg')} style={styles.realImage}/>
                </View>
                <View style={styles.container}>
                    <DrawerNavigatorItems {...props}/>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    imageWrap: {
        width: undefined,
    },
    realImage: {
        width: Dimensions.get('screen').width * 0.715,
        height: Dimensions.get('screen').height * 0.2,
        justifyContent: 'flex-end'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
        marginVertical: 8
    },
    headerTitle: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    container: {
        flex: 1
    }
});

export default DrawerHeader;
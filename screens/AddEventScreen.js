import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,TextInput,Button,TouchableOpacity,ScrollView,Alert,Platform} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useDispatch,useSelector} from 'react-redux';
import moment from "moment";
import {Ionicons} from '@expo/vector-icons';

import Colors from "../constants/Colors";
import {addEvent,updateEvent} from '../store/actions/eventAction';

const AddEventScreen = props => {
    const id = props.navigation.getParam('id');
    const item = useSelector(state => state.events.myEvents.find(eve => eve.id === id));
    //console.log(item);
    const dispatch = useDispatch();
    const [name,setName] = useState(item ? item.name : '');
    const [description,setDescription] = useState(item ? item.description : '');
    const [imageUrl,setImageUrl] = useState(item ? item.imageUrl : '');
    const [place,setPlace] = useState(item ? item.place : '');
    const [price,setPrice] = useState(item ? item.price.toString() : '');
    const [email,setEmail] = useState(item ? item.email : '');
    const [date,setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [isNameValid,setIsNameValid] = useState(item ? true : false);
    const [isDesValid,setIsDesValid] = useState(item ? true : false);
    const [isUrlValid,setIsUrlValid] = useState(item ? true : false);
    const [isPlaceValid,setPlaceValid] = useState(item ? true : false);
    const [isPriceValid,setIsPriceValid] = useState(item ? true : false);
    const [isEmailValid,setIsEmailValid] = useState(item ? true : false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setDate(date);
    };

    const handleName = (val) => {
        if(val.trim().length > 5){
            setIsNameValid(true);
        }else {
            setIsNameValid(false);
        }
        setName(val);
    };

    const handleDes = (val) => {
        if(val.trim().length > 10){
            setIsDesValid(true);
        }else{
            setIsDesValid(false);
        }
        setDescription(val);
    };

    const handlePlace = (val) => {
        if(val.trim().length > 5){
            setPlaceValid(true);
        }else{
            setPlaceValid(false);
        }
        setPlace(val);
    };

    const handleEmail = (val) => {
        let re = /\S+@\S+\.\S+/;
        if(val.trim().length > 10 && re.test(val)){
            setIsEmailValid(true);
        }else{
            setIsEmailValid(false);
        }
        setEmail(val);
    };

    const handleUrl = (val) => {
        if(val.trim().length > 8){
            setIsUrlValid(true);
        }else{
            setIsUrlValid(false);
        }
        setImageUrl(val);
    };

    const handlePrice = (val) => {
        if(val.trim().length > 0 && !isNaN(val)){
            setIsPriceValid(true);
        }else{
            setIsPriceValid(false);
        }
        setPrice(val);
    };

    const submitHandler = useCallback( () => {
        if(isEmailValid && isPriceValid && isPlaceValid && isUrlValid && isDesValid && isNameValid) {
            if(id === null) {
                Alert.alert('sure to add','sure about add event',[
                    {text: 'ok',onPress: () => {
                            dispatch(addEvent(name, description, imageUrl, place, +price, email, date));
                            props.navigation.pop();
                        }},
                    {text: 'cancel'}
                ]);
            }else {
                Alert.alert('sure to update','sure about update event',[
                    {text: 'ok',onPress: () => {
                            dispatch(updateEvent(id,name,description,imageUrl,place,+price,email,date));
                            props.navigation.pop();
                        }},
                    {text: 'cancel'}
                ]);
            }
        }else{
            Alert.alert('enter all field','enter all to add',[
                {text: 'ok'}
            ])
        }
    },[name,description,imageUrl,place,price,email,date,dispatch]);

    useEffect(() => {
        props.navigation.setParams({'submit': submitHandler})
    },[submitHandler]);

    return(
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.inputController}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput keyboardType='default' style={styles.input} value={name} onChangeText={(text) => {handleName(text)}}/>
                    {!isNameValid && <Text style={styles.validate}>Enter Valid Name</Text>}
                </View>
                <View style={styles.inputController}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput keyboardType='default' style={styles.input} value={description} onChangeText={(text) => {handleDes(text)}} multiline={true}/>
                    {!isDesValid && <Text style={styles.validate}>Enter Valid Description</Text>}
                </View>
                <View style={styles.inputController}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput keyboardType='default' style={styles.input} value={imageUrl} onChangeText={(text) => {handleUrl(text)}} multiline={true}/>
                    {!isUrlValid && <Text style={styles.validate}>Enter Valid Url</Text>}
                </View>
                <View style={styles.inputController}>
                    <Text style={styles.label}>Place</Text>
                    <TextInput keyboardType='default' style={styles.input} value={place} onChangeText={(text) => handlePlace(text)}/>
                    {!isPlaceValid && <Text style={styles.validate}>Enter Valid Place</Text>}
                </View>

                <TouchableOpacity style={styles.inputController} onPress={showDatePicker}>
                    <View style={styles.picker}>
                        <Text style={styles.label} >Show picker</Text>
                    </View>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    isDarkModeEnabled={true}
                />
                {date && <Text style={styles.inputController}>{moment(date).format('MMM Do YY')}</Text>}

                <View style={styles.inputController}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput keyboardType='numeric' style={styles.input} value={price} onChangeText={(text) => {handlePrice(text)}}/>
                    {!isPriceValid && <Text style={styles.validate}>Enter Valid Price</Text>}
                </View>
                <View style={styles.inputController}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput keyboardType='default' style={styles.input} value={email} onChangeText={(text) => {handleEmail(text)}}/>
                    {!isEmailValid && <Text style={styles.validate}>Enter Valid Email</Text>}
                </View>
                <View style={styles.buttonController}>
                    <Button style={styles.button} title={id ? 'edit event' : 'add event'} color={Colors.secondary} onPress={submitHandler}/>
                    <Button style={styles.button} title='cancel' color='red'/>
                </View>
            </View>
        </ScrollView>
    )
};

AddEventScreen.navigationOptions = navData => {
    const submit = navData.navigation.getParam('submit');
  return{
      headerTitle: 'Add Event',
      headerRight: () => (
          <Ionicons name={Platform.OS === 'android'? 'md-save': 'ios-save'} size={23} color={Platform.OS === 'android' ?'white': Colors.primary}
                    onPress={submit}/>
      )
  }
};

const styles = StyleSheet.create({
    screen: {
        textAlign: 'center',
        flex: 1,
        backgroundColor: '#FFFFE0'
    },
    inputController: {
        marginHorizontal: 25,
        paddingHorizontal: 25,
        marginTop: 15
    },
    label: {
        fontSize: 18,
        fontFamily: 'roboto',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    buttonController: {
        margin: 25,
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    picker: {
      borderWidth: 1,
      borderStyle: 'dotted',
        padding: 5,
        width: 130,
        backgroundColor: Colors.secondary
    },
    button: {
        width: '100%',
    },
    validate: {
        color: 'red'
    }
});

export default AddEventScreen;
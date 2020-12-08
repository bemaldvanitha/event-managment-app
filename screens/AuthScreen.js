import React,{useState} from 'react';
import {Text,View,TextInput,StyleSheet,Button,ScrollView,Dimensions,Alert,ActivityIndicator} from 'react-native';
import Colors from "../constants/Colors";
import * as firebase from "firebase";

const AuthScreen = props => {
    const [isSignIn,SetIsSignIn] = useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isEmailValid,setIsEmailValid] = useState(false);
    const [isPasswordValid,setIsPasswordValid] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const handleEmail = (text) => {
        let re = /\S+@\S+\.\S+/;
        if(text.trim().length > 8 && re.test(text)){
            setIsEmailValid(true);
        }else{
            setIsEmailValid(false);
        }
        setEmail(text);
    };

    const handlePassword = (text) => {
        if(text.trim().length > 6){
            setIsPasswordValid(true);
        }else{
            setIsPasswordValid(false);
        }
        setPassword(text);
    };

    const toggleHandler = () => {
      SetIsSignIn(prevState => {
          return !prevState;
      })
    };

    const  handleSubmit = () => {
        if(isEmailValid && isPasswordValid) {
            setIsLoading(true);
            if (isSignIn) {
                try{
                    firebase.auth().signInWithEmailAndPassword(email,password).then(res => {
                        setIsLoading(false);
                        props.navigation.navigate({routeName: 'FinalNavigation'});
                    }).catch(e => {
                        Alert.alert('auth error', e.toString(), [
                            {text: 'ok'}
                        ]);
                        setIsLoading(false);
                    });
                }catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
                        setIsLoading(false);
                        props.navigation.navigate({routeName: 'FinalNavigation'});
                    }).catch(e => {
                        Alert.alert('auth error', e.toString(), [
                            {text: 'ok'}
                        ]);
                        setIsLoading(false);
                    })
                } catch (err) {
                    console.log(err);
                }
            }
        }else{
            Alert.alert('enter all fields','error',[
                {text: 'ok'}
            ])
        }
    };

    return(
        <ScrollView style={{backgroundColor: '#f9fad2'}}>
            <View style={styles.screen}>
                <View style={styles.form}>
                    <View style={styles.formController}>
                        {isLoading && <ActivityIndicator size='large' color={Colors.secondary}/>}
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} value={email} onChangeText={(text) => handleEmail(text)} keyboardType='email-address'/>
                        {!isEmailValid ? <Text style={styles.warn}>enter valid email</Text>: null}
                    </View>
                    <View style={styles.formController}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input} value={password} onChangeText={(text) => handlePassword(text)} secureTextEntry={true}/>
                        {!isPasswordValid ? <Text style={styles.warn}>enter valid password</Text> : null}
                    </View>
                    <View style={styles.buttonController}>
                        <Button title={isSignIn ? 'Sign In' : 'Sign Up'} color={Colors.secondary} onPress={handleSubmit}/>
                    </View>
                    <View style={styles.buttonController}>
                        <Button title={isSignIn ? 'Change to Sign Up' : 'Change to Sign In'} color={Colors.secondary} onPress={toggleHandler}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authentication'
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginVertical: 100,
    },
    form: {
        width: Dimensions.get('screen').width * 0.75,
        height: 550,
        padding: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        elevation: 6,
        backgroundColor: '#cafad7',
        shadowOpacity: 0.26,
        shadowRadius: 25,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 1
        }
    },
    formController: {
        width: '100%',
        marginVertical: 20
    },
    label: {
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'raleway',
        fontSize: 16
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    buttonController: {
        margin: 10
    },
    warn: {
        color: 'red'
    }
});

export default AuthScreen;
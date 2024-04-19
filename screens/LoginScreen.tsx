import React from "react";
import {StyleSheet, View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Dimensions, ScrollView} from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import i18next from "i18next"
import Input from "../components/Input"
import { FIREBASE_APP, FIREBASE_AUTH } from "../FirebaseConfig";
import { ScaledSheet, scale } from "react-native-size-matters";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen: React.FC = () => {

  const [email, onChangeEmail] = useState('');
  const [pw, onChangePw] = useState('');
  const [pwError, setPwError] = useState('');
  const [mailError, setMailError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, pw)
        .catch(error => {
            switch(error.code) {
                case 'auth/invalid-credential':
                  setMailError(i18next.t('login_failed'));
                  setPwError(i18next.t('login_failed'));
                  break;
            }
            console.log(error)
        })
        .finally()
        setLoading(false);
        console.log(response)
     } catch (error) {
        console.log(error)
     } 
  }

  const validate = () => {
    let valid = true;

    if (email.trim().length == 0) {
        valid = false;
        setMailError(i18next.t('sign_up_mail_error_empty'))
    } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        valid = false;
        setMailError(i18next.t('sign_up_mail_error_invalid'))
    }

    if (pw.trim().length == 0) {
        valid = false;
        setPwError(i18next.t('login_pw_empty'));
    }

    console.log(valid) 

    if (valid) {
        signIn();
    }

  };

    return(
      <View style={{backgroundColor: 'white', alignItems: 'center', flex: 1}}>
        <View style={styles.container}>

          <View style={styles.container_image}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>

          <View style={styles.container_title}>
            <Text style={styles.title}>{i18next.t('login_title').toUpperCase()}</Text>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container_form}>
            <Input email={true} handleInputChange={() => {}} error={mailError} placeholder={i18next.t('email')} onChange={onChangeEmail} setError={setPwError} value={email} password={false} />
            <Input email={false} handleInputChange={() => {}} error={pwError} placeholder={i18next.t('password')} onChange={onChangePw} setError={setPwError} value={pw} password={true} />
            <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', alignSelf: 'center'}}>
              <Text>{i18next.t('no_account')}</Text>
              <Text style={{fontWeight: 'bold', marginLeft: 10}} onPress={() => {navigation.navigate('SignUpProfil')}}>{i18next.t('sign_up')}</Text>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.container_button}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button_login} onPress={() => {validate()}}>
              <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}} >{i18next.t('login_action').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>    

        </View>
      </View>
    );
};

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      height: '100%',
      marginVertical: '30@s',
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container_image: {
      justifyContent: 'flex-start',
      flex: 1, 
      width: '100%', 
      height: scale(180)
    },
    container_title: {
      flex: 0.6, 
      width: '100%'
    },
    container_form: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%'
    },
    container_button: {
      flexGrow: 0.2,
      justifyContent: 'flex-end'
    },
    image: {
      width: '163@s',
      height: '160@s',
      alignSelf: 'center'
    },
    title: {
      color: 'black',
      fontSize: '40@s',
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    button_login: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      height: 48,
      width: 150,
      marginTop: 10,
      backgroundColor: 'black'
    },
  });

export default LoginScreen
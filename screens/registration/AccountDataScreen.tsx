import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, Image, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React from 'react'
import i18next from 'i18next'
import Input from '../../components/Input'
import { useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ScaledSheet, scale } from 'react-native-size-matters'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

type AccountDataScreenParams = {
    name : string;
    dob: string;
  };


const AccountDataScreen: React.FC = () => {

  const route = useRoute<RouteProp<{ params: AccountDataScreenParams }, 'params'>>();  
  const { name, dob } = route.params;
  const [email, onChangeEmail] = useState('');
  const [pw, onChangePw] = useState('');
  const [pwRepeat, onChangePwRepeat] = useState('');
  const [mailError, setMailError] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwRepeatError, setPwRepeatError] = useState('');

  const auth = FIREBASE_AUTH;
  const signUp = async () => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, pw)
        .catch(error => {
            switch(error.code) {
                case 'auth/email-already-in-use':
                  setMailError(i18next.t('sign_up_mail_error_invalid'))
                  break;
            }
            console.log(error)
        })
        .finally()
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

    if (pw.trim().length <= 5) {
        valid = false;
        setPwError(i18next.t('sign_up_pw_error_characters'));
    }

    if (pw !== pwRepeat) {
        valid = false;
        setPwRepeatError(i18next.t('sign_up_pw_repeat_error'));
    }

    console.log(valid) 

    if (valid) {
        signUp();
        navigation.navigate('Login');
    }

  };

  const navigation = useNavigation();

  return (
        <View style={styles.container}>
            <View style={styles.container_title}>
                <Text style={styles.title}>{i18next.t('sign_up_title').toUpperCase()}</Text>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container_form}>
                <Input email={true} handleInputChange={() => {}} placeholder={i18next.t('email')} error={mailError} onChange={onChangeEmail} setError={setMailError} value={email} password={false} />
                <Input email={false} handleInputChange={() => {}} placeholder={i18next.t('password')} error={pwError} onChange={onChangePw} setError={setPwError} value={pw} password={true} />
                <Input email={false} handleInputChange={() => {}} placeholder={i18next.t('password_repeat')} error={pwRepeatError} onChange={onChangePwRepeat} setError={setPwRepeatError} value={pwRepeat} password={true} />                    

                <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', alignSelf: 'center'}}>
                    <Text>{i18next.t('already_account')}</Text>
                    <Text style={{fontWeight: 'bold', marginLeft: 10}} onPress={() => {navigation.navigate('SignUp')}}>{i18next.t('login_title')}</Text>
                </View>
            </KeyboardAvoidingView>
                
            <View style={styles.container_button}>
                <TouchableOpacity activeOpacity={0.8} style={styles.button_signUp} onPress={validate}>
                    <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}} >{i18next.t('sign_up').toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default AccountDataScreen

const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: '35@s',
    },
    container_title: {
        flexGrow: 0.4,
        justifyContent: 'flex-start',
        paddingTop: '25@s'
    },
    container_form: {
        flexGrow: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '20@s'
    },
    container_button: {
        flexGrow: 0.2,
        justifyContent: 'flex-end',
    },
    title: {
        color: 'black',
        fontSize: '40@s',
        fontWeight: 'bold',
    },
    topImage: {
        width: 183,
        height: 180,
        alignSelf: 'center'
    },
    button_signUp: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 48,
        width: 180,
        backgroundColor: 'black'
    },
});
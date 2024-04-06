import React from "react";
import {StyleSheet, View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Dimensions, ScrollView} from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import i18next from "i18next"
import Input from "../components/Input"
import { FIREBASE_APP, FIREBASE_AUTH } from "../FirebaseConfig";

const LoginScreen: React.FC = () => {

  const [email, onChangeEmail] = useState('');
  const [pw, onChangePw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwRepeatError, setPwRepeatError] = useState('');

  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

    return(
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{backgroundColor: 'white', alignItems: 'center'}}>
        <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.container_inner}>
          <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          <Text style={styles.title}>{i18next.t('login').toUpperCase()}</Text>
          <View style={styles.container_form}>
            <Input email={true} handleInputChange={() => {}} error='' placeholder={i18next.t('email')} onChange={onChangeEmail} setError={setPwError} value={email} password={false} />
            <Input email={false} handleInputChange={() => {}} error='' placeholder={i18next.t('password')} onChange={onChangePw} setError={setPwRepeatError} value={pw} password={true} />
            <TouchableOpacity activeOpacity={0.8} style={styles.button_login} onPress={() => {navigation.navigate('TabNavigator')}}>
              <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}} >{i18next.t('login').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', alignSelf: 'center'}}>
            <Text>{i18next.t('no_account')}</Text>
            <Text style={{fontWeight: 'bold', marginLeft: 10}} onPress={() => {navigation.navigate('SignUp')}}>{i18next.t('sign_up')}</Text>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'white',
      paddingVertical: 40,
      marginTop: 30,
      width: Dimensions.get('window').width
    },
    container_inner: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_form: {
      marginTop: 30,
      marginBottom: 20
    },
    image: {
      width: 183,
      height: 180,
      alignSelf: 'center'
    },
    title: {
      marginTop: 20,
      marginBottom: 35,
      color: 'black',
      fontSize: 40,
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
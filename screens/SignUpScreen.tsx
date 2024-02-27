import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, Platform, Modal, ScrollView, Dimensions} from 'react-native'
import React from 'react'
import i18next from '../services/i18next'
import { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import * as Localization from "expo-localization";

const SignUpScreen: React.FC = () => {

  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [pw, onChangePw] = useState('');
  const [pwRepeat, onChangePwRepeat] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [initial, setInitial] = useState(true);
  const [nameError, setNameError] = useState('');
  const [mailError, setMailError] = useState('');
  const [dobError, setDobError] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwRepeatError, setPwRepeatError] = useState('');


  const onChangeDate = (event: any, selectedDate: any) => {
    {Platform.OS === 'android' && (
        setShow(false),
        setInitial(false)
    )}
    setDate(selectedDate)
  };

  const showDatepicker = () => {
    setDobError('');
    setShow(true);
  };

  const hideDatepicker = () => {
    setShow(false);
  };

  const confirmDate = () => {
    setInitial(false)
    setShow(false);
  };

  const validate = () => {
    let valid = true;

    if (name.trim().length == 0) {
        valid = false;
        setNameError(i18next.t('sign_up_name_error'))
    }

    if (initial) {
        valid = false;
        setDobError(i18next.t('sign_up_dob_error_empty'))
    }

    if (email.trim().length == 0) {
        valid = false;
        setMailError(i18next.t('sign_up_mail_error_empty'))
    } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        valid = false;
        setMailError(i18next.t('sign_up_mail_error_invalid'))
    }

    if (pw.trim().length == 0) {
        valid = false;
        setPwError(i18next.t('sign_up_pw_error_empty'))
    }

    if (pw !== pwRepeat) {
        valid = false;
        setPwRepeatError(i18next.t('sign_up_pw_repeat_error'))
    }

    if (valid) {
        navigation.navigate('Login')
    }

  }

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{backgroundColor: 'white', alignItems: 'center'}}>
        <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <View style={styles.container_inner}>
                <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
                <Text style={styles.title}>{i18next.t('sign_up_title').toUpperCase()}</Text>
                <Input placeholder={i18next.t('name')} error={nameError} onChange={onChangeName} setError={setNameError} value={name} password={false} />
                <View style={styles.container_input}>
                    <TouchableOpacity activeOpacity={1} onPress={showDatepicker} style={[styles.datePicker, {borderColor: dobError.length !== 0 ? 'red' : 'black', borderWidth: dobError.length !== 0 ? 2 : 1}]}>
                    {initial ? (
                        <Text style={{ color: 'gray' }}>{i18next.t('dob')}</Text>
                        ) : (
                        <Text style={{ color: 'black' }}>{date.toLocaleDateString()}</Text>
                        )}
                    </TouchableOpacity>
                    <Text style={{marginTop: 4, color: 'red', fontSize: 11}}>{dobError}</Text>
                    {show && (
                        Platform.OS === 'android' ? (
                            <View style={{alignSelf: 'center'}}>
                                <DateTimePicker
                                display='spinner'
                                value={date}
                                onChange={onChangeDate}
                                maximumDate={new Date()}
                                />
                            </View>
                            ) : (
                            <Modal animationType='fade' transparent={true}>
                                <View style={styles.overlay}>
                                    <View style={styles.overlayContent}>
                                        <View style={{alignItems: 'flex-end', marginBottom: 10}}>
                                            <TouchableOpacity style={{width: 30, height: 30}} activeOpacity={1} onPress={hideDatepicker}>
                                                <Image source={require('../assets/icons/close.png')} resizeMode='contain' style={{height: 30, width: 30, tintColor: '#374957'}}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{alignSelf: 'center'}}>
                                            <DateTimePicker
                                                display='spinner'
                                                value={date}
                                                onChange={onChangeDate}
                                                maximumDate={new Date()}
                                                locale={Localization.getLocales()[0].languageCode!}
                                            />
                                        </View>
                                        <TouchableOpacity activeOpacity={0.8} style={styles.button_ok} onPress={confirmDate}>
                                            <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}} >{i18next.t('ok').toUpperCase()}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        )
                    )}
                </View>
                <Input placeholder={i18next.t('email')} error={mailError} onChange={onChangeEmail} setError={setMailError} value={email} password={false} />
                <Input placeholder={i18next.t('password')} error={pwError} onChange={onChangePw} setError={setPwError} value={pw} password={true} />
                <Input placeholder={i18next.t('password_repeat')} error={pwRepeatError} onChange={onChangePwRepeat} setError={setPwRepeatError} value={pwRepeat} password={true} />
                <TouchableOpacity activeOpacity={0.8} style={styles.button_signUp} onPress={validate}>
                    <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}} >{i18next.t('sign_up').toUpperCase()}</Text>
                </TouchableOpacity>
                <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
                    <Text>{i18next.t('already_account')}</Text>
                    <Text style={{fontWeight: 'bold', marginLeft: 10}} onPress={() => {navigation.navigate('Login')}}>{i18next.t('login')}</Text>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingVertical: 40,
        width: Dimensions.get('window').width
    },
    container_inner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_input: {
        width: 300,
        marginBottom: 12,
        alignItems: 'flex-start',
        alignSelf: 'center',
        flexDirection: 'column'
    },
    title: {
        marginTop: 20,
        marginBottom: 35,
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    image: {
        width: 183,
        height: 180,
        alignSelf: 'center'
    },
    datePicker: {
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 50,
        height: 48,
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        width: '90%',
        justifyContent: 'center'
    },
    button_ok: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
        height: 48,
        width: 120,
        marginTop: 10 
    },
    button_signUp: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 48,
        width: 180,
        marginTop: 10,
        backgroundColor: 'black'
    },
});
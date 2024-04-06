import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import i18next from 'i18next'
import Input from '../../components/Input'
import { useState } from 'react'
import * as Localization from "expo-localization"
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'


const ProfilDataScreen: React.FC = () => {

  const [name, onChangeName] = useState('');
  const [nameError, setNameError] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [initial, setInitial] = useState(true);
  const [dobError, setDobError] = useState('');
  const [disabled, setDisabled] = useState(true);  


  const onChangeDate = (event: any, selectedDate: any) => {
    {Platform.OS === 'android' && (
        setShow(false),
        setInitial(false)
    )}
    setDate(selectedDate)
    handleDobChange
  };


  const checkInputs = () => {
    if (name.trim().length != 0 && date) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleNameChange = () => {
    console.log(name)
    checkInputs();
  };

  const handleDobChange = (event: any) => {
    checkInputs();
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

    console.log(valid) 

    if (valid) {
        navigation.navigate('TabNavigator')
    }

  };

  const navigation = useNavigation();

  return (
        <View style={styles.container}>
            <View style={styles.container_title}>
                <Text style={styles.title}>{i18next.t('sign_up_title').toUpperCase()}</Text>
            </View>

            <View style={styles.container_form}>
            <View style={{width: 110, marginBottom: 40}}>
                        <Image source={require('../../assets/images/user_coloured.png')} resizeMode='contain' style={styles.profilPicture}/>
                    </View>
                    <Input email={false} handleInputChange={handleNameChange} placeholder={i18next.t('name')} error={nameError} onChange={onChangeName} setError={setNameError} value={name} password={false} />
                    <View style={styles.container_input}>
                        <TouchableOpacity 
                            activeOpacity={1} 
                            onPress={showDatepicker} 
                            style={[styles.datePicker, {borderColor: dobError.length !== 0 ? 'red' : 'black', borderWidth: dobError.length !== 0 ? 2 : 1}]}>
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
                                                    <Image source={require('../../assets/icons/close.png')} resizeMode='contain' style={{height: 30, width: 30, tintColor: '#374957'}}/>
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
            </View>
                
            <View style={styles.container_button}>
                <TouchableOpacity style={[styles.button_next, {backgroundColor: disabled ? 'gainsboro' : 'black'}]} disabled={disabled} activeOpacity={0.8} onPress={validate}>
                    <Text style={{color: 'white', marginEnd: 8}}>{i18next.t('next').toUpperCase()}</Text>
                    <Image source={require('../../assets/icons/angle_small_right.png')} resizeMode='contain' style={{height: 25, width: 25, tintColor: 'white'}}/>
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default ProfilDataScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 40,
    },
    container_title: {
        flex: 0.7,
        marginTop: 20,
        marginBottom: 35,
    },
    container_form: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_input: {
        width: 300,
        marginBottom: 12,
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    container_button: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignSelf: 'flex-end',
        width: 155,
        borderColor: 'black',
        borderWidth: 1
    },
    title: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    topImage: {
        width: 183,
        height: 180,
        alignSelf: 'center'
    },
    profilPicture: {
        height: 130,
        width: 130,
        borderRadius: 80,
        borderColor: 'black',
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
    button_next: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 48,
        alignSelf: 'flex-end',
        marginEnd: 40
    },
});
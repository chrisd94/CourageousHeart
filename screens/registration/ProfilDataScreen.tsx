import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import i18next from 'i18next'
import Input from '../../components/Input'
import { useState } from 'react'
import * as Localization from "expo-localization"
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import { ScaledSheet, scale } from 'react-native-size-matters'
import * as ImagePicker from 'expo-image-picker';



const ProfilDataScreen: React.FC = () => {

  const [name, onChangeName] = useState('');
  const [nameError, setNameError] = useState('');
  const [dob, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [initial, setInitial] = useState(true);
  const [dobError, setDobError] = useState('');
  const [disabled, setDisabled] = useState(true);  
  const [image, setImage] = useState('');


  const pickImage = async () => {
    let response = await ImagePicker.requestMediaLibraryPermissionsAsync(false)
    if (!response.granted) {
        return
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log('UrI: ', image)
    }
  };
  


  const onChangeDate = (event: any, selectedDate: any) => {
    {Platform.OS === 'android' && (
        setShow(false),
        setInitial(false)
    )}
    setDate(selectedDate)
    handleDobChange
  };


  const checkInputs = () => {
    if (name.trim().length != 0 && dob) {
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
        navigation.navigate('SignUpAccount', {name: name, dob: dob.toLocaleDateString(), imgUrl: image})
    }

  };

  const navigation = useNavigation();

  return (
        <View style={styles.container}>
            <View style={styles.container_title}>
                <Text style={styles.title}>{i18next.t('sign_up_title').toUpperCase()}</Text>
            </View>

            <View style={styles.container_picture}>
                <View style={styles.container_image}>
                    {image.length == 0 ? (
                        <Image source={require('../../assets/images/user_default.png')} resizeMode='contain' style={styles.defaultProfilPicture}/>
                    ) : (
                        <Image source={{uri: image}} resizeMode='contain' style={styles.profilPicture}/>
                    )}
                    <TouchableOpacity activeOpacity={1} style={styles.button_pen} onPress={pickImage}>
                        <Image source={require('../../assets/icons/pen_circle.png')} resizeMode='contain' style={{width: scale(27), height: scale(27),}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.container_form}>
                    <Input email={false} handleInputChange={handleNameChange} placeholder={i18next.t('name')} error={nameError} onChange={onChangeName} setError={setNameError} value={name} password={false} />
                    <View style={styles.container_input}>
                        <TouchableOpacity 
                            activeOpacity={1} 
                            onPress={showDatepicker} 
                            style={[styles.datePicker, {borderColor: dobError.length !== 0 ? 'red' : 'black', borderWidth: dobError.length !== 0 ? 2 : 1}]}>
                            {initial ? (
                            <Text style={{ color: 'gray' }}>{i18next.t('dob')}</Text>
                            ) : (
                            <Text style={{ color: 'black' }}>{dob.toLocaleDateString()}</Text>
                            )}
                        </TouchableOpacity>
                        <Text style={{marginTop: 4, color: 'red', fontSize: 11}}>{dobError}</Text>
                        {show && (
                            Platform.OS === 'android' ? (
                                <View style={{alignSelf: 'center'}}>
                                    <DateTimePicker
                                        display='spinner'
                                        value={dob}
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
                                                    <Image source={require('../../assets/icons/close.png')} resizeMode='contain' style={{height: scale(30), width: scale(30), tintColor: '#374957'}}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{alignSelf: 'center'}}>
                                                <DateTimePicker
                                                    display='spinner'
                                                    value={dob}
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

                    <View style={{flex: 0.3, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>{i18next.t('already_account')}</Text>
                    <Text style={{fontWeight: 'bold', marginLeft: 10}} onPress={() => {navigation.navigate('Login')}}>{i18next.t('login_title')}</Text>
                </View>
            </View>
                
            <View style={styles.container_button}>
                <View style={styles.container_next}>
                    <TouchableOpacity style={styles.button_next} activeOpacity={0.8} onPress={validate}>
                        <Text style={{color: 'white', marginEnd: 8, fontWeight: 'bold'}}>{i18next.t('next').toUpperCase()}</Text>
                        <Image source={require('../../assets/icons/angle_small_right.png')} resizeMode='contain' style={{height: 25, width: 25, tintColor: 'white'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
}

export default ProfilDataScreen

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: '35@s'
    },
    container_title: {
        flex: 0.4,
        justifyContent: 'center'
    },
    container_picture: {
        flex: 0.65,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '20@s'
    },
    container_image: {
        height: '130@s'
    },
    container_form: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    container_input: {
        width: '75%',
        marginBottom: '12@s',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    container_button: {
        flex: 0.3,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '75%'
    },
    container_next: {
        width: '115@s',
        height: 48
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
    defaultProfilPicture: {
        height: '125@s',
        width: '125@s',
        borderRadius: '80@s',
        borderWidth: 2,
        borderColor: 'black',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        tintColor: '#ECDEEA'
    },
    profilPicture: {
        height: '125@s',
        width: '125@s',
        borderRadius: '80@s',
        borderWidth: 2,
        borderColor: 'black',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePicker: {
        justifyContent: 'center',
        paddingLeft: '20@s',
        paddingRight: '20@s',
        borderRadius: '40@s',
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
        padding: '20@s',
        borderRadius: '20@s',
        width: '90%',
        justifyContent: 'center'
    },
    button_pen: {
        width: '33@s',
        height: '33@s',
        alignSelf: 'flex-end',
        top: '-33@s',
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_ok: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
        height: 48,
        width: '120@s',
        marginTop: '10@s' 
    },
    button_next: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 130,
        alignSelf: 'flex-end',
        backgroundColor: 'black'
    },
});
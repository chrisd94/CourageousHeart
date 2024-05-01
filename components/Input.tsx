import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Image, Text, Dimensions} from 'react-native';
import { useState } from 'react';
import { ScaledSheet, scale } from 'react-native-size-matters';

interface InputProps {
    placeholder: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    password: boolean,
    error: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    email: boolean
    handleInputChange: () => void
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  value,
  password,
  error,
  setError,
  email,
  handleInputChange
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);


  const togglePassword = () => {
    setHidePassword(!hidePassword)
  }

  return (
    <View style={{paddingHorizontal: scale(35), marginBottom: scale(12),  width: '100%', alignItems: 'flex-start'}}>
      <View
        style={[
          style.inputContainer,
          {
            paddingRight: 
                password
              ? 48
              : 10,
            backgroundColor:
                isFocused
              ? '#ECDEEA'
              : 'white',
            alignItems: 'center',
            borderColor: 
              error.length !== 0 
              ? 'red'
              : 'black',
            borderWidth: 
              error.length !== 0 
              ? 2
              : 1
          }
        ]}>
        <TextInput
          placeholder={placeholder}
          keyboardType={email ? 'email-address' : 'default'}
          onChangeText={onChange}
          onChange={handleInputChange}
          value={value}
          placeholderTextColor={'grey'}
          onFocus={() => {
            setIsFocused(true);
            setError('')
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={style.inputField}
        />
        {password && (

        <TouchableOpacity style={{width: 44, height: 44, paddingLeft: 10, justifyContent: 'center'}} activeOpacity={1} onPress={togglePassword}>
            {hidePassword ? (
                <Image source={require('../assets/icons/eye_crossed.png')} resizeMode='contain' style={{height: 20, width: 20, tintColor: '#374957'}} />
            ) : (
                <Image source={require('../assets/icons/eye.png')} resizeMode='contain' style={{height: 20, width: 20, tintColor: '#374957'}} />
            )
            }
        </TouchableOpacity>
        )}
      </View>
      <Text style={{marginTop: 4, color: 'red', fontSize: 11}}>{error}</Text>
    </View>
  );
};

const style = ScaledSheet.create({
  inputContainer: {
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 20,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%'
  },
  inputField: {
    height: 48,
    width: '100%'
  }
});

export default Input;
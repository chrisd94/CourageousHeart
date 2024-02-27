import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import { useState } from 'react';

interface InputProps {
    placeholder: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    password: boolean,
    error: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  value,
  password,
  error,
  setError
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  const togglePassword = () => {
    setHidePassword(!hidePassword)
  }

  return (
    <View style={{marginBottom: 12}}>
      <View
        style={[
          style.inputContainer,
          {
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
          onChangeText={onChange}
          value={value}
          placeholderTextColor={'grey'}
          onFocus={() => {
            setIsFocused(true);
            setError('')
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={[style.inputField,
            {
            width:
                password
              ? '90%'
              : '100%',
            }]}
        />
        {password && (

        <TouchableOpacity style={{width: 44, height: 44, justifyContent: 'center', paddingLeft: 10}} activeOpacity={1} onPress={togglePassword}>
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

const style = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
  },
  inputField: {
    height: 48,
    width: '90%'
  }
});

export default Input;
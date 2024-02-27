import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import i18next from '../services/i18next'
import { useNavigation } from '@react-navigation/native' 


const LandingScreen: React.FC = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.container_outer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <Text style={styles.title}>{i18next.t("welcome").toUpperCase()}</Text>
            <Text style={{ textAlign: 'center', marginTop: 35, marginBottom: 35}}>{i18next.t("welcome_text")}</Text>
            <Image source={require('../assets/images/sign_up_1.png')} resizeMode='contain' style={styles.image}/>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => {navigation.navigate('Login')}}>
                <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}} >{i18next.t("login").toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => {navigation.navigate('SignUp')}}>
                <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}} >{i18next.t("sign_up").toUpperCase()}</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
    container_outer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 30,
    },
    title: {
        color: '#AF8FEA',
        fontSize: 45,
        fontWeight: 'bold',
    },
    image: {
        width: 250,
        height: 250
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#C6B1ED',
        height: 48,
        width: 180,
        marginTop: 25 
    }
});
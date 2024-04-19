import { StatusBar } from "expo-status-bar";
import React from "react";
import {StyleSheet, View, Text, Dimensions, Image, ScrollView} from "react-native";
import * as Localization from "expo-localization"

const HomeScreen: React.FC = () => {
    return(
      <View style={{backgroundColor: 'white', alignItems: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <Text>{Localization.getLocales()[0].languageCode}</Text>
            <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
          <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
          <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
          <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
          <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
          <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
          <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
          <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
          <View style={{flex: 1}}>
            <Image source={require('../assets/images/sign_up_3.png')} resizeMode='contain' style={styles.image} />
          </View>
            <StatusBar style="auto" />
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'white',
      paddingVertical: 40,
      width: Dimensions.get('window').width,
    },
    image: {
      width: 183,
      height: 180,
      alignSelf: 'center'
    },
  });

export default HomeScreen;

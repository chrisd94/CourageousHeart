import { StatusBar } from "expo-status-bar";
import React from "react";
import {StyleSheet, View, Text} from "react-native";
import * as Localization from "expo-localization"

const HomeScreen: React.FC = () => {
    return(
        <View style={styles.container}>
            <Text>{Localization.getLocales()[0].languageCode}</Text>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomeScreen;

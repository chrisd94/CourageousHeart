import { StatusBar } from "expo-status-bar";
import React from "react";
import {StyleSheet, View, Text} from "react-native";

const HomeScreen: React.FC = () => {
    return(
        <View style={styles.container}>
            <Text>This is the Homescreen</Text>
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

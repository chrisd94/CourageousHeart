import { StatusBar } from "expo-status-bar";
import React from "react";
import {StyleSheet, View, Text} from "react-native"

const ExploreScreen: React.FC = () => {
    return(
        <View style={styles.container}>
            <Text>This is the ExploreScreen</Text>
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

export default ExploreScreen

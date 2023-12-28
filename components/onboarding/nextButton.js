import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const NextButton = ({scrollTo, isLastPage}) => {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('Login');
    SecureStore.setItemAsync('alreadyLaunched', 'true')
    .catch(error => {
      console.error("Error saving data to SecureStore", error);
    });
  }

  return (
    <View style={{padding:25}}>
    <TouchableOpacity onPress={isLastPage ? navigate : scrollTo} style={styles.buttonContainer}>
      <Text style={styles.button}>
        {isLastPage ? "Login" : "Next"}
      </Text>
    </TouchableOpacity>
    </View>
  );
};;

const styles = StyleSheet.create({
    button:{
        borderRadius: 15,
        padding: 10,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 50,
        width:'95%',
        fontSize: 15,
        fontWeight: "700",
        backgroundColor: "#326370",
        color: "#fff",
        position: "relative",
    },
});

export default NextButton;


import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NextButton = ({ scrollTo, isLastPage, completeOnboarding }) => {
  const navigation = useNavigation();

  const navigate = async () => {
    try {
      await completeOnboarding();
      navigation.replace('Login');
    } catch (error) {
      console.log('error @completeOnboarding: ', error);
    }
  }

  return (
    <View style={{ padding: 25 }}>
      <TouchableOpacity
        onPress={() => {
          // console.log('Button pressed, isLastPage is', isLastPage);
          if (isLastPage) {
            navigate();
          } else {
            scrollTo();
          }
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.button}>
          {isLastPage ? "Login" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};;

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    padding: 10,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
    width: '95%',
    fontSize: 15,
    fontWeight: "700",
    backgroundColor: "#326370",
    color: "#fff",
    position: "relative",
  },
});

export default NextButton;


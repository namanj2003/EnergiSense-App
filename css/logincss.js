import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const title={
  marginTop: height * 0.1,
  marginBottom: 20,
};
export const titleText = {
  textAlign: "center",
  fontSize: width * 0.1,
  fontWeight: "600",
  color:"#fff"
};
export const content = {
  height: "50%",
  paddingHorizontal: width * 0.06,
  justifyContent: "flex-start",
  width: "100%",
  marginBottom: 50,
};
export const contentSignup = {
  paddingHorizontal: width * 0.06,
  justifyContent: "flex-start",
  width: "100%",
  marginBottom: 50,
};
export const title1 = {
  textAlign: "center",
  fontSize: width*0.08,
  fontWeight: "600",
  color:"#fff",
  marginBottom:15,
};
export const title2 = {
  textAlign: "center",
  fontSize: width*0.045,
  fontWeight: "600",
  color:"#b4b7bf",
};
export const inputContainer = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
  borderWidth: 2,
  borderColor: '#313747',
  borderRadius: 13,
  marginVertical: 10,
  backgroundColor: "#16171B",
};
export const input = {
  flex:1,
  height: height*0.065,
  width: "100%",
  borderRadius: 13,
  paddingLeft: 20,
  fontSize: width*0.04,  
  fontWeight: "600",
  color: '#b4b7bf',
};
export const forgotPassword = {
  color: '#b4b7bf',
  fontSize: width*0.04,
  fontWeight: "600",
};
export const error1={
  paddingVertical: 20,
  color: '#e84646',
  fontSize: width*0.04,
  textAlign: "center",
  fontWeight: "600",
};
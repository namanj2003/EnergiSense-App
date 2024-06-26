import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import ip from '../ip';
import { error1 } from '../../css/logincss';
import { loader } from '../../css/loadercss';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Profile = ({ navigation }) => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [deviceID, setDeviceID] = useState(null);
  const [error, setError] = useState(null);
  const [newData, setNewData] = useState({ name: "", email: "" });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(`https://${ip}/avatar/avatar1.png`);
  const [previousAvatar, setPreviousAvatar] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedDeviceID = await AsyncStorage.getItem('api');
        let storedAvatar = await AsyncStorage.getItem('avatarTemp');

        if (storedName) {
          setName(storedName);
          setNewData(prevData => ({ ...prevData, name: storedName }));
        }
        if (storedEmail) {
          setEmail(storedEmail);
          setNewData(prevData => ({ ...prevData, email: storedEmail }));
        }
        if (storedDeviceID) setDeviceID(storedDeviceID);

        if (!storedAvatar) {
          // If no avatar is stored, set the default avatar
          storedAvatar = `https://${ip}/avatar/avatar1.png`;
          await AsyncStorage.setItem('avatarTemp', storedAvatar);
        }

        setAvatar(storedAvatar);
      } catch (error) {
        console.log('error @profile ', error);
      }
    };

    getData();
  }, []);
  //
  const handleAvatarChange = () => {
    setPreviousAvatar(avatar);
    if (avatar === `https://${ip}/avatar/avatar1.png`) {
      setAvatar(`https://${ip}/avatar/avatar3.png`);
      AsyncStorage.setItem('avatarTemp', `https://${ip}/avatar/avatar3.png`);
    } else {
      setAvatar(`https://${ip}/avatar/avatar1.png`);
      AsyncStorage.setItem('avatarTemp', `https://${ip}/avatar/avatar1.png`);
    }
  };
  //
  const handleProfileChange = async () => {
    Alert.alert(
      'Select Profile Picture',
      'Choose the source',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera permissions to make this work!');
              return;
            }

            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              cameraType: ImagePicker.CameraType.front,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled) {
              setPreviousAvatar(avatar);
              const uri = result.assets[0].uri;
              setAvatar(uri);
              await AsyncStorage.setItem('avatarTemp', uri);
            }
            else if (result.canceled) {
              setAvatar(previousAvatar);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need gallery permissions to make this work!');
              return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              cameraType: ImagePicker.CameraType.front,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled) {
              setPreviousAvatar(avatar);
              const uri = result.assets[0].uri;
              setAvatar(uri);
              await AsyncStorage.setItem('avatarTemp', uri);
            }
            else if (result.canceled) {
              setAvatar(previousAvatar);
            }
          },
        }
      ],
      { cancelable: true },
    );
  };
  //
  const handleEditProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setIsEditingProfile(true);
      setLoading(false);
      setError(null);
    }, 500);
  }
  const handleCancelEditProfile = () => {
    setLoading(true);
    setTimeout(() => {
      if (previousAvatar) {
        setAvatar(previousAvatar);
        AsyncStorage.setItem('avatar', previousAvatar);
      }
      setIsEditingProfile(false);
      setLoading(false);
      setError(null);
    }, 500);
  }

  const saveProfile = () => {
    console.log(newData.name)
      console.log(newData.email)
    if (newData.name === null || newData.email === null || newData.name === "" || newData.email === "") {
      setError("All fields are required");      
      return;
    } else {
      if (!validateEmail(newData.email)) {
        setError("Invalid email address");
        return;
      }
      else {
      fetch(`https://${ip}/save-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newData, deviceID }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(async (data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setLoading(true);
            setError(null);
            setIsEditingProfile(false);
            const cleanedName = newData.name.replace(/["']/g, "");
            setName(cleanedName);
            await AsyncStorage.setItem('name',(newData.name));
            setEmail(newData.email);
            await AsyncStorage.setItem('email', newData.email);
            await AsyncStorage.setItem('avatarTemp', avatar);
            console.log(data);
            if (data.message === "Profile updated successfully") {
              setLoading(false);
            }
          }
        })
        .catch((error) => {
          setError("Network request failed. Please check your internet connection and try again.");
          console.log('error @saveProfile ', error);
        });
    }
  }
}

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const handlePasswordChange = () => {
  navigation.navigate('ChangePassword');
}

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('api');
    await AsyncStorage.removeItem('alreadyLoggedIn');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('avatar');
    await AsyncStorage.removeItem('avatarTemp');   
    navigation.replace('Login');
  }
  catch (error) {
    console.log('error @logout ', error);
  }
}

return (
  <>
    <View style={styles.container}>
      {isEditingProfile ?
        (<>
          <View style={styles.coverImage}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: avatar }}
                style={styles.avatar}
                resizeMode="contain"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={handleAvatarChange}>
                  <Text style={[styles.name, styles.textWithShadow]}>Change Avatar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleProfileChange}>
                  <Text style={[styles.name, styles.textWithShadow]}>Upload Image</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" style={loader} />) : (
            <>
              <View style={styles.content}>
                <View style={[styles.labelContainer, { top: -30 }]}>
                  <Text style={{ color: "#fff" }}>Name</Text>
                </View>
                <View style={styles.infoLabel}>
                <TextInput style={styles.infoValue} onPressIn={() => setError(null)} onChangeText={(text) => setNewData({ ...newData, name: text.trim() })}>{(name)}</TextInput>
                </View>
                <View style={[styles.labelContainer, { top: 54 }]}>
                  <Text style={{ color: "#fff" }}>Email</Text>
                </View>
                <View style={styles.infoLabel}>
                  <TextInput style={styles.infoValue} onPressIn={() => setError(null)} onChangeText={(text) => setNewData({ ...newData, email: text.toLowerCase().replace(/\s/g, '') })}>{(email)}</TextInput>
                </View>
                {error && <Text style={error1}>{error}</Text>}
                <TouchableOpacity onPress={saveProfile}>
                  <View style={[styles.saveProfileContainer,{alignSelf: "flex-start"}]}>
                    <MaterialCommunityIcons name="account-check" size={20} color="#c0c5cb" style={styles.editIcon} />
                    <Text style={styles.editProfile}>Save Changes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelEditProfile}>
                  <View style={[styles.editProfileContainer,{alignSelf: "flex-end"}]}>
                    <Text style={[styles.editProfile,{paddingRight:5}]}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>)}
        </>) : (
          <>
            <View style={styles.coverImage}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: avatar }}
                  style={styles.avatar}
                  resizeMode="contain"
                />
                <Text style={[styles.name, styles.textWithShadow]}>{name}</Text>
              </View>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" style={loader} />) : (
              <>
                <View style={styles.content}>
                  <View style={[styles.labelContainer, { top: -30 }]}>
                    <Text style={{ color: "#fff" }}>Email</Text>
                  </View>
                  <View style={styles.infoLabel}>
                    <Text style={styles.infoValue}>{(email)}</Text>
                  </View>
                  <View style={[styles.labelContainer, { top: 54 }]}>
                    <Text style={{ color: "#fff" }}>Device ID</Text>
                  </View>
                  <View style={styles.infoLabel}>
                    <Text style={styles.infoValue}>{deviceID}</Text>
                  </View>
                  <TouchableOpacity onPress={handleEditProfile}>
                    <View style={[styles.editProfileContainer,{alignSelf: "flex-end",}]}>
                      <MaterialCommunityIcons name="account-edit" size={20} color="#c0c5cb" style={styles.editIcon} />
                      <Text style={styles.editProfile}>Edit Profile</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePasswordChange}>
                  <View style={[styles.editProfileContainer,{alignSelf: "flex-start"}]}>
                      <MaterialCommunityIcons name="account-key-outline" size={20} color="#c0c5cb" style={styles.editIcon} />
                      <Text style={styles.editProfile}>Change Password</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.logoutButton}>Logout</Text>
                </TouchableOpacity>
                </View>
              </>)}
          </>)}
    </View >
  </>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17181F',
  },
  coverImage: {
    height: 200,
    width: "100%",
    backgroundColor: "#1295b8",
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
  },
  name: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 20,
    color: '#252732'
  },
  textWithShadow: {
    textShadowRadius: 5,
  },
  content: {
    marginTop: 30,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "70%",
    paddingRight: 20,
    paddingLeft: 20,
  },
  labelContainer: {
    backgroundColor: "#17181F",
    alignSelf: "flex-start",
    paddingHorizontal: 3,
    marginStart: 40,
    zIndex: 1,
    elevation: 1,
    shadowColor: "#17181F",
    position: "absolute",
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: 'white',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#5d5d5d',
    padding: 7,
    marginBottom: 30,
  },
  infoValue: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    color: '#f7f7f7',
    fontSize: 17,
    fontWeight: 'bold',
  },
  saveProfileContainer: {
    flexDirection: "row",
    backgroundColor: "#17181F",
    alignSelf: "flex-start",
    zIndex: 1,
    elevation: 1,
    shadowColor: "#17181F",
    position: "absolute",
    marginTop: 20,
    marginRight: 20,
  },
  editProfileContainer: {
    flexDirection: "row",
    backgroundColor: "#17181F",
    zIndex: 1,
    elevation: 1,
    shadowColor: "#17181F",
    position: "absolute",
    marginTop: 20,
    marginRight: 20,
  },
  editProfile: {
    color: '#c0c5cb',
    fontSize: 17,
    fontWeight: 'bold',
  },
  editIcon: {
    paddingRight: 5,
  },
  logoutContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
  },
  logoutButton: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fa6400",
        // color: "#c0c5cb",
  },

});

export default Profile;
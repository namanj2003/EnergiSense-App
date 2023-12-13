import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import ip from '../ip';
import { error1 } from '../../css/logincss';
import { loader } from '../../css/loadercss';

const Profile = ({ navigation }) => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [deviceID, setDeviceID] = useState(null);
  const [error, setError] = useState(null);
  const [newData, setNewData] = useState({ name: "", email: "" });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState('https://www.bootdey.com/img/Content/avatar/avatar1.png');
  

  useEffect(() => {
    const getData = async () => {
      try {
        const storedName = await SecureStore.getItemAsync('name');
        const storedEmail = await SecureStore.getItemAsync('email');
        const storedDeviceID = await SecureStore.getItemAsync('api');
        const storedAvatar = await SecureStore.getItemAsync('avatar');
        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedDeviceID) setDeviceID(storedDeviceID);
        if (storedAvatar) setAvatar(storedAvatar);
        // console.log(storedName, storedEmail, storedDeviceID);
      } catch (error) {
        console.log('error @profile ', error);
      }
    }
    getData();
  }, []);
//
const handleAvatarChange = () => {
  if (avatar === 'https://www.bootdey.com/img/Content/avatar/avatar1.png') {
    setAvatar('https://bootdey.com/img/Content/avatar/avatar3.png');
  } else {
    setAvatar('https://www.bootdey.com/img/Content/avatar/avatar1.png');
  }
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
      setIsEditingProfile(false);
      setLoading(false);
      setError(null);
    }, 500);
  }

  const saveProfile = () => {
    if (newData.name === "" || newData.email === "") {
      setError("All fields are required");
      return;
    } else {
      if (!validateEmail(newData.email)) {
        setError("Invalid email address");
        return;
      } else {
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
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setLoading(true);
              setTimeout(() => {
              setError(null);
              setIsEditingProfile(false);
              setName(JSON.stringify(newData.name));
              SecureStore.setItemAsync('name', JSON.stringify(newData.name));
              setEmail(newData.email);
              SecureStore.setItemAsync('email', newData.email);
              SecureStore.setItemAsync('avatar', avatar); // Save avatar URL in SecureStore
              setLoading(false);
              console.log(data);
              }, 500);
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

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('name');
      await SecureStore.deleteItemAsync('email');
      await SecureStore.deleteItemAsync('api');
      await SecureStore.deleteItemAsync('alreadyLoggedIn');
      navigation.navigate("Login");
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
                />
                <TouchableOpacity onPress={handleAvatarChange}>
                  <Text style={[styles.name, styles.textWithShadow]}>Change</Text>
                </TouchableOpacity>
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
                    <TextInput style={styles.infoValue} onPressIn={() => setError(null)} onChangeText={(text) => setNewData({ ...newData, name: text })}>{name ? JSON.parse(name) : ""}</TextInput>
                  </View>
                  <View style={[styles.labelContainer, { top: 54 }]}>
                    <Text style={{ color: "#fff" }}>Email</Text>
                  </View>
                  <View style={styles.infoLabel}>
                    <TextInput style={styles.infoValue} onPressIn={() => setError(null)} onChangeText={(text) => setNewData({ ...newData, email: text.toLowerCase() })}>{(email)}</TextInput>
                  </View>
                  {error && <Text style={error1}>{error}</Text>}
                  <TouchableOpacity onPress={saveProfile}>
                    <View style={styles.saveProfileContainer}>
                      <MaterialIcons name="edit" size={20} color="#c0c5cb" style={styles.editIcon} />
                      <Text style={styles.editProfile}>Save Changes</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancelEditProfile}>
                    <View style={styles.editProfileContainer}>
                      <Text style={styles.editProfile}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.button1}>Logout</Text>
                </TouchableOpacity>
              </>)}
          </>) : (
            <>
              <View style={styles.coverImage}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                  />
                  <Text style={[styles.name, styles.textWithShadow]}>{JSON.parse(name)}</Text>
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
                      <View style={styles.editProfileContainer}>
                        <MaterialIcons name="edit" size={20} color="#c0c5cb" style={styles.editIcon} />
                        <Text style={styles.editProfile}>Edit Profile</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.button1}>Logout</Text>
                  </TouchableOpacity>
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
    height: 220,
    width: "100%",
    margin: 0,
    backgroundColor: "#1295b8",
    // backgroundColor:"#ff6346",
    // backgroundColor:"#094151",

  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 20,
    color: '#252732'
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
    alignSelf: "flex-end",
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
  button1: {
    color: "#c0c5cb",
    alignSelf: "center",
    bottom: 52,
    fontSize: 18,
    fontWeight: "bold",
  },

});

export default Profile;
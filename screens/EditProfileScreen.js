import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "../api/axios";
import AuthContext from "../Context/AuthContext";
import ImgUrl from "../const/ImgUrl";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Avatar } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfileScreen = (props) => {
  const val = useContext(AuthContext);
  const [userFromDb, setUserFromDb] = useState({});
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [update, setUpdated] = useState(false);
  const [img, setImg] = useState("");
  const [imgUp, setImgUp] = useState({});
  const [newImg, setNewImg] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get("/user")
      .then((response) => {
        // console.log(response.data);
        setUserFromDb(response.data)
        // setNom(response.data.nom);
        // setPrenom(response.data.prenom);
        // setTel(response.data.tel);
        // setAdresse(response.data.adresse);
        // setImg(response.data.img);
        // console.log(userFromDb)
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  const editProfileHandler = async () => {

    let data = new FormData();
    if (newImg !== '') {
      data.append("img", {
        uri: newImg,
        name: "file",
        type: "image/jpg",
      })
    }

    data.append('prenom', userFromDb.prenom)
    data.append('tel', userFromDb.tel)
    data.append('adresse', userFromDb.adresse)
    data.append('nom', userFromDb.nom)

    const u = `${axios.defaults.baseURL}/user`;

    try {
      const res = await fetch(u, {
        method: "POST",
        headers: {
          'Accept': "application/json",
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${user.token}`
        },
        body: data


      });
      const resData = await res.json();
      // console.log(resData)
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
      }, 3000);
      setUserFromDb(resData)

    } catch (error) {
      console.log(error);
    }

  };
  const updateImg = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert("svp accepter cette permission pour continue");
      return;
    }

    const uploadedImg = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 6],
      quality: 1,
    });
    //  console.log(uploadedImg);
    setImgUp(uploadedImg);
    setNewImg(uploadedImg.uri);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Avatar
          source={{ uri: `${ImgUrl.url}/${userFromDb.img}` }}
          size="giant"
          style={{
            marginRight: 16,
            height: 120,
            width: 120,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: "35%",
            top: "48%",
            backgroundColor: "rgb(7,116,231)",
            borderRadius: 5,
          }}
          onPress={updateImg}
        >
          <MaterialCommunityIcons name="pencil" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {update && (
        <View style={styles.successCnt}>
          <Text style={styles.successTxt}>
            votre profile a été changé avec succès
          </Text>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <View style={styles.tabContainer}>
          <View style={styles.formContainer}>
            <View style={styles.Input}>
              <TextInput
                placeholder="nom"
                onChangeText={(tex) => {
                  setUserFromDb({ ...userFromDb, nom: tex });
                }}
                value={userFromDb.nom}
              />
            </View>
            <View style={styles.Input}>
              <TextInput
                placeholder="prenom"
                onChangeText={(tex) => {
                  setUserFromDb({ ...userFromDb, prenom: tex });
                }}
                value={userFromDb.prenom}
              />
            </View>
            <View style={styles.Input}>
              <TextInput
                placeholder="tel"
                onChangeText={(tex) => {
                  setUserFromDb({ ...userFromDb, tel: tex });
                }}
                value={userFromDb.tel}
              />
            </View>
            <View style={styles.Input}>
              <TextInput
                placeholder="adresse"
                onChangeText={(tex) => {
                  setAdresse(tex);
                }}
                value={userFromDb.adresse}
              />
            </View>

            <TouchableHighlight
              onPress={editProfileHandler}
              style={styles.modBtn}
              underlayColor="#1364e8"
            >
              <Text style={{ color: "white" }}>Modifier</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
};

EditProfileScreen.navigationOptions = (navData) => {
  return {
    title: "Modifier Profile",
  };
};
const styles = StyleSheet.create({
  tabContainer: {
    height: "72%",
    width: "100%",
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  successCnt: {
    marginTop: "2%",
    height: "8%",
    width: "95%",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#13e876",
    //borderWidth: 1,
  },
  successTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  imgcontainer: {
    //flex: 1,
    height: "20%",
    alignItems: "center",
    marginTop: 20,
    //marginBottom: 10,
  },

  img: {
    width: "100%",
    height: "70%",
    borderRadius: 1000,
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
  },
  Input: {
    borderWidth: 1,
    fontSize: 17,
    width: "95%",
    height: 50,
    margin: 10,
    padding: 5,
    borderRadius: 10,
    borderColor: "rgb(107, 161, 249)",
    //flexDirection: "row",
  },
  modBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // width: "55%",
    height: 45,

    marginTop: 4,
    paddingHorizontal: "20%",
    backgroundColor: "rgb(107, 161, 249)",
  },
});
export default EditProfileScreen;

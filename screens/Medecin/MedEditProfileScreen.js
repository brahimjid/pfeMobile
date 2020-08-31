import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "../../api/axios";
import AuthContext from "../../Context/AuthContext";
import { TouchableHighlight } from "react-native-gesture-handler";

const MedEditProfileScreen = (props) => {
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [prenom, setPrenom] = useState("");
  const [update, setUpdated] = useState(false);
  const [img, setImg] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get("/user")
      .then((response) => {
        //console.log(response.data);
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setTel(response.data.tel);
        setImg(response.data.img);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  const editProfileHandler = () => {
    axios
      .put("/medecin/" + user.id, {
        nom,
        prenom,
        tel,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          setUpdated(true);
          setTimeout(() => {
            setUpdated(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log("err");
      });
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <View style={styles.imgcontainer}>
        <Image
          source={{
            uri: "http://10.0.2.2:8000/storage/" + img,
          }}
          style={styles.img}
          resizeMode="contain"
        />
      </View> */}

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
            <TextInput
              placeholder="nom"
              style={styles.Input}
              onChangeText={(tex) => {
                setNom(tex);
              }}
              value={nom}
            />

            <TextInput
              style={styles.Input}
              placeholder="prenom"
              onChangeText={(tex) => {
                setPrenom(tex);
              }}
              value={prenom}
            />

            <TextInput
              placeholder="tel"
              style={styles.Input}
              onChangeText={(tex) => {
                setTel(tex);
              }}
              value={tel}
            />

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

MedEditProfileScreen.navigationOptions = (navData) => {
  return {
    title: "Modifier Profile",
    headerTintColor: "white",
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
    marginTop: 10,
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
    marginTop: 60,
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
export default MedEditProfileScreen;

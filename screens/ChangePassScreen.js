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
import { TouchableHighlight } from "react-native-gesture-handler";

const ChangePassScreen = (props) => {
  const val = useContext(AuthContext);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [errText, setErrText] = useState("");

  const { user } = useContext(AuthContext);

  const changePasshandler = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .post("/changePass", {
        "current-password": oldPass,
        "new-password": newPass,
        "new-password_confirmation": confirmPass,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data !== true) {
          setErrText(response.data);
          setErr(true);
          setTimeout(() => {
            setErr(false);
          }, 5000);
          return;
        }
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setOldPass("");
          setNewPass("");
          setConfirmPass("");
          props.navigation.replace("Profile");
        }, 4000);
      })
      .catch((error) => {
        console.log("error here");
        console.log(error.response);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={styles.tabContainer}>
          {err && (
            <View style={styles.errCnt}>
              <Text style={styles.errTxt}>{errText}</Text>
            </View>
          )}

          {success && (
            <View style={styles.successCnt}>
              <Text style={styles.successTxt}>
                Le mot de passe a été changé avec succès
              </Text>
            </View>
          )}

          <View style={styles.formContainer}>
            <View style={styles.Input}>
              <TextInput
                style={styles.Inp}
                placeholder="ancient mot de passe"
                onChangeText={(text) => setOldPass(text)}
              />
            </View>
            <View style={styles.Input}>
              <TextInput
                style={styles.Inp}
                placeholder="prenom"
                onChangeText={(text) => {
                  setNewPass(text);
                }}
              />
            </View>
            <View style={styles.Input}>
              <TextInput
                style={styles.Inp}
                placeholder="tel"
                onChangeText={(text) => {
                  setConfirmPass(text);
                }}
              />
            </View>

            <TouchableHighlight
              onPress={changePasshandler}
              style={styles.modBtn}
              underlayColor="#1364e8"
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Changer
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
};
ChangePassScreen.navigationOptions = (navData) => {
  return {
    title: "Modifer mot de passe",
  };
};
export default ChangePassScreen;

const styles = StyleSheet.create({
  tabContainer: {
    height: "53%",
    width: "100%",
    //marginTop: 3,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  formContainer: {
    width: "95%",
    elevation: 1,
    margin: 10,
    padding: 10,
    marginVertical: 100,
    // justifyContent: "center",
    alignItems: "center",
  },

  Input: {
    borderWidth: 1.5,
    fontSize: 17,
    width: "95%",
    height: 50,
    margin: 10,
    padding: 5,
    borderRadius: 10,
    borderColor: "rgb(107, 161, 249)",
  },
  Inp: {
    fontSize: 16,
  },
  modBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "50%",
    height: 45,

    marginTop: 4,
    paddingHorizontal: "15%",
    backgroundColor: "rgb(107, 161, 249)",
  },
  errCnt: {
    marginTop: "2%",
    height: "30%",
    width: "95%",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#f32437",
    //borderWidth: 1,
  },
  successCnt: {
    marginTop: "2%",
    height: "25%",
    width: "95%",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#13e876",
    //borderWidth: 1,
  },
  errTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    // marginTop: "5%",
    lineHeight: 21,
    //paddingBottom: 10,
  },
  successTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});

import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons, EvilIcons } from "@expo/vector-icons";
import AuthContext from "../Context/AuthContext";
import UserSelect from "../components/UserSelect";
//import { TouchableOpacity } from "react-native-gesture-handler";
// import { AppLoading } from "expo";
// import * as Font from "expo-font";

// function cacheFonts(fonts) {
//   return fonts.map((font) => Font.loadAsync(font));
// }
const LoginScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [userSelected, setUserSelected] = useState(false);
  const [fontLoaded, setFont] = useState(false);
  const { login, isLoading, userType, errors } = useContext(AuthContext);
  // const loadFonts = async () => {
  //   const fontAssets = cacheFonts([FontAwesome, EvilIcons]);

  //   await Promise.all([...fontAssets]);
  // };
  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => {
  //         setFont(true);
  //       }}
  //       onError={console.log("apploading error")}
  //     ></AppLoading>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ height: "30%" }}>
        <UserSelect />
      </View>
      {errors !== null ? (
        errors.incorrectLogin ? (
          <Text
            style={{
              textAlign: "center",
              backgroundColor: "#f52a4f",
              padding: 5,
              color: "white",
            }}
          >
            {errors.incorrectLogin}
          </Text>
        ) : (
          false
        )
      ) : (
        false
      )}

      <View style={styles.formContainer}>
        <View style={styles.inpI}>
          <Ionicons
            name="md-mail"
            size={24}
            style={styles.icon}
            color="rgb(107, 161, 249)"
          />
          <TextInput
            placeholder="Email"
            style={styles.emailInput}
            onChangeText={(tex) => {
              setEmail(tex);
              if (errors !== null) {
                errors.email = "";
                incorrectLogin = "";
              }
            }}
            value={Email}
          />
        </View>
        {errors !== null ? (
          errors.email ? (
            <Text style={[styles.labelError, { marginBottom: 5 }]}>
              {errors.email}
            </Text>
          ) : (
            false
          )
        ) : (
          false
        )}
        <View style={[styles.inpI, { marginTop: 15 }]}>
          <Ionicons
            name="md-lock"
            style={styles.icon}
            size={28}
            color="rgb(107, 161, 249)"
          />
          <TextInput
            placeholder="mot de passe"
            onChangeText={(text) => {
              setpassword(text);
              if (errors !== null) {
                errors.password = "";
                errors.incorrectLogin = "";
              }
            }}
            secureTextEntry={true}
            value={password}
            style={styles.passwordInput}
          />
        </View>
        {errors !== null ? (
          errors.password ? (
            <Text style={styles.labelErrorPass}>{errors.password}</Text>
          ) : (
            false
          )
        ) : (
          false
        )}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="rgb(107, 161, 249)"
              style={{ marginTop: 20 }}
            ></ActivityIndicator>
          ) : (
            <TouchableOpacity
              onPress={() => {
                login(Email, password, () => {
                  userType == 0
                    ? props.navigation.navigate("Home")
                    : props.navigation.navigate("Medecin");
                });
              }}
              style={styles.loginBtn}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 18,
                }}
              >
                Connecter
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {userType == 0 && (
        <View style={styles.signUpContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Register");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>Registrer</Text>
              <EvilIcons
                name="arrow-right"
                color="white"
                size={30}
                style={{ paddingLeft: 5 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
LoginScreen.navigationOptions = (navData) => {
  return {
    headerTitle: () => null,
    drawerLockMode: "locked-closed",
    swipeEnabled: false,
  };
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 7,
    backgroundColor: "white",
  },
  logo: {
    margin: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  labelError: {
    textAlign: "center",
    color: "#f52a4f",
    position: "absolute",
    marginTop: "17%",
    marginLeft: "19%",
  },
  labelErrorPass: {
    textAlign: "center",
    color: "#f52a4f",
    position: "absolute",
    marginTop: "41%",
    marginLeft: "19%",
  },
  formContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    // elevation: 2.5,
    borderRadius: 10,
    // borderTopEndRadius: 15,
    padding: 10,
    marginTop: 20,
    //justifyContent: "space-between",
  },
  inpI: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgb(107, 161, 249)",
    height: 50,
    marginBottom: 25,
  },
  emailInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 17,
  },
  icon: {
    marginLeft: "5%",
  },
  passwordInput: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 17,
  },

  loginBtn: {
    width: "54%",
    height: 45,
    backgroundColor: "rgb(107, 161, 249)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    // top: "30%",
  },
  inputErr: {
    borderColor: "#f52a4f",
  },
  signUpContainer: {
    width: "50%",
    margin: 15,
    height: 50,
    backgroundColor: "rgb(107, 161, 249)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginBottom: 36,
    bottom: 0,
  },

  itemCnt: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  imgContainer: {
    width: "100%",
    height: "100%",
    // borderWidth: 1,
  },
  medCnt: {
    alignItems: "center",
    marginTop: 10,
    width: "40%",
    height: "40%",
    marginBottom: 50,
    borderWidth: 1,
    backgroundColor: "red",
  },
  btn: {
    width: 140,
    height: 35,
    backgroundColor: "rgb(107, 161, 249)",
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
});

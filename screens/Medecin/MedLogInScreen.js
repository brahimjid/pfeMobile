import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Platform,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import { Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import AuthMedecinContext from "../../Context/AuthMedecinContext";

// import { AppLoading } from "expo";
// import * as Font from "expo-font";

// function cacheFonts(fonts) {
//   return fonts.map((font) => Font.loadAsync(font));
// }
const LoginScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [fontLoaded, setFont] = useState(false);
  const { login, isLoading } = useContext(AuthMedecinContext);
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
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          //backgroundColor: "blue",
          borderRadius: 20,
          marginVertical: 20,
        }}
      >
        <FontAwesome name="user-md" size={100} color="rgb(107, 161, 249)" />
      </View>
      {/* <View style={{ marginVertical: 25 }}>
        <Text style={styles.logo}>PFE</Text>
      </View> */}
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
            onChangeText={(tex) => setEmail(tex)}
            value={Email}
          />
        </View>

        <View style={styles.inpI}>
          <Ionicons
            name="md-lock"
            style={styles.icon}
            size={28}
            color="rgb(107, 161, 249)"
          />
          <TextInput
            placeholder="mot de passe"
            onChangeText={(text) => setpassword(text)}
            secureTextEntry={true}
            value={password}
            style={styles.passwordInput}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            //paddingBottom: 20,
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
                  props.navigation.navigate("Medecin");
                });
              }}
              style={styles.loginBtn}
            >
              <Text
                style={{
                  //marginTop: 10,
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
    </View>
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

    backgroundColor: "rgb(240, 246, 251)",
  },
  logo: {
    margin: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    elevation: 2.5,
    borderRadius: 10,
    borderTopEndRadius: 15,
    padding: 10,
    justifyContent: "center",
  },
  inpI: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgb(107, 161, 249)",
    height: 50,
    margin: 10,
    marginBottom: 30,
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
    width: "40%",
    height: 45,
    backgroundColor: "rgb(107, 161, 249)",
    borderRadius: 10,
    justifyContent: "center",
    top: "30%",
  },
});

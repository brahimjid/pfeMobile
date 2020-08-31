import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import axios from "../api/axios";
import { FontAwesome, EvilIcons, Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import Input from "../components/Input";
import { TouchableHighlight, ScrollView } from "react-native-gesture-handler";

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}
const RegisterScreen = (props) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [success, setsuccess] = useState(false);

  const [fontLoaded, setFont] = useState(false);
  const loadFonts = async () => {
    const fontAssets = cacheFonts([FontAwesome, EvilIcons]);

    await Promise.all([...fontAssets]);
  };
  const registerHandler = () => {
    //'https://51c79cc7.ngrok.io/api/sanctum/token'

    axios
      .post("/user/register", {
        nom,
        prenom,
        tel,
        adresse,
        email,
        password,
        password_confirmation: confirmPassword,
      })
      .then((resp) => {

        setsuccess(true);
        setTimeout(() => {
          setsuccess(false);
          props.navigation.replace("Login");
        }, 4000);
      })

      .catch((error) => {
        console.log(error.response.data);
        const err = {
          nom:
            error.response.data.nom !== undefined
              ? error.response.data.nom[0]
              : "",
          prenom:
            error.response.data.prenom !== undefined
              ? error.response.data.prenom[0]
              : "",
          email:
            error.response.data.email !== undefined
              ? error.response.data.email[0]
              : "",
          tel:
            error.response.data.tel !== undefined
              ? error.response.data.tel[0]
              : "",

          adresse:
            error.response.data.adresse !== undefined
              ? error.response.data.adresse[0]
              : "",
          password:
            error.response.data.password !== undefined
              ? error.response.data.password[0]
              : "",
        };
        setErrors(err);
        //console.log(errors);
      });
  };
  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => {
  //         setFont(true);
  //       }}
  //     ></AppLoading>
  //   );
  // }

  return (
    <ScrollView
      //  style={{ flexGrow: 1 }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.imgCnt}>
          <Image
            source={require("../assets/user.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode={"contain"}
          />
        </View>
        {success && (
          <View
            style={{
              backgroundColor: "#1df5a2",
              width: "95%",
              height: "6%",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                marginTop: 10,
                textAlign: "center",
                fontSize: 15,
                paddingBottom: 5,
                fontWeight: "bold",
              }}
            >
              compte crée avec succès,retourner vers la page de connection pour connecter
            </Text>
          </View>
        )}

        <View style={styles.form}>
          <Input
            placeHolder={"Nom"}
            iconName={"md-person"}
            onChangeText={(nom) => setNom(nom)}
          />
          {errors !== null ? (
            errors.nom ? (
              <Text style={styles.labelError}>{errors.nom}</Text>
            ) : (
                false
              )
          ) : (
              false
            )}

          <Input
            placeHolder={"Prenom"}
            iconName={"md-person"}
            onChangeText={(prenom) => setPrenom(prenom)}
          />
          {errors !== null ? (
            errors.prenom ? (
              <Text style={styles.labelError}>{errors.prenom}</Text>
            ) : (
                false
              )
          ) : (
              false
            )}
          <Input
            placeHolder={"Email"}
            iconName={"md-mail"}
            onChangeText={(email) => setEmail(email)}
          />
          {errors !== null ? (
            errors.email ? (
              <Text style={styles.labelError}>{errors.email}</Text>
            ) : (
                false
              )
          ) : (
              false
            )}
          <Input
            placeHolder={"Tel"}
            iconName={"ios-call"}
            onChangeText={(tel) => setTel(tel)}
          />
          {errors !== null ? (
            errors.tel ? (
              <Text style={styles.labelError}>{errors.tel}</Text>
            ) : (
                false
              )
          ) : (
              false
            )}
          <Input
            placeHolder={"Adresse"}
            iconName={"ios-pin"}
            onChangeText={(adresse) => setAdresse(adresse)}
          />
          {errors !== null ? (
            errors.adresse ? (
              <Text style={styles.labelError}>{errors.adresse}</Text>
            ) : (
                false
              )
          ) : (
              false
            )}
          <Input
            placeHolder={"Mot de passe"}
            iconName={"md-lock"}
            onChangeText={(pass) => setpassword(pass)}
          />
          {errors !== null ? (
            errors.password ? (
              <Text style={styles.labelError}>{errors.password}</Text>
            ) : (
                false
              )
          ) : (
              false
            )}
          <Input
            placeHolder={"Confirmer mot de passe"}
            iconName={"md-lock"}
            onChangeText={(pass) => setconfirmPassword(pass)}
          />

          <TouchableHighlight
            underlayColor="#1364e8"
            onPress={registerHandler}
            style={styles.signUp}
          >
            <Text style={styles.signUpText}>Registrer</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
RegisterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Registrer",
  };
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    //justifyContent:'center',
    flex: 1,
    padding: 7,
    backgroundColor: "white",
    //  backgroundColor: "rgb(240, 246, 251)",
  },
  imgCnt: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: "8%",
    borderRadius: 20,
  },

  button: {
    //margin: 8,
    alignItems: "flex-end",
    borderRadius: 17,
  },
  form: {
    borderRadius: 10,
    borderTopEndRadius: 15,
    padding: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  labelError: {
    textAlign: "center",
    color: "#f52a4f",
  },
  signUp: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: "21%",
    marginTop: 10,
    backgroundColor: "rgb(29, 112, 245)",
  },
  signUpText: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

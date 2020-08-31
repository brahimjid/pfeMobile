import React, { useEffect, useContext } from "react";
import { View, Image } from "react-native";
import { Spinner } from "@ui-kitten/components";
import Colors from "../const/Colors";
import AuthContext from "../Context/AuthContext";
import * as SecureStore from "expo-secure-store";

export default function LoadingScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    SecureStore.getItemAsync("user")
      .then((userString) => {
        if (userString) {
          userObject = JSON.parse(userString);
          setUser(userObject);

          if (userObject.type == 0) {
            navigation.navigate("Appstack");
          }
          if (userObject.type == 1) {
            navigation.navigate("Medecin");
          }
        } else navigation.navigate("Auth");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#5E72E4",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "50%",
        }}
      >
        <Image
          source={require("../assets/logo3.jpg")}
          style={{ width: "100%", height: "100%" }}
          resizeMode={"contain"}
        />
      </View>
      {/* <Spinner size="giant" status="control" backgroundColor={"white"} /> */}
    </View>
  );
}

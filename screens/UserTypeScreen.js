import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const UserTypeScreen = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <ImageBackground source={require("../assets/lo")} /> */}
      <View style={styles.itemCnt}>
        <View style={styles.medCnt}>
          <View style={styles.imgContainer}>
            <Image
              source={require("../assets/user.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode={"contain"}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.replace("Login")}
          >
            <Text style={styles.btnText}> Patient</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.medCnt}>
          <View style={styles.imgContainer}>
            <Image
              source={require("../assets/medLogo.jpg")}
              style={{
                width: "100%",
                height: "100%",
                //marginTop: 10,
              }}
              resizeMode={"contain"}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.replace("MedLogin")}
          >
            <Text style={styles.btnText}>Médecin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserTypeScreen;
const styles = StyleSheet.create({
  itemCnt: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  imgContainer: {
    width: "100%",
    height: "100%",
  },
  medCnt: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    width: "40%",
    height: "35%",
    marginBottom: 50,
    //elevation: 1,
    //borderWidth: 1,
    //borderColor: "red",
  },
  btn: {
    width: 140,
    height: 50,
    backgroundColor: "rgb(107, 161, 249)",
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
});

import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../Context/AuthContext";

const UserSelect = () => {
  const [userSelected, setUserSelected] = useState(true);
  const [medecinSelected, setMedecinSelected] = useState(false);
  const { login, isLoading, typeSet, userType } = useContext(AuthContext);

  return (
    <View style={styles.itemCnt}>
      <View style={styles.medCnt}>
        <View style={styles.imgContainer}>
          <Image
            source={require("../assets/user.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode={"contain"}
          />
        </View>
        <View></View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setUserSelected(true);
            setMedecinSelected(false);
            typeSet(0);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.btnText}> Patient</Text>
            {userSelected && (
              <View
                style={{
                  position: "absolute",
                  left: "46%",
                }}
              >
                <Ionicons name="ios-checkmark" size={50} color="white" />
              </View>
            )}
          </View>
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
          onPress={() => {
            setUserSelected(false);
            setMedecinSelected(true);
            typeSet(1);
          }}
        >
          <Text style={styles.btnText}>Médecin</Text>
          {medecinSelected && (
            <View
              style={{
                position: "absolute",
                right: 5,
              }}
            >
              <Ionicons name="ios-checkmark" size={50} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserSelect;

const styles = StyleSheet.create({
  itemCnt: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    //marginHorizontal: 5,
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
    //borderWidth: 1,
    // backgroundColor: "green",
    //elevation: 1,
    //borderWidth: 1,
    //borderColor: "red",
  },
  btn: {
    width: 140,
    height: 35,
    backgroundColor: "rgb(107, 161, 249)",
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
});

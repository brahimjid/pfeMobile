import React, { useState, useContext } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../const/Colors";
import AuthContext from "../../Context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.imgcontainer}>
        <Image
          source={require("../../assets/doctor.jpg")}
          style={styles.img}
          resizeMode="center"
        />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Dr Cheikh Mohamed</Text>
      </View>
      <View style={styles.itemCnt}>
        <View style={styles.item}>
          <View style={styles.ItemIcon}>
            <Ionicons name="md-person" size={28} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.itemTitle}>Modifier Profile</Text>
          </View>
          <TouchableOpacity
            style={styles.itemLink}
            onPress={() => {
              navigation.navigate("MedEditProfile");
            }}
          >
            <Ionicons name="ios-arrow-dropright" size={30} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemSep} />
        <View style={styles.item}>
          <View style={styles.ItemIcon}>
            <Ionicons name="ios-lock" size={28} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.itemTitle}>changer mot de passe</Text>
          </View>
          <TouchableOpacity
            style={styles.itemLink}
            onPress={() => navigation.navigate("MedChangePass")}
          >
            <Ionicons name="ios-arrow-dropright" size={30} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemSep} />
        <View style={styles.item}>
          <View style={styles.ItemIcon}>
            <Ionicons name="md-log-out" size={28} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.itemTitle}>Deconnecter</Text>
          </View>
          <TouchableOpacity
            style={styles.itemLink}
            onPress={() => {
              logout(() => {
                navigation.navigate("Auth");
              });
            }}
          >
            <Ionicons name="ios-arrow-dropright" size={30} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemSep} />
      </View>
    </View>
  );
};
ProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Profile",
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      >
        <Ionicons
          name="ios-menu"
          color="white"
          size={23}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  imgcontainer: {
    height: "20%",
    alignItems: "center",
    marginTop: 10,
  },

  img: {
    width: "100%",
    height: "70%",
    borderRadius: 15,
  },
  itemCnt: {
    flex: 1,
    marginVertical: "18%",
  },

  item: {
    width: "80%",
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: "10%",
    alignItems: "center",
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    //marginLeft: "10%",
  },
  ItemIcon: {
    marginRight: 10,
    marginLeft: 5,
    padding: 5,
  },
  itemLink: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    marginRight: 5,
    padding: 5,
  },
  itemSep: {
    height: 1,
    width: "80%",
    backgroundColor: "#ACADB4",
    marginLeft: "20%",
    marginBottom: 20,
  },
});
ProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: () => null,
  };
};
export default ProfileScreen;

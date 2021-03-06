import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Alert, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../const/Colors";
import axios from "../api/axios";
import AuthContext from "../Context/AuthContext";
import ImgUrl from "../const/ImgUrl";
import { Avatar } from "@ui-kitten/components";
import Colors from "../const/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ProfileScreen = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const [userNom, setUserNom] = useState("");
  const [img, setImg] = useState("");


  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get("/user")
      .then((response) => {
        // console.log(response.data);
        setUserNom(response.data.nom + " " + response.data.prenom);
        setImg(response.data.img);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <Avatar
          source={{ uri: `${ImgUrl.url}/${img}` }}

          size="giant"
          style={{
            // marginRight: 16,
            height: 120,
            width: 120,
          }}
        />
        <Text style={{ marginTop: 10 }}>{userNom}</Text>
      </View>
      <View style={styles.itemCnt}>
        <View style={styles.item}>
          <View style={styles.ItemIcon}>
            <Ionicons name="md-calendar" size={28} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.itemTitle}>Rendez-Vous</Text>
          </View>
          <TouchableOpacity
            style={styles.itemLink}
            onPress={() => navigation.navigate("RendezVous")}
          >
            <Ionicons name="ios-arrow-dropright" size={30} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemSep} />
        <View style={styles.item}>
          <View style={styles.ItemIcon}>
            <Ionicons name="md-person" size={28} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.itemTitle}>Modfier Profile</Text>
          </View>

          <TouchableOpacity
            style={styles.itemLink}
            onPress={() => navigation.navigate("EditProfile")}
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
            onPress={() => navigation.navigate("ChangePass")}
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
  confirmRes: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "40%",
    height: 40,
    marginLeft: "30%",
    backgroundColor: "rgb(40, 110, 224)",
    //marginVertical: 200,
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
export default ProfileScreen;

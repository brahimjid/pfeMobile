import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ImgUrl from "../const/ImgUrl";

export default function Card(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          //source={{ uri: `${ImgUrl.url}/${props.img}` }}
          source={require("../assets/doctor.jpg")}
          style={styles.img}
        />
        <View>
          {/* <Text style={{marginTop:10,fontSize:16}}>{props.medecin}</Text>  */}
        </View>
      </View>

      <View style={styles.info}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0759de" }}>
            {props.medecin}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, paddingTop: 5, fontWeight: "900" }}>
            {props.specialite}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, paddingTop: 5, fontWeight: "bold" }}>
            {props.structure}
          </Text>
        </View>
        <View>
          {/* <View>
            <Text>{props.date}</Text>
          </View> */}

          {/* <View> */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              //justifyContent: "center",
              //alignItems: "center",
            }}
          >
            <Ionicons
              style={{ marginVertical: 5 }}
              name="ios-pin"
              size={24}
              color="black"
            />
            <Text style={{ marginLeft: "8%", textAlignVertical: "center" }}>
              {props.adresse}
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
        <View style={{ width: "80%", height: "90%" }}>
          <TouchableOpacity
            title="Reserver"
            style={{
              //width: "100%",
              height: "55%",
              alignSelf: "stretch",
              paddingTop: 6,
              paddingBottom: 5,
              backgroundColor: "#4A5AD9",
              marginLeft: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={props.selectRes}
          >
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "bottom",
                // paddingTop: 5,
                color: "white",
                // marginTop: 3,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Réserver
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    margin: 5,
    flex: 1,
    width: "100%",
    height: "30%",
    elevation: 2.1,
    overflow: "hidden",
    backgroundColor: "white",
  },
  imgContainer: {
    width: "35%",
    height: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

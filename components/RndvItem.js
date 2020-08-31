import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const RndvItem = (props) => {
  return (
    <View style={styles.container} {...props}>
      <View style={styles.rndv}>
        <View styles={styles.date}>
          <Text style={styles.dateHeader}>{props.monthDay}</Text>
          <Text style={{ marginRight: 5 }}>{props.dayTime}</Text>
        </View>
        <View style={styles.rndvDt}>
          <View style={styles.rndvDtImgCont}>
            <Image
              source={require("../assets/doctor.jpg")}
              style={styles.rndvDtImg}
              //resizeMode="stretch"
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.medecin}>{props.medecinNom}</Text>
            <Text style={{ textAlign: "center" }}>{props.specialite}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //marginVertical: 20,
  },
  rndv: {
    flexDirection: "row",
    padding: 8,
    margin: 5,
    // marginBottom: 10,
    // flex: 1,
    width: "100%",
    height: "35%",
    minHeight: "15%",
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
  },
  rndvDt: {
    flexDirection: "row",
    elevation: 3.5,
    backgroundColor: "white",
    flex: 1,
    //width: "90%",
    padding: 1,
  },
  date: {
    borderWidth: 1,
    borderColor: "red",
    alignItems: "center",
  },
  info: {
    flex: 1,
    justifyContent: "space-around",
    //alignItems: "center",
    marginLeft: "5%",
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: "#0759de",
  },
  medecin: {
    //paddingLeft: 5,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#5079bf",
    marginBottom: 5,
    //backgroundColor: "red",
  },

  rndvDtImgCont: {
    width: "30%",
    height: "100%",
    // borderRadius: 10
  },
  rndvDtImg: { width: "100%", height: "100%" },
});
export default RndvItem;

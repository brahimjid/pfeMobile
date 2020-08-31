import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ConfirmReservation = (props) => {
  const medecin = props.navigation.getParam("medecin");
  const date = props.navigation.getParam("date");
  const time = props.navigation.getParam("time");
  const code = props.navigation.getParam("code");
  return (
    <View
      style={{
        height: "60%",
        width: "95%",
        // alignItems: "center",
        marginVertical: "20%",
        elevation: 2,
        //borderWidth: 1,
        // borderColor: "#09e5ab",
        marginHorizontal: 10,
      }}
    >
      <View style={styles.header}>
        <Ionicons name="ios-checkmark-circle" size={70} color="#09e5ab" />
        <Text style={styles.headerText}>Réservation succès</Text>
      </View>
      <View style={styles.details}>
        <Text style={{ fontSize: 14, fontWeight: "400" }}>
          Rendez-Vous Avec
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{medecin}</Text>
        <Text>Le </Text>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
          {date} {time}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            marginBottom: 5,
            textAlign: "center",
          }}
        >
          voter code :
        </Text>
        <View
          style={{
            borderWidth: 2,
            borderColor: "#09e5ab",
            padding: 5,
            bottom: -15,
            width: "50%",
            marginLeft: "25%",

            //  alignSelf: "stretch",
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
          >
            {code}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmReservation;
ConfirmReservation.navigationOptions = (navData) => {
  return {
    headerTitle: "Réservation",
  };
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  details: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

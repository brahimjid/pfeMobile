import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
//import { Ionicons } from "@expo/vector-icons";
//import { TouchableOpacity } from "react-native-gesture-handler";
import { Spinner, Avatar } from "@ui-kitten/components";
import axios from "../../api/axios";
import AuthContext from "../../Context/AuthContext";

const MedcinRndvTodayScreen = () => {
  const [rndvToday, setRndvToday] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  const renderHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 50,
        marginLeft: 20,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 14 }}>Patient</Text>

      <Text style={{ fontWeight: "bold", fontSize: 14 }}>Date</Text>
    </View>
  );
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    setDataLoaded(true);
    axios
      .get("/medecin/rndvsToday")
      .then((res) => {
        //console.log(res.data);
        setRndvToday(res.data);
        setDataLoaded(false);
      })
      .catch((err) => {
        console.log(err);
        setDataLoaded(false);
      });
  }, []);

  if (dataLoaded) {
    return (
      <View style={styles.spinner}>
        <Spinner size="giant" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{ backgroundColor: "white", flex: 1 }}> */}
      <View
        style={{
          marginHorizontal: 10,
          borderBottomColor: "#eee",
          justifyContent: "center",
        }}
      >
        <FlatList
          data={rndvToday}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                padding: 16,
                alignItems: "center",
                //justifyContent: "space-around",
              }}
            >
              <Avatar
                source={{
                  uri: "http://192.168.1.100:1234/storage/" + item.user.img,
                }}
                size="giant"
                style={{ marginRight: 16 }}
              />

              <Text
                category="s1"
                style={{
                  color: "#000",
                  marginRight: 0,
                }}
              >{`${item.user.nom} ${item.user.prenom}`}</Text>

              <View
                style={{
                  //  marginLeft: "39%",
                  position: "absolute",
                  marginLeft: "79%",
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {item.planning.date.substring(0, 5)}H
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
        />
      </View>
    </View>
  );
};

export default MedcinRndvTodayScreen;

const styles = StyleSheet.create({
  spinner: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
});

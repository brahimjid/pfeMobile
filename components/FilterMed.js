import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Spinner, Input, Avatar } from "@ui-kitten/components";
import axios from "../api/axios";

export default function FilterMed(props) {
  const [medecins, setMedecins] = useState([]);
  const [val, setVal] = useState("");
  const [idMed, setIdMed] = useState(null);
  const [medecinsHolder, setMedecinsHolder] = useState([]);
  const [DataLoaded, setDataLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const getMedecins = async () => {
      setDataLoaded(true);
      try {
        const responseData = await axios.get("/medecins");

        setMedecins(responseData.data);
        setMedecinsHolder(responseData.data);
      } catch (error) {
        console.log("faild to load medecins : " + error);
        setDataLoaded(false);
      }

      setDataLoaded(false);
    };
    getMedecins();
  }, []);
  const searchFilter = (text) => {
    setVal(text);
    //  console.log(medecinsHolder);

    const newData = medecinsHolder.filter((item) => {
      //console.log(item);
      const itemData = `${item.nom.toUpperCase()}   
    ${item.nom.toUpperCase()} ${item.prenom.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.startsWith(textData);
    });

    setMedecins(newData);
  };
  return (
    <View style={{ flex: 1, marginVertical: 50 }}>
      {/* <Text>hi</Text> */}
      <Modal isVisible={visible || props.visible} {...props}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <FlatList
            data={medecins}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => props.getMedId(item.id)}>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 16,
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    source={require("../assets/doctor.jpg")}
                    size="giant"
                    style={{ marginRight: 16 }}
                  />
                  <Text
                    category="s1"
                    style={{
                      color: "#000",
                    }}
                  >{`${item.nom} ${item.prenom}`}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            // ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={
              <View>
                <View
                  onPress={() => {}}
                  style={{
                    marginBottom: 20,
                    marginRight: 10,
                    marginTop: 10,

                    //right: -100,
                  }}
                >
                  <Ionicons
                    name="ios-arrow-round-down"
                    size={30}
                    style={{ textAlign: "center" }}
                    color="black"
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    //blurOnSubmit={false}
                    onChangeText={(text) => searchFilter(text)}
                    status="info"
                    placeholder="Chercher"
                    style={{
                      borderRadius: 25,
                      borderColor: "#282EEA",
                      backgroundColor: "#fff",
                    }}
                    textStyle={{ color: "#000" }}
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={val}
                  />
                </View>
              </View>
            }
            keyboardDismissMode={true}
          />
        </View>
      </Modal>
    </View>
  );
}

// const styles = StyleSheet.create({
//   //   backdrop: {
//   //     backgroundColor: "rgba(0, 0, 0, 0.6)",
//   //     flex: 1,
//   //   },
// });

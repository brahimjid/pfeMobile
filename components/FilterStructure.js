import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Spinner, Input, Avatar } from "@ui-kitten/components";
import axios from "../api/axios";

export default function FilterStructure(props) {
  const [structure, setStructure] = useState([]);
  const [structureHolder, setStructureHolder] = useState([]);
  const [val, setval] = useState("");
  const [DataLoaded, setDataLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  const searchFilter = (text) => {
    setval(text);

    const newData = structureHolder.filter((item) => {
      const itemData = `${item.nom.toUpperCase()}   
    ${item.nom.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setStructure(newData);
  };
  useEffect(() => {
    const getStructure = async () => {
      setDataLoaded(true);
      try {
        const responseData = await axios.get("/structure");

        setStructure(responseData.data);
        setStructureHolder(responseData.data);
      } catch (error) {
        console.log("faild to load medecins : " + error);
        setDataLoaded(false);
      }
      setDataLoaded(false);
    };
    getStructure();
  }, []);

  return (
    <View style={{ flex: 1, marginVertical: 50 }}>
      <Modal isVisible={props.visible} {...props}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <FlatList
            data={structure}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => props.getStrId(item.id)}>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 16,
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    source={{
                      uri: `http://192.168.1.100:1234/storage/${item.img}`,
                    }}
                    size="giant"
                    style={{ marginRight: 16 }}
                  />
                  <Text
                    category="s1"
                    style={{
                      color: "#000",
                    }}
                  >{`${item.nom}`}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View>
                <View
                  onPress={() => {}}
                  style={{
                    marginBottom: 20,
                    //marginRight: 10,
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
                    onChangeText={searchFilter}
                    status="info"
                    placeholder="Chercher"
                    style={{
                      borderRadius: 25,
                      borderColor: "#282EEA",
                      backgroundColor: "#fff",
                    }}
                    textStyle={{ color: "#000" }}
                    clearButtonMode="always"
                    value={val}
                  />
                </View>
              </View>
            }
            // ListFooterComponent={this.renderFooter}
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

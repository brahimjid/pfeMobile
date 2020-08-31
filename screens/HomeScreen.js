import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import axios from "../api/axios";
import Card from "../components/Card";
import { Spinner } from "@ui-kitten/components";
import FilterMed from "../components/FilterMed";
import FilterSpec from "../components/FilterSpec";
import FilterStructure from "../components/FilterStructure";
const HomeScreen = ({ navigation }) => {
  const [plannings, setPlannings] = useState([]);
  const [planningsHolder, setPlanningsHolder] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  let selectedMed = null;
  let selectedStr = null;
  let selectedSpec = null;

  const [selectedCmp, setSelectedCmp] = useState("");

  useEffect(() => {
    // console.log("eff");
    const getData = async () => {
      setDataLoaded(true);
      try {
        const responseData = await axios.get("/plannings");

        setPlannings(responseData.data);
        setPlanningsHolder(responseData.data);
        //console.log(responseData.data);
      } catch (error) {
        console.log(error);
        setDataLoaded(false);
      }
      setDataLoaded(false);
    };
    getData();
  }, []);

  function filterResults() {
    if (selectedMed != null) {
      const newData = planningsHolder.filter((item) => {
        return item.idMedecin == selectedMed;
      });
      setPlannings(newData);
    }

    //   : false;

    if (selectedStr !== null) {
      const newData = planningsHolder.filter((item) => {
        return item.idStructure == selectedStr;
      });
      setPlannings(newData);
    }
    if (selectedSpec !== null) {
      const newData = planningsHolder.filter((item) => {
        return item.medecin.specialite.id == selectedSpec;
      });
      setPlannings(newData);
    }
    if (selectedMed !== null && selectedStr !== null) {
      const newData = planningsHolder.filter((item) => {
        return item.idStructure == selectedStr && item.idMedecin == selectedMed;
      });
      setPlannings(newData);
    }

    // setPlannings(newData);
  }

  const getMedId = (id) => {
    selectedMed = id;
    filterResults();
    setModalVisible(false);
  };

  const getSpecId = (id) => {
    selectedSpec = id;
    setModalVisible(false);
    filterResults();
  };
  const getStrId = (id) => {
    selectedStr = id;
    setModalVisible(false);
    filterResults();
  };
  if (dataLoaded) {
    return (
      <View style={styles.spinner}>
        <Spinner size="giant" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.filterCt}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setSelectedCmp("Med");
          }}
          style={styles.button}
        >
          <View style={styles.filterItemContainer}>
            <Text style={styles.filterItemText}>Médecins</Text>
            <Ionicons
              name="md-arrow-dropdown"
              style={styles.filterIcon}
              size={24}
              color="white"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setSelectedCmp("Spec");
          }}
          style={styles.button}
        >
          <View style={styles.filterItemContainer}>
            <Text style={styles.filterItemText}>Spécialité</Text>
            <Ionicons
              name="md-arrow-dropdown"
              style={styles.filterIcon}
              size={24}
              color="white"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setSelectedCmp("Str");
          }}
          style={styles.button}
        >
          <View style={styles.filterItemContainer}>
            <Text style={styles.filterItemText}>Structure</Text>
            <Ionicons
              name="md-arrow-dropdown"
              style={styles.filterIcon}
              size={24}
              color="white"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginLeft: "3%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Ionicons name="md-options" size={25} color="white" />
        </TouchableOpacity>
      </View>
      {selectedCmp == "Spec" && modalVisible ? (
        <FilterSpec
          visible={modalVisible}
          getSpecId={getSpecId}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="down"
        />
      ) : selectedCmp == "Med" && modalVisible ? (
        <FilterMed
          visible={modalVisible}
          getMedId={getMedId}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="down"
        />
      ) : selectedCmp == "Str" && modalVisible ? (
        <FilterStructure
          getStrId={getStrId}
          visible={modalVisible}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="down"
        />
      ) : null}

      <FlatList
        initialNumToRender={3}
        keyExtractor={(item) => item.id.toString()}
        data={plannings}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            img={item.medecin.img}
            structure={item.medecin.structure.nom}
            adresse={item.medecin.structure.adresse}
            specialite={item.medecin.specialite.nom}
            // date={moment(item.date).format("LLLL")}
            medecin={`${item.medecin.nom} ${item.medecin.prenom}`}
            selectRes={() => {
              navigation.replace("Reservation", {
                medecin: `${item.medecin.nom} ${item.medecin.prenom}`,
                idPlanning: item.id,
                idMedecin: item.medecin.id,
              });
            }}
          />
        )}
      />
    </View>
  );
};
HomeScreen.navigationOptions = ({ navigation }) => {
  // console.log(navData);
  return {
    headerTitle: "Accueil",
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Ionicons
          name="md-menu"
          color="white"
          size={25}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#4E74D2",
  },
  spinner: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  filterCt: {
    backgroundColor: "#282Ead",
    borderWidth: 1,
    height: "8%",
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
  },
  filterItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  button: {
    height: 40,
    marginLeft: 6,
    borderRadius: 8,
    backgroundColor: "#4E74D2",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  filterItemText: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 18,
    color: "#FFFFFF",
  },
  filterIcon: {
    marginLeft: 10,
  },

  selectCnt: {
    backgroundColor: "white",
    width: "90%",
    flexDirection: "row",
    margin: 10,
    padding: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default HomeScreen;

import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RndvItem from "../components/RndvItem";
import axios from "../api/axios";
import Colors from "../const/Colors";
import AuthContext from "../Context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";

const RendezVousScreen = () => {
  const [rndv, setRndv] = useState([]);
  const [rndvToday, setRndvToday] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/user/rndvs/" + user.id)
      .then((res) => {
        //console.log(res.data);
        setRndv(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("/user/rndvsToday/" + user.id)
      .then((res) => {
        // console.log(res.data);
        setRndvToday(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={{ marginVertical: 20, flex: 1, backgroundColor: "#f8f9fa" }}>
      <View style={styles.rndvTcnt}>
        <View style={styles.rndvHeader}>
          <View style={styles.sideBorder} />
          <View>
            <Text
              style={{ marginHorizontal: 10, fontSize: 16, fontWeight: "700" }}
            >
              Rendez-Vous À venir
            </Text>
          </View>
          <View
            style={{ width: "30%", height: 2, backgroundColor: "#c3c7c8" }}
          ></View>
        </View>
        {rndvToday.length == 0 ? (
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            Aucun Rendez-Vous À venir
          </Text>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            {rndvToday.map((item) => (
              //{ dayName: d.format("ddd"), day: d.format("DD"), month: d.format("MMM") },
              <RndvItem
                monthDay={`${moment(item.date).format("DD")} ${moment(
                  item.date
                ).format("MMM")}`}
                dayTime={`${moment(item.date).format("ddd")} ${moment(
                  item.planning.date,
                  "HH:mm"
                ).format("HH:mm")}H`}
                style={{ maxHeight: 300, minHeight: 100, marginRight: 2 }}
                medecinNom={`${item.medecin.nom} ${item.medecin.prenom}`}
                specialite={item.medecin.specialite.nom}
                key={item.id}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.rndvAllHeader}>
        <View
          style={{ width: "30%", height: 1, backgroundColor: "#c3c7c8" }}
        ></View>
        <View>
          <Text
            style={{ marginHorizontal: 10, fontSize: 16, fontWeight: "bold" }}
          >
            Rendez-Vous Précédent
          </Text>
        </View>
        <View
          style={{ width: "30%", height: 1, backgroundColor: "#c3c7c8" }}
        ></View>
      </View>
      {rndv.length == 0 ? (
        <Text style={{ textAlign: "center", fontSize: 14 }}>
          Aucun Rendez-Vous Précédent
        </Text>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            //flex: 1,
          }}
        >
          {rndv.map((item) => (
            //{ dayName: d.format("ddd"), day: d.format("DD"), month: d.format("MMM") },
            <RndvItem
              monthDay={`${moment(item.date).format("DD")} ${moment(
                item.date
              ).format("MMM")}`}
              dayTime={`${moment(item.date).format("ddd")} ${moment(
                item.planning.date,
                "HH:mm"
              ).format("HH:mm")}H`}
              style={{
                maxHeight: 300,
                minHeight: 100,
                marginRight: 2,
              }}
              medecinNom={`${item.medecin.nom} ${item.medecin.prenom}`}
              specialite={item.medecin.specialite.nom}
              key={item.id}
            />
          ))}
        </ScrollView>
      )}

      {/* <FlatList
          data={rndv}
          scrollEnabled
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RndvItem
              monthDay={"october 10"}
              dayTime={"Jeudi 18H:00"}
              style={{ height: "60%" }}
              medecinNom={`${item.medecin.nom} ${item.medecin.prenom}`}
              specialite={item.medecin.specialite.nom}
              key={item.id}
            />
          )}
        /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  rndvTcnt: {
    maxHeight: "32%",
    height: "20%",
    minHeight: "15%",
  },
  rndvHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sideBorder: {
    width: "30%",
    height: 2,
    backgroundColor: "#c3c7c8",
  },
  rndvAllHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    marginBottom: 20,
    marginTop: 40,
  },
});
export default RendezVousScreen;

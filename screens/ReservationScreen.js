import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import axios from "../api/axios";
import locale from "moment/locale/fr";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../Context/AuthContext";

import {
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native-gesture-handler";

const ReservationScreen = (props) => {
  const medecin = props.navigation.getParam("medecin");
  const idMedecin = props.navigation.getParam("idMedecin");
  const idPlanning = props.navigation.getParam("idPlanning");

  const [weekDays, setWeekDays] = useState([]);
  const [next, setNext] = useState(true);
  const [previous, setPrevious] = useState(false);
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [rndvAvailable, setRndvAvailable] = useState(true);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const setStartDates = () => {
    setNext(true);
    setPrevious(false);
    let dataS = [
      {
        dayName: moment().format("ddd"),
        day: moment().format("DD"),
        month: moment().format("MMM"),
        color: false,
        fulldate: moment().format("YYYY-MM-DD"),
      },
    ];
    for (let i = 1; i <= 3; i++) {
      let d = moment().add(i, "d");
      dataS.push({
        dayName: d.format("ddd"),
        day: d.format("DD"),
        month: d.format("MMM"),
        color: false,
        fulldate: d.format("YYYY-MM-DD"),
      });
      setWeekDays(dataS);
    }
  };

  const setEndDates = () => {
    setNext(false);
    setPrevious(true);
    let d = moment().add(4, "d");
    let dates = [
      {
        dayName: d.format("ddd"),
        day: d.format("DD"),
        month: d.format("MMM"),
        fulldate: d.format("YYYY-MM-DD"),
      },
    ];
    for (let i = 1; i <= 2; i++) {
      d.add(1, "d");
      dates.push({
        dayName: d.format("ddd"),
        day: d.format("DD"),
        month: d.format("MMM"),
        fulldate: d.format("YYYY-MM-DD"),
      });
    }
    setWeekDays(dates);
  };
  const handeleSelected = (index, date) => {
    const weekD = [...weekDays];
    weekD[index].color = !weekD[index].color;
    setWeekDays(weekD);
    for (let i = 0; i < weekDays.length; i++) {
      weekDays[i].color = false;
      if (i == index) {
        weekDays[index].color = true;
      }
    }

    axios
      .post("/checkRndv", { idPlanning })
      .then((res) => {
        if (res.data == true) {
          setRndvAvailable(false);
          return;
        }
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 3000);
        //console.log("no");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setStartDates();
  }, []);

  const submitReservation = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    setLoading(true);
    axios

      .post("/submitRes", {
        idMedecin,
        idPlanning,
        res_date: selectedDate,
      })
      .then((resp) => {
        setLoading(false);
        // console.log(resp.data);
        props.navigation.navigate("ConfirmRes", {
          medecin,
          code: resp.data.rndvCode,
          date: resp.data.rndvDate,
          time: resp.data.rndvTime,
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.docInfo}>
        <View style={{ borderRadius: 5, width: "100%", height: "100%" }}>
          <Image
            source={require("../assets/doctor.jpg")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <View
          style={{
            justifyContent: "center",
            width: 200,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              // marginLeft: "5%",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {medecin}
          </Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <View style={styles.dateHeaderContainer}>
          {previous && (
            <TouchableOpacity onPress={setStartDates}>
              <Ionicons
                name="ios-arrow-dropleft"
                style={{
                  justifyContent: "center",
                  paddingVertical: 4,
                  marginRight: 5,
                }}
                size={33}
                color="black"
              />
            </TouchableOpacity>
          )}
          <View style={styles.dateHeader}>
            {weekDays.map((data) => (
              <View key={data.day}>
                <View style={{ alignItems: "center", paddingBottom: 2 }}>
                  <Text style={{ fontSize: 20 }}>
                    {data.dayName.toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text>
                    {data.day} {data.month}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {next && (
            <TouchableOpacity onPress={setEndDates}>
              <Ionicons
                name="ios-arrow-dropright"
                style={{
                  justifyContent: "center",
                  paddingVertical: 6,
                  marginLeft: 10,
                }}
                size={33}
                color="black"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.timeContainer}>
          {weekDays.map((data, index) => (
            <View style={styles.timeContainerItem} key={data.day}>
              <TouchableOpacity
                key={data.day}
                onPress={() => {
                  setText("09:00");
                  setSelectedDate(data.fulldate);
                  handeleSelected(index, data.fulldate);
                }}
              >
                <Text
                  style={[
                    { fontSize: 18, fontWeight: "bold" },
                    data.color && text == "09:00"
                      ? { color: "#20c0f3" }
                      : { color: "black" },
                  ]}
                  key={data.day}
                >
                  09:00
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.timeContainer}>
          {weekDays.map((data, index) => (
            <View style={styles.timeContainerItem} key={data.day}>
              <TouchableOpacity
                onPress={() => {
                  setText("16:00");
                  setSelectedDate(data.fulldate);
                  handeleSelected(index, data.fulldate);
                }}
              >
                <Text
                  style={[
                    { fontSize: 18, fontWeight: "bold" },
                    data.color && text == "16:00"
                      ? { color: "#20c0f3" }
                      : { color: "black" },
                  ]}
                  key={data.day}
                >
                  16:00
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {err && (
        <View style={styles.errCnt}>
          <Text style={styles.errTxt}>
            Pas de place disponible , essayer une autre date
          </Text>
        </View>
      )}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="rgb(107, 161, 249)"
          style={{ bottom: 110, position: "absolute", marginLeft: "32%" }}
        ></ActivityIndicator>
      ) : (
        <TouchableHighlight
          style={[
            styles.confirmRes,
            rndvAvailable ? styles.disabled : styles.enabled,
          ]}
          disabled={rndvAvailable}
          underlayColor="#1364e8"
          onPress={submitReservation}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Confirmer</Text>
        </TouchableHighlight>
      )}
    </View>
  );
};
ReservationScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.navigate("Home");
        }}
      >
        <Ionicons
          name="ios-arrow-round-back"
          color="white"
          size={33}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerTitle: "Réservation",
  };
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
  },
  dateContainer: {
    elevation: 2.5,
    margin: 5,
    padding: 5,
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "60%",
    flex: 1,
    padding: 5,
  },
  dateHeaderContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    height: "100%",
    marginLeft: 2,
    marginTop: 4,
  },
  timeContainerItem: {
    borderWidth: 1,
    borderColor: "#20c0f3",
    margin: 5,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timeContainerItemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  docInfo: {
    flexDirection: "row",
    width: "30%",
    height: "15%",
    marginVertical: 15,
    marginLeft: "20%",
  },
  confirmRes: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "60%",
    height: 50,
    marginLeft: "20%",
    backgroundColor: "rgb(40, 110, 224)",
    marginVertical: 200,
  },
  disabled: {
    opacity: 0.7,
    //backgroundColor: "#95b7ed",
  },
  enabled: {
    backgroundColor: "rgb(40, 110, 224)",
  },
  errCnt: {
    marginTop: "20%",
    height: "10%",
    width: "95%",
    marginLeft: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#f32437",
  },
  errTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "5%",
  },
});

export default ReservationScreen;

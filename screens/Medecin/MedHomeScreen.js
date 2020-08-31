import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Spinner, Avatar } from "@ui-kitten/components";
import axios from "../../api/axios";
import AuthContext from "../../Context/AuthContext";
import MedcinnRndvToday from "../../components/MedcinnRndvToday";

export default function MedHomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MedcinnRndvToday />
    </View>
  );
}
MedHomeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: () => null,
  };
};
const styles = StyleSheet.create({});

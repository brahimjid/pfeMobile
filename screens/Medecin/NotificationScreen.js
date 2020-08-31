import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotificationScreen() {
  return (
    <View>
      <Text>Notifiaction screen</Text>
    </View>
  );
}
NotificationScreen.navigationOptions = (navData) => {
  return {
    headerTitle: () => null,
  };
};
const styles = StyleSheet.create({});

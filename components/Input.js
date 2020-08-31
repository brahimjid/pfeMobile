import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { FontAwesome, EvilIcons, Ionicons } from "@expo/vector-icons";

const Input = (props) => {
  return (
    <View style={styles.inpI}>
      <Ionicons
        name={props.iconName}
        size={23}
        color="rgb(107, 161, 249)"
        style={{
          margin: 10,
        }}
      />
      <TextInput
        placeholder={props.placeHolder}
        style={styles.emailInput}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inpI: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#fff',
    borderBottomWidth: 0.9,
    borderColor: "rgb(107, 161, 249)",
    height: 45,
    // borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    borderRadius: 14,
    //borderColor: "rgb(107, 161, 249)",
  },
  emailInput: {
    flex: 1,
    paddingLeft: 10,
  },
});

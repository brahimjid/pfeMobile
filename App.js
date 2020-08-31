import "react-native-gesture-handler";
import React from "react";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import AppNavigator from "./Navigation/AppNavigator";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ApplicationProvider>
  );
}

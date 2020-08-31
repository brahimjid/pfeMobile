import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "../api/axios";
import { NavigationContext } from "@react-navigation/native";

const AuthMedContext = React.createContext();

export const AuthMedProvider = ({ children }) => {
  const [medecin, setMedecin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthMedContext.Provider
      value={{
        medecin,
        isLoading,
        setMedecin,
        login: (email, password, callback) => {
          setIsLoading(true);
          axios
            .post("/medecin", {
              email,
              password,
              device_name: "mobile",
            })
            .then((response) => {
              console.log(response.data);
              const medecinResponse = {
                email: response.data.medecin.email,
                token: response.data.token,
                id: response.data.medecin.id,
              };
              setMedecin(medecinResponse);
              //setError(null);
              SecureStore.setItemAsync(
                "medecin",
                JSON.stringify(medecinResponse)
              );
              setIsLoading(false);
              callback();
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
              //   const key = Object.keys(error.response.data.errors)[0];
              //   setError(error.response.data.errors[key][0]);
            });
          // console.log("is loading " + isLoading);
        },
        logout: (callback) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${medecin.token}`;

          axios
            .post("medecin/logout")
            .then((response) => {
              setMedecin(null);
              SecureStore.deleteItemAsync("medecin");
              callback();
            })
            .catch((error) => {
              console.log(error.response);
            });
        },
      }}
    >
      {children}
    </AuthMedContext.Provider>
  );
};
export default AuthMedContext;

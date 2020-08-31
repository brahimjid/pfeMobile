import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "../api/axios";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const typeSet = (type) => {
    setUserType(type);
  };

  const userSetHandler = (user) => {
    setUser(user);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        userSetHandler,
        userType,
        isLoading,
        errors,
        setUser,
        typeSet,
        login: (email, password, callback) => {
          setIsLoading(true);
          url = userType == 0 ? "/sanctum/token" : "/medecin/login";
          axios
            .post(url, {
              email,
              password,
              device_name: "mobile",
            })
            .then((response) => {
              // console.log(response.data);
              const userResponse = {
                email: response.data.user.email,
                token: response.data.token,
                id: response.data.user.id,
                nom: response.data.user.nom,
                prenom: response.data.user.prenom,
                tel: response.data.user.tel,
                adresse: response.data.user.adresse,
                type: userType,
              };
              setUser(userResponse);
              setErrors(null);
              SecureStore.setItemAsync("user", JSON.stringify(userResponse));
              //console.log("type" + userType);
              SecureStore.setItemAsync("userType", JSON.stringify(userType));
              setIsLoading(false);
              callback();
            })

            .catch((error) => {
              setIsLoading(false);
              //console.log(error.response);
              const err = {
                email:
                  error.response.data.errors["email"] !== undefined
                    ? error.response.data.errors["email"][0]
                    : "",
                password:
                  error.response.data.errors["password"] !== undefined
                    ? error.response.data.errors["password"][0]
                    : "",
                incorrectLogin:
                  error.response.data.errors["incorrectLogin"] !== undefined
                    ? error.response.data.errors["incorrectLogin"][0]
                    : "",
              };
              setErrors(err.response);
            });

          // console.log("is loading " + isLoading);
        },
        logout: (callback) => {
          url = userType == 0 ? "user/logout" : "/medecin/logout";

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          axios
            .post(url)
            .then(() => {
              setUser(null);
              SecureStore.deleteItemAsync("user");
              callback();
            })
            .catch((error) => {

              console.log(error.response);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

import React from "react";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
//import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ConfirmReservation from "../screens/ConfirmReservation";
import LoadingScreen from "../screens/LoadingScreen";

// user
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePassScreen from "../screens/ChangePassScreen";
import RendezVousScreen from "../screens/RendezVousScreen";
import ReservationScreen from "../screens/ReservationScreen";

// Medecin
import MedNotificationScreen from "../screens/Medecin/NotificationScreen";
import MedLoginScreen from "../screens/Medecin/MedLogInScreen";
import MedRndvScreen from "../screens/Medecin/MedRndvScreen";
import MedProfileScreen from "../screens/Medecin/MedProfileScreen";
import MedEditProfileScreen from "../screens/Medecin/MedEditProfileScreen";
import MedChangePassScreen from "../screens/Medecin/MedChangePassScreen";
import MedcinRndvTodayScreen from "../screens/Medecin/MedRndvTodayScreen";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const authStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  MedLogin: MedLoginScreen,
});

const AppScreens = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Reservation: ReservationScreen,
    ConfirmRes: ConfirmReservation,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#282EEA",
      },
      headerTintColor: "white",
    },
  }
);

// const medNotificationStack = createStackNavigator(
//   {
//     Notification: MedNotificationScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: "#282EEA",
//       },
//     },
//   }
// );
const medProfileStack = createStackNavigator(
  {
    Profile: MedProfileScreen,
    MedEditProfile: MedEditProfileScreen,
    MedChangePass: MedChangePassScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#282EEA",
      },
    },
  }
);
const MedTopTabNavigator = createMaterialTopTabNavigator(
  {
    Ajourdhui: {
      screen: MedcinRndvTodayScreen,
      navigationOptions: { title: "Aujourd'hui" },
    },

    Tous: MedRndvScreen,
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#F8F8F8",
      style: {
        backgroundColor: "#282EEA",
      },
      labelStyle: {
        textAlign: "center",
      },
      indicatorStyle: {
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 2,
      },
    },
  }
);

const MedBootomNavigator = createBottomTabNavigator(
  {
    Accueil: {
      screen: createStackNavigator(
        {
          Consultations: MedTopTabNavigator,
        },
        {
          defaultNavigationOptions: {
            headerStyle: {
              backgroundColor: "#282EEA",
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
          },
        }
      ),
      navigationOptions: {
        tabBarIcon: (tabinfo) => {
          return (
            <Ionicons name="md-home" size={24} color={tabinfo.tintColor} />
          );
        },
      },
    },
    Profile: {
      screen: medProfileStack,
      navigationOptions: {
        tabBarIcon: (tabinfo) => {
          return (
            <Ionicons name="ios-person" size={24} color={tabinfo.tintColor} />
          );
        },
      },
    },
    // Notification: {
    //   screen: medNotificationStack,
    //   navigationOptions: {
    //     tabBarIcon: (tabinfo) => {
    //       return (
    //         <Ionicons
    //           name="ios-notifications"
    //           size={24}
    //           color={tabinfo.tintColor}
    //         />
    //       );
    //     },
    //   },
    // },
  },
  {
    tabBarOptions: {
      activeTintColor: "#5E72E4",
      labelStyle: { color: "black", fontSize: 11, fontWeight: "bold" },
    },
  }
);
const profileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    RendezVous: RendezVousScreen,
    ChangePass: ChangePassScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#282EEA",
      },
      headerTintColor: "white",
    },
  }
);

const DrawerNav = createDrawerNavigator({
  Acceuil: AppScreens,
  Profile: profileNavigator,
});
const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    Auth: authStack,
    Appstack: DrawerNav,
    Medecin: MedBootomNavigator,
  },
  { initialRouteName: "AuthLoading" }
);

profileNavigator.navigationOptions = ({ navigation }) => {
  return {
    drawerIcon: (drawerConfig) => (
      <FontAwesome5 name="user-cog" size={23} color={drawerConfig.tintColor} />
    ),
  };
};

AppScreens.navigationOptions = ({ navigation }) => {
  let routeName = navigation.state.routes[navigation.state.index].routeName;
  let drawerLockMode = "unlocked";
  if (routeName == "Login" || routeName == "Register") {
    drawerLockMode = "locked-closed";
  }

  return {
    drawerLockMode,

    drawerIcon: (drawerConfig) => (
      <Ionicons name="md-home" size={23} color={drawerConfig.tintColor} />
    ),
    drawerLabel: "Accueil",
  };
};
export default createAppContainer(MainNavigator);

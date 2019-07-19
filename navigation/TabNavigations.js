import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import Home from "../screens/Home";
import Search from "../screens/Search";
import Upload from "../screens/Upload";
import Activity from "../screens/Activity";
import Profile from "../screens/Profile";

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({focused}) => <Ionicons style={{marginTop: 8}} name="ios-home" size={28} />
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({focused}) => <Ionicons style={{marginTop: 8}} name="ios-search" size={28} />
    }
  },
  Upload: {
    screen: Upload,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({focused}) => (
        <Ionicons
        style={{marginTop: 8}} name="ios-add-circle" size={28} />
      )
    }
  },
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({focused}) => (
        <Ionicons
        style={{marginTop: 8}} name={ focused ? "ios-heart" : "ios-heart-empty"} size={28} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({focused}) => (
        <Ionicons
          name="ios-person" size={28} style={{marginTop: 8}}/>
      )
    }
  },
});

export default createAppContainer(TabNavigator);

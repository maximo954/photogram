import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import {
  HomeNavigation,
  SearchNavigation,
  PostNavigation,
  ActivityNavigation,
  ProfileNavigation
} from "./StackNavigation";

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigation,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => (
        <Ionicons style={{ marginTop: 8 }} name="ios-home" size={28} />
      )
    }
  },
  Search: {
    screen: SearchNavigation,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => (
        <Ionicons style={{ marginTop: 8 }} name="ios-search" size={28} />
      )
    }
  },
  Post: {
    screen: PostNavigation,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => (
        <Ionicons style={{ marginTop: 8 }} name="ios-add-circle" size={28} />
      )
    }
  },
  Activity: {
    screen: ActivityNavigation,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => (
        <Ionicons
          style={{ marginTop: 8 }}
          name={focused ? "ios-heart" : "ios-heart-empty"}
          size={28}
        />
      )
    }
  },
  Profile: {
    screen: ProfileNavigation,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => (
        <Ionicons name="ios-person" size={28} style={{ marginTop: 8 }} />
      )
    }
  }
});

export default createAppContainer(TabNavigator);

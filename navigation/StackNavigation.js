import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import PostScreen from "../screens/Post";
import ActivityScreen from "../screens/Activity";
import ProfileScreen from "../screens/Profile";
import CameraScreen from "../screens/CameraUpload";
import MapScreen from "../screens/Map";
import EditScreen from "../screens/Signup";

export const HomeNavigation = createAppContainer(
  createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "PhotoGram",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            <Ionicons style={{ marginLeft: 10 }} name="ios-camera" size={30} />
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => alert("Message")}>
            <Ionicons style={{ marginRight: 10 }} name="ios-send" size={30} />
          </TouchableOpacity>
        )
      })
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        header: null
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Map View",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={{ marginLeft: 10 }} name="ios-arrow-back" size={30} />
          </TouchableOpacity>
        )
      })
    }
  })
);

HomeNavigation.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.routes.some(route => route.routeName === 'Camera')) {
    tabBarVisible = false
  }
  if (navigation.state.routes.some(route => route.routeName === 'Map')) {
    tabBarVisible = false
  }
  return {
    tabBarVisible,
  }
}

export const SearchNavigation = createAppContainer(
  createStackNavigator({
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: "Search"
      }
    }
  })
);

export const PostNavigation = createAppContainer(
  createStackNavigator({
    Post: {
      screen: PostScreen,
      navigationOptions: {
        title: "Post"
      }
    }
  })
);

export const ActivityNavigation = createAppContainer(
  createStackNavigator({
    Activity: {
      screen: ActivityScreen,
      navigationOptions: {
        title: "Activity"
      }
    }
  })
);

export const ProfileNavigation = createAppContainer(
  createStackNavigator({
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profile"
      }
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Profile",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={{ marginLeft: 10 }} name="ios-arrow-back" size={30} />
          </TouchableOpacity>
        )
      })
    }
  })
);


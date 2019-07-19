import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import TabNavigator from "./TabNavigations";
import AuthNavigation from "./AuthNavigation";

const Navigation = createSwitchNavigator(
  {
    Home: {
      screen: TabNavigator
    },
    Auth: {
      screen: AuthNavigation
    }
  },
  {
    initialRouteName: "Auth"
  }
);

export default createAppContainer(Navigation);

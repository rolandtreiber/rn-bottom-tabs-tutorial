import React from 'react';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';
import MyCustomIconSet from './src/assets/fonts/MyIconSet.ttf'
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import BottomTabNavigator from "./src/navigators/BottomTabNavigatorStyle2";

const Stack = createStackNavigator()

export default function App() {
  let [fontsLoaded] = useFonts({
    'MyCustomIconSet': MyCustomIconSet,
  });

  if (!fontsLoaded) {
    return <AppLoading/>;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="Navigation">
          <Stack.Screen
            name={"Navigation"}
            component={BottomTabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

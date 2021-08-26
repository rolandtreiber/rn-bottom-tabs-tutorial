import React, {useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Animated, TouchableHighlight} from "react-native";
import Screen from "../screens/GenericScreen";
import styled from "styled-components/native";
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';
import MyCustomIconSet from '../assets/fonts/MyIconSet.ttf'

const Tab = createBottomTabNavigator()

const BottomTabNavigatorStyle1 = () => {
  const [focusedTab, setFocusedTab] = useState(1)

  const colors = [
    useState(new Animated.Value(1))[0],
    useState(new Animated.Value(0))[0],
    useState(new Animated.Value(0))[0],
    useState(new Animated.Value(0))[0],
    useState(new Animated.Value(0))[0]
  ];

  const sizes = [
    useState(new Animated.Value(40))[0],
    useState(new Animated.Value(28))[0],
    useState(new Animated.Value(28))[0],
    useState(new Animated.Value(28))[0],
    useState(new Animated.Value(28))[0]
  ]

  useEffect(() => {
    colors.forEach((c, index) => {
      let value = focusedTab === index ? 1 : 0
      Animated.timing(c, {
        toValue: value,
        duration: 200,
        useNativeDriver: false
      }).start()
    })
    sizes.forEach((s, index) => {
      let value = focusedTab === index ? 40 : 28
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false
      }).start()
    })
  }, [focusedTab])

  const bgColorAnimation = (c) => c.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(74,74,74)", "rgb(224,82,99)"]
  })

  let [fontsLoaded] = useFonts({
    'MyCustomIconSet': MyCustomIconSet,
  });

  const icons = {
    carrot: "",    // &#xe900;
    tea: "",       // &#xe901;
    coffee: "",    // &#xe902;
    pineapple: "", // &#xe903;
    cherries: "",  // &#xe904;
  }

  if (!fontsLoaded) {
    return <AppLoading/>;
  } else {

    const IconWrapper = styled(Animated.View)`
      display: flex;
      flex: 1;
      flex-direction: column;
      align-self: stretch;
      justify-content: center;
      border-radius: 5px;
    `

    const Icon = styled(Animated.Text)`
      font-family: "MyCustomIconSet";
      color: white;
      text-align: center;
      color: ${props => props.color};
    `

    const TabBarBg = styled.View`
      background-color: #4a4a4a;
      display: flex;
      flex: 1;
    `

    const pages = [
      {
        title: "Carrot Screen",
        icon: icons.carrot
      },
      {
        title: "Cherry Screen",
        icon: icons.cherries
      },
      {
        title: "Coffee Screen",
        icon: icons.coffee
      },
      {
        title: "Pineapple Screen",
        icon: icons.pineapple
      },
      {
        title: "Tea Screen",
        icon: icons.tea
      }
    ]

    return <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {position: 'absolute'},
      tabBarBackground: () => (
        <TabBarBg/>
      ),
    }}>
      {pages.map((page, index) => (
        <Tab.Screen name={page.title}
                    options={{
                      tabBarIcon: ({focused}) => <IconWrapper
                        style={{backgroundColor: bgColorAnimation(colors[index])}}><Icon
                        style={{fontSize: sizes[index]}}
                        color={focused ? "black" : "white"}>{page.icon}</Icon></IconWrapper>
                    }}
                    listeners={{
                      tabPress: e => {
                        setFocusedTab(index)
                      },
                    }}>
          {props => <Screen {...props} title={page.title}/>}
        </Tab.Screen>)
      )}
    </Tab.Navigator>
  }
}

export default BottomTabNavigatorStyle1

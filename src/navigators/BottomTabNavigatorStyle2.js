import React, {useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Animated, TouchableHighlight} from "react-native";
import Screen from "../screens/GenericScreen";
import styled from "styled-components/native";
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';
import MyCustomIconSet from '../assets/fonts/MyIconSet.ttf'

const Tab = createBottomTabNavigator()

const BottomTabNavigatorStyle2 = () => {
  const [focusedTab, setFocusedTab] = useState(1)
  const mappable = [0, 1, 2, 3, 4]

  const colors = mappable.map((item, index) => {
    return useState(index === focusedTab ? new Animated.Value(1) : new Animated.Value(0))[0]
  })

  const iconSizes = mappable.map((item, index) => {
    return useState(index === focusedTab ? new Animated.Value(40) : new Animated.Value(28))[0]
  })

  const boxSizes = mappable.map((item, index) => {
    return useState(index === focusedTab ? new Animated.Value(70) : new Animated.Value(50))[0]
  })

  const topMargins = mappable.map((item, index) => {
    return useState(index === focusedTab ? new Animated.Value(-45) : new Animated.Value(-10))[0]
  })

  useEffect(() => {
    colors.forEach((c, index) => {
      let value = focusedTab === index ? 1 : 0
      Animated.timing(c, {
        toValue: value,
        duration: 200,
        useNativeDriver: false
      }).start()
    })
    iconSizes.forEach((s, index) => {
      let value = focusedTab === index ? 40 : 28
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false
      }).start()
    })
    boxSizes.forEach((s, index) => {
      let value = focusedTab === index ? 70 : 50
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false
      }).start()
    })
    topMargins.forEach((s, index) => {
      let value = focusedTab === index ? -45 : -10
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false
      }).start()
    })
  }, [focusedTab])

  const bgColorAnimation = (c) => c.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(74,74,74)", "rgb(82,224,84)"]
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

    const TabWrapper = styled.View`
      display: flex;
      flex: 1;
      flex-direction: row;
      align-self: stretch;
      justify-content: center;
      align-content: center;
    `

    const IconWrapper = styled(Animated.View)`
      position: relative;
      width: 70px;
      height: 70px;
      justify-content: center;
      margin-top: -10px;
      border-radius: 35px;
    `

    const Icon = styled(Animated.Text)`
      font-family: "MyCustomIconSet";
      color: white;
      padding: 10px;
      text-align: center;
      color: ${props => props.color};
    `

    const TabBarBg = styled.View`
      background-color: #eaeaea;
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
                      tabBarIcon: ({focused}) => <TabWrapper>
                        <IconWrapper style={{
                          backgroundColor: bgColorAnimation(colors[index]),
                          marginTop: topMargins[index],
                          width: boxSizes[index],
                          height: boxSizes[index]
                        }}>
                          <Icon style={{fontSize: iconSizes[index]}}
                                color={focused ? "black" : "white"}>{page.icon}</Icon>
                        </IconWrapper>
                      </TabWrapper>
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

export default BottomTabNavigatorStyle2

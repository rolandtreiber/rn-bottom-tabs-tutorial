import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import styled from "styled-components/native";
import MyCustomIconSet from './src/assets/fonts/MyIconSet.ttf'

export default function App() {
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
      return <AppLoading />;
  } else {

    const Container = styled.View`
      flex: 1;
      align-items: center;
      justify-content: center;
    `

    const Row = styled.View`
      flex-direction: row;
    `

    const LargeText = styled.Text`
      font-size: 24px;
    `

    const Note = styled.Text`
      font-size: 12px;
      color: gray;
      text-align: center;
      padding:10px;
    `    

    const LargeIcon = styled.Text`
      color: ${props => props.color};
      font-family: "MyCustomIconSet";
      font-size: 42px;
      padding: 5px;
    `

    return (
      <Container>
        <Row>
          <LargeText>
            Custom Icons
          </LargeText>
        </Row>
        <Row>
          <LargeIcon color='orange'>{icons.carrot}</LargeIcon>
          <LargeIcon color='green'>{icons.tea}</LargeIcon>
          <LargeIcon color='brown'>{icons.coffee}</LargeIcon>
          <LargeIcon color='orange'>{icons.pineapple}</LargeIcon>
          <LargeIcon color='red'>{icons.cherries}</LargeIcon>
        </Row>
        <Row>
          <Note>
            You can assign color to them just like you would with any other text. Sweet :)
          </Note>
        </Row>        
      </Container>
    );
  }
}

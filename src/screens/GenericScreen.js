import React from "react";
import {Container, LargeText} from "./partials/Common";

const GenericScreen = ({title}) => {
  return (
    <Container>
      <LargeText>{title}</LargeText>
    </Container>
  )
}

export default GenericScreen

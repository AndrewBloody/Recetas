/* ALAKASAM 2019 */

import React from 'react';

import {Icon, Header, Body, Button, Title, Left} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';

export const HeaderComponent = props => (
  <Header>
    <Left>
      <Button transparent>
        <Icon
          ios="ios-menu"
          android="md-menu"
          onPress={() =>
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
        />
      </Button>
    </Left>
    <Body>
      <Title>Recetas</Title>
    </Body>
  </Header>
);

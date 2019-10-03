/* ALAKASAM 2019 */

import React from 'react';

import {Input as InputForm, Item, Text, Label} from 'native-base';

export const Input = ({
  input,
  label,
  type,
  placeholder,
  meta: {touched, error, warning},
}) => {
  var hasError = false;
  if (error !== undefined) {
    hasError = true;
  }
  return (
    <Item error={hasError} floatingLabel>
      <Label>{placeholder}</Label>
      <InputForm {...input} />
      {hasError ? <Text>{error}</Text> : <Text />}
    </Item>
  );
};

import React from 'react';
import { TextInputProps } from 'react-native';
import {
  NativeViewGestureHandlerProps,
  TextInput,
} from 'react-native-gesture-handler';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Field = (
  props: JSX.IntrinsicAttributes &
    TextInputProps &
    NativeViewGestureHandlerProps &
    React.RefAttributes<React.ComponentType<any>>,
) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: '#f0f',
        paddingHorizontal: 10,
        height: 42,
        width: '78%',
        marginVertical: 10,
        backgroundColor: '#F7F3E3',
      }}
      placeholderTextColor="green"
    />
  );
};

export default Field;

import { StatusBar } from 'expo-status-bar';
// There are already created some components that can be translated to a native component (ios, android)
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    // <View /> = <div /> in React web
    <View style={styles.container}>
      {/* <Text /> text component */}
      <Text>Hello React Native!!</Text>
      <Button title="Send 1" />
      <Button title="Send 2" />
      <Button title="Send 3" />
      {/* Control the phone's StatusBar -> top bar */}
      <StatusBar style="auto" />
    </View>
  );
}

//Creating a interface to props
interface ButtonProps {
  title: string;
}

// Creating a reusable component:
function Button(props: ButtonProps) {
  return (
    // Turn the area as clickable -> when this component is clicked, it active a opacity
    <TouchableOpacity>
      <Text>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

// CSS in JS
const styles = StyleSheet.create({
  container: {
    // display: 'flex' is default in RN
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

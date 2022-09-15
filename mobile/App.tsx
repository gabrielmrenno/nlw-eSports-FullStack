import { StatusBar, Text } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import { Home } from './src/screens/Home'

import { Background } from './src/components/Background'
import { Loading } from './src/components/Loading'

export default function App() {

  // fontsLoaded is true if the font is loaded
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      {/* To set Status bar as transparent with background of our App*/}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Home /> : <Loading />}
    </Background>
  );
}
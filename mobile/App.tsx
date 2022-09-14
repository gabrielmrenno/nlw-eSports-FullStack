import { StatusBar } from 'react-native';
import { Background } from './src/components/Background'

export default function App() {
  return (
    <Background>
      {/* To set Status bar as transparent with background of our App*/}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </Background>
  );
}
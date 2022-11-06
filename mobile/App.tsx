import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { Loading } from './src/components/loading';
import { AuthContextProvider } from './src/contexts/auth.context';
import { Routes } from './src/routes';
import { THEME } from './src/styles/theme';

export default function App() {
  const [fontLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold});
  
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      { fontLoaded ?  <Routes/> :  <Loading/> }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}


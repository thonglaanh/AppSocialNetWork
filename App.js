import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './Screen/Splash';
import Home from './Screen/Home';
import Login from './Screen/Login';
import Register from './Screen/Register';
import Details from './Screen/Details';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer >

      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Splash' component={Splash}></Stack.Screen>

        <Stack.Screen name='Home' component={Home}></Stack.Screen>

        <Stack.Screen name='Details' component={Details}></Stack.Screen>


        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Register' component={Register}></Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer >

  );
}

const styles = StyleSheet.create({
});

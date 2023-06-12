// Importando as dependências necessárias
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

// Definindo as telas da aplicação

function HomeScreen({ navigation }: any) {
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Second')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function SecondScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segunda Tela</Text>
    </View>
  );
}

// Criando o navegador e as pilhas de navegação
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" " component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(227,231,242)',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    width: 200,
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'rgb(0,107,182)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom:-100,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;

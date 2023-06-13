// Importando as dependências necessárias
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import data from './data.json';

// Definindo as telas da aplicação

function HomeScreen({ navigation }: any) {

  return (
    <View style={styles.container}>
      <Image
        source={require('./Imgs/nba-logo-3.png')} // URL da imagem remota
        style={styles.HomeImage}
      />
      <Text style={styles.HomeStats}>STATS</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('  ')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function SecondScreen() {
  const [teamsData, setTeamsData] = useState<any[]>([]);

  useEffect(() => {
    setTeamsData(data);
  }, []);

  return (
    <View style={styles.TeamsContainer}>
      <Text style={styles.TeamsText}>Teams</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {teamsData.map((team, index) => (

          <View key={index}>
            <Text style={styles.teamsText}>{team.nome}</Text>
            <Image
              source={{ uri: team.link }}
              style={styles.TeamsImage}
            />
          </View>
        ))}
      </ScrollView>
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
        <Stack.Screen name="  " component={SecondScreen} />
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
    bottom: 0,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  HomeStats: {
    position: 'relative',
    bottom: 200,
    fontSize: 50,
    marginBottom: 20,
    color: 'rgb(0,107,182)',
    fontWeight: 'bold',
  },

  HomeImage: {
    position: 'relative',
    bottom: 175,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  TeamsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,107,182)',
  },
  TeamsImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  TeamsText: {
    fontSize: 50,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  teamsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default App;

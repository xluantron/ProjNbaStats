
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import data from './data.json';
import TEAM from './Teams.json';
import play from './playerTag.json';
import pData from './playerdata.json';
// Tela Inicial

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
// Tela Teams
function SecondScreen({ navigation }: any) {
  // uso de dados do data.json
  const [teamsData, setTeamsData] = useState<any[]>([]);
  useEffect(() => {
    setTeamsData(data);
  }, []);
  // progresso duvidas
  const handleImagePress = (username: any) => {
    navigation.navigate('   ', { username });

  };

  return (
    <View style={styles.TeamsContainer}>
      <Text style={styles.TeamsText}>Teams</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {teamsData.map((team, index) => (

          <View key={index}>
            <Text style={styles.teamsText}>{team.nome}</Text>
            <TouchableOpacity onPress={() => handleImagePress(team.abreviacao)}>
              <Image
                source={{ uri: team.link }}
                style={styles.TeamsImage}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Tela Lineup
const LineScreen = ({ navigation, route }: { route: any, navigation: any }) => {

  const { username } = route.params;
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [teamData, setTeamData] = useState<any[]>([]);
  const [logoData, setLogoData] = useState<any[]>([]);
  useEffect(() => {
    setTeamsData(play);
    setTeamData(TEAM);
    setLogoData(data);
  }, []);
  const logo = logoData.filter(logoData => logoData.abreviacao === username);
  const player = teamData.filter(teamData => teamData.abbreviation === username);
  const filtro = teamsData.filter(teamsData => teamsData.teamId === player[0].teamId);
  const link = logo[0]?.link;
  const handleImagePress = (username: any) => {
    navigation.navigate('    ',`https://cdn.nba.com/headshots/nba/latest/260x190/${username}.png`);

  };

  return (
    <View style={styles.lineupContainer}>
<Image
                source={{ uri: link }}
                style={styles.TeamsImage}
              />
      <Text style={styles.playerText}>Player</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {filtro.map((team, index) => (

          <View style={styles.line} key={index}>
            <TouchableOpacity style={styles.lineupSpace} onPress={() => handleImagePress(team.playerId)}>
              <Text style={styles.lineupText}>{team.first_name} {team.last_name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );


}
// Tela do Jogador
const PlayerScreen = ({ navigation, route }: { route: any, navigation: any }) => {
  const link = route.params;
  const [playerData, setPlayerData] = useState<any[]>([]);
  useEffect(() => {
    setPlayerData(pData);
  }, []);
  const player = playerData.filter(playerData => playerData.link === link);

  return (
    <View style={styles.lineupContainer}>
       <Image
                source={{ uri: link }}
                style={styles.TeamsImage}
              />
      
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {player.map((team, index) => (
          <View style={styles.lineupContainer} key={index}>
            <Text style={styles.lineupText}>{team.first_name} {team.last_name}</Text>
            <Text>Altura:{team.height} m </Text>
            <Text>Peso :{team.weight} kg</Text>

          </View>
        ))}
      </ScrollView>
    </View>
  );
  
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" " component={HomeScreen} />
        <Stack.Screen name="  " component={SecondScreen} />
        <Stack.Screen name="   " component={LineScreen} />
        <Stack.Screen name="    " component={PlayerScreen} />
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
    paddingHorizontal: 5,
  },
  lineupText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(27,147,227)',
    textAlign: 'center',
    width: 350,
  },
  playerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
  },
  lineupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  lineupSpace: {
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
  },
  line: {

    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
});

export default App;

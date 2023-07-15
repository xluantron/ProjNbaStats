import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import data from './data.json';
import datac from './data_player_complete.json';
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
  const [teamData, setTeamData] = useState<any[]>([]);
  const [logoData, setLogoData] = useState<any[]>([]);
  useEffect(() => {
    setTeamData(datac);
    setLogoData(data);
  }, []);
  const logo = logoData.filter(logoData => logoData.abreviacao === username);
  const primeiro = teamData.filter(teamData => teamData.sigla === username.toLowerCase());
  const player = primeiro.filter(primeiro => primeiro.number_tag !== 'null');
  const link = logo[0]?.link;
  const handleImagePress = (username: any) => {
    navigation.navigate('    ', username);
  };

  return (
    <View style={styles.lineupContainer}>
      <Image
        source={{ uri: link }}
        style={styles.TeamsImage}
      />
      <Text style={styles.playerText}>Player</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {player.map((team, index) => (

          <View style={styles.line} key={index}>

            <TouchableOpacity style={styles.lineupSpace} onPress={() => handleImagePress(team.ID)}>

              <Text style={styles.lineupText}>{team.first_name} {team.last_name} {team.number_tag}</Text>
              <Text style={styles.lineupText}>{team.pos}</Text>
              <Image
                source={{ uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${team.ID}.png&w=350&h=254` }}
                style={styles.playerImage}
              />

            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
  /*

*/
}
// Tela do Jogador
const PlayerScreen = ({ navigation, route }: { route: any, navigation: any }) => {
  const link = route.params;
  const [playerData, setPlayerData] = useState<any[]>([]);
  useEffect(() => {
    setPlayerData(datac);
  }, []);
  const player = playerData.filter(playerData => playerData.ID === link);
  const url = `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${link}.png&w=350&h=254`;


  return (
    <View style={styles.lineupContainer}>
      <Image
        source={{ uri: url }}
        style={styles.TeamsImage}
      />

  
        {player.map((team, index) => (
          <View style={styles.lineupContainer} key={index}>
            <Text style={styles.lineupText}>{team.first_name} {team.last_name}{team.number_tag}</Text>
            <Text style={styles.lineupText}>{team.pos}</Text>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <View style={styles.statContainer} key={index}>
                <Text style={styles.statText}>Altura/Peso: {team.altura_peso}</Text>
                <Text style={styles.statText}>Idade: {team.bday}</Text>
                <Text style={styles.statText}>Jogos: {team.J}</Text>
                <Text style={styles.statText}>Minutos/jogo: {team.MIN} min</Text>
                <Text style={styles.statText}>Arremesso:{team.FG}%</Text>
                <Text style={styles.statText}>Três pontos: {team.triP}%</Text>
                <Text style={styles.statText}>Lance Livre: {team.FT}%</Text>
                <Text style={styles.statText}>Rebotes/jogo: {team.REB}</Text>
                <Text style={styles.statText}>Assistencia/jogo: {team.AST}</Text>
                <Text style={styles.statText}>Bloqueio/jogo: {team.BLK}</Text>
                <Text style={styles.statText}>Três pontos: {team.triP}%</Text>
                <Text style={styles.statText}>Lance Livre: {team.FT}%</Text>
                <Text style={styles.statText}>Rebotes/jogo: {team.REB}</Text>
                <Text style={styles.statText}>Assistencia/jogo: {team.AST}</Text>
                <Text style={styles.statText}>Bloqueio/jogo: {team.BLK}</Text>

              </View>
            </ScrollView>
          </View>

        ))}
      
    </View>
  );
  /*
              <Text>Altura:{team.height} m </Text>
              <Text>Peso :{team.weight} kg</Text>
  
  */


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
  statText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',

  },
  statContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: 'rgb(177,177,188)',
  },
  playerImage: {
    width: 100,
    height: 75,
    resizeMode: 'contain',
    position: 'relative',

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

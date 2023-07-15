import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, FlatList, ScrollView, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
        onPress={() => navigation.navigate('Quadra')}
      >
        <Text style={styles.buttonText}>Make</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Teams')}
      >
        <Text style={styles.buttonText}>Teams</Text>
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
    navigation.navigate('Lineup', { username });

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
    navigation.navigate('Player', username);
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
const PlayerScreen = ({ route }: { route: any }) => {
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

}

const MakeScreen = () => {

  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLine, setModalLine] = useState(false);
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [teamData, setTeamData] = useState<any[]>([]);
  useEffect(() => {
    setTeamsData(data);
    setTeamData(datac);
  }, []);
  const player = teamData.filter(teamData => teamData.number_tag !== 'null');
  const options = teamsData;
  console.log(options.length);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeteamModal = () => {
    setModalLine(false);
  };
  const selectValue = (value: String) => {
    setTeamData(player.filter(player => player.sigla === value.toLowerCase()));
    closeModal();
    setModalLine(true);
  };
  const selectPlayer = (value: number) => {
    setSelectedValue(value);
    closeteamModal();
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./Imgs/Quadra.png')}
        style={styles.backgroundImage}
      >


        <TouchableOpacity style={styles.center1Circle} onPress={openModal}>
          <Text style={styles.centerText}>{selectedValue || '+'}</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => selectValue(item.abreviacao)}
                >
                  <Image
                    source={{ uri: item.link }}
                    style={styles.playerImage}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.toString()}
            />
          </View>
        </Modal>
        <Modal visible={modalLine} animationType="slide" onRequestClose={closeteamModal}>
          <View style={styles.modalContainer}>
            <FlatList
              data={teamData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => selectPlayer(item.ID)}
                >
                  <Image
                    source={{ uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${item.ID}.png&w=350&h=254` }}
                    style={styles.playerImage}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.toString()}
            />
          </View>
        </Modal>

      </ImageBackground>
    </View>
  );


}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Teams" component={SecondScreen} />
        <Stack.Screen name="Lineup" component={LineScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Quadra" component={MakeScreen} />
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
    margin: 5,

  },
  makerButton: {
    width: 200,
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'rgb(0,107,182)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: 75,
    margin: 5,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  HomeStats: {
    position: 'relative',
    bottom: 100,
    fontSize: 50,
    marginBottom: 20,
    color: 'rgb(0,107,182)',
    fontWeight: 'bold',
  },

  HomeImage: {
    position: 'relative',
    bottom: 100,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 375,
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
  center1Circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    left: 150,
    top: -50,
  },
  centerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  option: {
    width: 100,
    height: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;

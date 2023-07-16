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
        style={styles.homeImage}
      />
      <Text style={styles.homeStats}>STATS</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quadra')}
      >
        <Text style={styles.buttonText}>Quadra</Text>
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
    <View style={styles.teamsContainer}>
      <Text style={styles.teamsText}>Teams</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {teamsData.map((team, index) => (

          <View key={index}>
            <Text style={styles.teamsText2}>{team.nome}</Text>
            <TouchableOpacity onPress={() => handleImagePress(team.abreviacao)}>
              <Image
                source={{ uri: team.link }}
                style={styles.teamsImage}
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
        style={styles.teamsImage}
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
        style={styles.teamsImage}
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

const QuadraScreen = () => {
  const [painelVisible, setPainelVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLine, setModalLine] = useState(false);
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [teamData, setTeamData] = useState<any[]>([]);
  const [playerData, setPlayerData] = useState<any[]>([]);
  const [estatData, setEstatData] = useState<any[]>([]);
  const [vets, setvets] = useState(0);
  const [pImg, setpImg] = useState('Empty');
  const [pImg1, setpImg1] = useState('Empty');
  const [pImg2, setpImg2] = useState('Empty');
  const [pImg3, setpImg3] = useState('Empty');
  const [pImg4, setpImg4] = useState('Empty');
  const [d1, setD1] = useState(0);
  const [d2, setD2] = useState(0);
  const [d3, setD3] = useState(0);
  const [d4, setD4] = useState(0);
  const [d5, setD5] = useState(0);

  useEffect(() => {
    setTeamsData(data);
    // Filtrando jogadores reservas e jogadores que não tem dados de jogos na temporada
    setTeamData(datac.filter(datac => datac.number_tag !== 'null' && datac.J !== 'null'));
    setpImg('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD1(0);
    setpImg1('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD2(0);
    setpImg2('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD3(0);
    setpImg3('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD4(0);
    setpImg4('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD5(0);

  }, []);
  const resetAll = () => {
    setpImg('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD1(0);
    setpImg1('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD2(0);
    setpImg2('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD3(0);
    setpImg3('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD4(0);
    setpImg4('https://png.pngtree.com/element_our/sm/20180516/sm_5afbe35fd36cc.jpg'); setD5(0);

  };
  const openModal = (value: number) => {
    setModalLine(false);
    setModalVisible(true);
    setvets(value);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeteamModal = () => {
    setModalLine(false);
  };
  const openPainel = () => {
    setPainelVisible(true);
    const estat = teamData.filter(teamData => teamData.ID === 'stat');
    const dados = teamData.filter(teamData =>
      teamData.ID === d1
      || teamData.ID === d2
      || teamData.ID === d3
      || teamData.ID === d4
      || teamData.ID === d5);
    let dFG = 0;
    let dtriP = 0;
    let dFT = 0;
    let dREB = 0;
    let dAST = 0;
    let dBLK = 0;
    let dSTL = 0;
    let dPF = 0;
    let dTO = 0;
    let dPTS = 0;

    if (dados.length>0) {
      for (let i = 0; i < dados.length; i++) {
        dFG += parseFloat(dados[i].FG);
        dtriP += parseFloat(dados[i].triP);
        dFT += parseFloat(dados[i].FT);
        dREB += parseFloat(dados[i].REB);
        dAST += parseFloat(dados[i].AST);
        dBLK += parseFloat(dados[i].BLK);
        dSTL += parseFloat(dados[i].STL);
        dPF += parseFloat(dados[i].PF);
        dTO += parseFloat(dados[i].TO);
        dPTS += parseFloat(dados[i].PTS);
      };

      estat[0].FG = (dFG / dados.length).toFixed(2);
      estat[0].triP = (dtriP / dados.length).toFixed(2);
      estat[0].FT = (dFT / dados.length).toFixed(2);
      estat[0].REB = (dREB / dados.length).toFixed(2);
      estat[0].AST = (dAST / dados.length).toFixed(2);
      estat[0].BLK = (dBLK / dados.length).toFixed(2);
      estat[0].STL = (dSTL / dados.length).toFixed(2);
      estat[0].PF = (dPF / dados.length).toFixed(2);
      estat[0].TO = (dTO / dados.length).toFixed(2);
      estat[0].PTS = (dPTS / dados.length).toFixed(2);
      setEstatData(estat);
    }else{
      estat[0].FG = dFG;
      estat[0].triP = dtriP;
      estat[0].FT = dFT;
      estat[0].REB = dREB;
      estat[0].AST = dAST;
      estat[0].BLK = dBLK;
      estat[0].STL = dSTL;
      estat[0].PF = dPF;
      estat[0].TO = dTO;
      estat[0].PTS = dPTS;
      setEstatData(estat);
    };

  };
  const closePainel = () => {
    setPainelVisible(false);
  };
  const selectValue = (value: String) => {
    const operacao = teamData.filter(teamData => teamData.sigla === value.toLowerCase()
      && (teamData.ID !== d1
        && teamData.ID !== d2
        && teamData.ID !== d3
        && teamData.ID !== d4
        && teamData.ID !== d5));

    if (vets === 1) {
      setPlayerData(operacao.filter(operacao => operacao.pos === 'Armador'
        || operacao.pos === 'Ala-pivô'
        || operacao.pos === 'Atacante'));
    }
    if (vets === 2) {
      setPlayerData(operacao.filter(operacao => operacao.pos === 'Pivô'
        || operacao.pos === 'Ala-pivô'
        || operacao.pos === 'Atacante'));
    }
    if (vets === 3) {
      setPlayerData(operacao.filter(operacao => operacao.pos === 'Armador'
        || operacao.pos === 'Ala-pivô'
        || operacao.pos === 'Atacante'));
    }
    if (vets === 4) {
      setPlayerData(operacao.filter(operacao => operacao.pos === 'Armador'
        || operacao.pos === 'Ala'
        || operacao.pos === 'Guarda'));
    }
    if (vets === 5) {
      setPlayerData(operacao.filter(operacao => operacao.pos === 'Armador'
        || operacao.pos === 'Ala'
        || operacao.pos === 'Guarda'));
    }
    closeModal();
    setModalLine(true);
  };
  const selectPlayer = (value: number) => {
    if (vets === 1) {
      setpImg(`https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${value}.png&w=350&h=254`)
      setD1(value);
    }
    if (vets === 2) {
      setpImg1(`https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${value}.png&w=350&h=254`)
      setD2(value);
    }
    if (vets === 3) {
      setpImg2(`https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${value}.png&w=350&h=254`)
      setD3(value);
    }
    if (vets === 4) {
      setpImg3(`https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${value}.png&w=350&h=254`)
      setD4(value);
    }
    if (vets === 5) {
      setpImg4(`https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${value}.png&w=350&h=254`)
      setD5(value);
    }

    setvets(0);
    closeteamModal();
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./Imgs/Quadra.png')}
        style={styles.backgroundImage}
      >


        <TouchableOpacity style={styles.center1Circle} onPress={() => openModal(1)}>
          <Image
            source={{ uri: pImg }}
            style={styles.playerImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.center2Circle} onPress={() => openModal(2)}>
          <Image
            source={{ uri: pImg1 }}
            style={styles.playerImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.center3Circle} onPress={() => openModal(3)}>
          <Image
            source={{ uri: pImg2 }}
            style={styles.playerImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.center4Circle} onPress={() => openModal(4)}>
          <Image
            source={{ uri: pImg3 }}
            style={styles.playerImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.center5Circle} onPress={() => openModal(5)}>
          <Image
            source={{ uri: pImg4 }}
            style={styles.playerImage}
          />
        </TouchableOpacity>
        <View style={styles.containerMenu}>
          <TouchableOpacity style={styles.statButton} onPress={() => openPainel()}>
            <Text>Estatisticas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton} onPress={() => resetAll()}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} animationType='fade' onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => closeModal()}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView >
              {teamsData.map((team, index) => (

                <View key={index}>
                  <Text style={styles.teamsText1}>{team.nome}</Text>
                  <TouchableOpacity onPress={() => selectValue(team.abreviacao)}>
                    <Image
                      source={{ uri: team.link }}
                      style={styles.teamsImage}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>
        <Modal visible={modalLine} animationType="fade" onRequestClose={closeteamModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => openModal(vets)}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView >
              {playerData.map((item, index) => (

                <View key={index}>
                  <Text style={styles.statText}>{item.first_name} {item.last_name}</Text>
                  <TouchableOpacity onPress={() => selectPlayer(item.ID)}>
                    <Image
                      source={{ uri: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${item.ID}.png&w=350&h=254` }}
                      style={styles.playerModalImage}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>
        <Modal visible={painelVisible} animationType="fade" onRequestClose={closePainel}>
          <View>
            <TouchableOpacity
              style={styles.estBButton}
              onPress={() => closePainel()}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

          </View>
          {estatData.map((item, index) => (
            <React.Fragment key={index}>
              <View style={styles.containerStat} >
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Acertos</Text>
                  <Text>{item.FG}%</Text>
                </View>
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>3 pontos</Text>
                  <Text>{item.triP}%</Text>
                </View>
              </View>

              <View style={styles.containerStat} >
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Lances Livres</Text>
                  <Text>{item.FT}%</Text>
                </View>
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Media Rebotes</Text>
                  <Text>{item.REB}</Text>
                </View>
              </View>

              <View style={styles.containerStat} >
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Media Assitencia</Text>
                  <Text>{item.AST}</Text>
                </View>
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Media de bloqueios</Text>
                  <Text>{item.BLK}</Text>
                </View>
              </View>

              <View style={styles.containerStat} >
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Media de roubos</Text>
                  <Text>{item.STL}</Text>
                </View>
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Media de Faltas</Text>
                  <Text>{item.PF}</Text>
                </View>
              </View>

              <View style={styles.containerStat} >
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Media de Erros</Text>
                  <Text>{item.TO}</Text>
                </View>
                <View style={styles.containerCell}>
                  <Text style={styles.itemName}>Media de Pontos</Text>
                  <Text >{item.PTS}</Text>
                </View>
              </View>

            </React.Fragment>
          ))}

        </Modal>
      </ImageBackground>
    </View>
  );


}
/*

*/

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Teams" component={SecondScreen} />
        <Stack.Screen name="Lineup" component={LineScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Quadra" component={QuadraScreen} />
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
  containerCell: {
    width: 150,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(227,231,242)',
    borderRadius: 20,
  },
  containerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'gray',
    margin: 0,
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
  backButton: {
    width: 100,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'gray',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    left: 100,
    margin: 5,

  },
  estBButton: {
    width: 100,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'gray',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    left: 225,
    margin: 5,

  },
  statButton: {
    width: 100,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'gray',

    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: 0,
    margin: 40,

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
  homeStats: {
    position: 'relative',
    bottom: 100,
    fontSize: 50,
    marginBottom: 20,
    color: 'rgb(0,107,182)',
    fontWeight: 'bold',
  },

  homeImage: {
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
  teamsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,107,182)',
  },
  teamsImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  quadraImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  teamsText: {
    fontSize: 50,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  teamsText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
  teamsText2: {
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
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  playerModalImage: {
    width: 100,
    height: 75,
    resizeMode: 'contain',
    position: 'relative',
    left: 70,
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
    left: 230,
    bottom: -200,

  },
  center2Circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    left: 150,

  },
  center3Circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    left: 75,

  },
  center4Circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    left: 225,
    bottom: -50
  },
  center5Circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    left: 75,

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
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemValue: {
    fontSize: 14,
  },
});

export default App;

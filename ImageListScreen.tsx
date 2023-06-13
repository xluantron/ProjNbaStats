import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';

const ImageListScreen: React.FC = () => {
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const dirPath = RNFS.DocumentDirectoryPath + '/Imgs/Teams'; // Substitua pela pasta correta
        const files = await RNFS.readdir(dirPath);
        setImageList(files);
      } catch (error) {
        console.log('Erro ao ler a pasta de imagens:', error);
      }
    };

    fetchImages();
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: 'file://' + item }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={imageList}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default ImageListScreen;

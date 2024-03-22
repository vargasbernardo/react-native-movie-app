import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const styles = StyleSheet.create({
  movieContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  image: {
    width: 100,
    height: 200,
  },
});

export default function HomeScreen(props) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeText = (text) => {
    setSearchTerm(text);
  };

  const handleSearchBtn = () => {
    fetch(`http://www.omdbapi.com/?s=${searchTerm.trim()}&apikey=2aef2a90`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));

    setSearchTerm("");
  };
  return (
    <View>
      <Text>Welcome!</Text>
      <TextInput
        placeholder="Input a search term!"
        value={searchTerm}
        onChangeText={handleChangeText}
      ></TextInput>
      <Button title="Search" onPress={handleSearchBtn}></Button>
      <FlatList
        data={movies}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('MovieDetails', {imdbId: item.imdbID})
                }} style={styles.movieContainer} >
              <View>
                <Text>{item.Title}</Text>
                <Image style={styles.image} source={{ uri: item.Poster }} />
              </View>
              <View>
                <Text>Type: {item.Type}</Text>
                <Text>Year: {item.Year}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.imdbID}
      />
      {/* {movies?.map(movie => {
                return (
                    <ScrollView style={styles.movieContainer} key={movie.imdbID}>
                        <Text>{movie.Title}</Text>
                        <Image source={{uri: movie.Poster}} />
                        <Text>{movie.Type}</Text>
                        <Text>{movie.Year}</Text>
                    </ScrollView>
                )
            })} */}
    </View>
  );
}

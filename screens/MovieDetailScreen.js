import { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native'

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
      height: 390,
    },
    viewStyle: {
        alignItems: 'left',
        justifyContent: 'center',
    },
    normalText: {
        fontWeight: 'bold',
    }
  });

export default function MovieDetailScreen (props) {
    const [movie, setMovie] = useState([])
    useEffect(() => {
        fetch(`http://www.omdbapi.com/?i=${props.route.params.imdbId}&apikey=2aef2a90`)
            .then(response => response.json())
            .then(data => setMovie(data))
    }, [props.route.params.imdbId]);
    return (
    <>
        <Image style={styles.image} resizeMode={'cover'} source={{uri: movie.Poster}} />
        <View style={styles.viewStyle} >
            <Text style={{fontSize: 20,}}>{movie.Title}</Text>
            <Text>🧔👨👩‍🦰🧑‍🦰🧓👵 | Cast: {movie.Actors}</Text>
            <Text>📖 | Plot: {movie.Plot}</Text>
            <Text>🎦 | Genre: {movie.Genre}</Text>
            <Text>🎥 | Director: {movie.Director}</Text>
            <Text>📅 | Release Year: {movie.Released}</Text>
            <Text>⏲️ | Runtime: {movie.Runtime}</Text>
            <Text>⭐ | Rating: {movie.imdbRating}</Text>
            <Text>🏆 | Awards: {movie.Awards}</Text>
        </View>
    </>
    )
}
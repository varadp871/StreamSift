import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import axios from "axios";

const API_KEY = "d5e6f1933fb22ae30a694642ba59ab63";

const StreamSift = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        setMovies(response.data.results.slice(0, 5));
      })
      .catch((error) => console.log(error));
  }, []);
  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleClosePress = () => {
    setSelectedMovie(null);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <ScrollView>
      {movies.map((movie) => (
        <TouchableOpacity
          key={movie.id}
          onPress={() => handleMoviePress(movie)}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={{
                height: selectedMovie
                  ? selectedMovie.id === movie.id
                    ? slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 400],
                      })
                    : fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 200],
                      })
                  : 200,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: selectedMovie
                  ? selectedMovie.id === movie.id
                    ? slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -200],
                      })
                    : fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-200, -200],
                      })
                  : -200,
                backgroundColor: "rgba(0,0,0,.5)",
                width: "100%",
                height: selectedMovie
                  ? selectedMovie.id === movie.id
                    ? slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 400],
                      })
                    : fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 200],
                      })
                  : null,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: selectedMovie
                    ? selectedMovie.id === movie.id
                      ? slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 30],
                        })
                      : fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 20],
                        })
                    : null,
                }}
              >
                {movie.title}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: selectedMovie
                    ? selectedMovie.id === movie.id
                      ? slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [16, 20],
                        })
                      : null
                    : null,
                }}
              >
                {movie?.overview}
              </Text>
              <TouchableOpacity onPress={handleClosePress}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: selectedMovie
                      ? selectedMovie.id === movie.id
                        ? slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [16, 20],
                          })
                        : fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [16, 16],
                          })
                      : null,
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StreamSift;

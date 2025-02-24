import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HTMLView from "react-native-htmlview";
import { useNavigation } from "@react-navigation/native";

export default function Exercise() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const exercises = [
    {
      title: "Exercise 3",
      description:
        "Create login screen<br/>Login screen fields:\n\n<ul><li>Email</li><li>Password</li></ul>",
    },
    {
      title: "Exercise 4",
      description:
        "UseState and useEffect<br/>Create a timer that starts when the user clicks the start button and stops when the user clicks the stop button",
    },
    {
      title: "Exercise 5",
      description:
        "Create register screen<br/>Register screen fields:\n\n<ul><li>Image: Allows user to select image</li><li>Name</li><li>Email</li><li>Password</li></ul>",
    },
    {
      title: "Exercise 6",
      description: "Simple CRUD using useContext and useReducer",
    },
    { title: "Exercise 7", description: "Sample description rendered HTML 7" },
    { title: "Exercise 8", description: "Sample description rendered HTML 8" },
    { title: "Exercise 9", description: "Sample description rendered HTML 9" },
    { title: "Exercise 10", description: "Sample description rendered HTML 10" },
  ];

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => setExpandedIndex(null));
    } else {
      setExpandedIndex(index);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  };

  const handlePress = (index) => {
    switch (index) {
      case 0:
        navigation.navigate("login");
        break;
      case 1:
        navigation.navigate("../(information)/effect");
        break;
      case 2:
        navigation.navigate("../(information)/register");
        break;
      case 3:
        navigation.navigate("../(information)/crud");
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Exercises</Text>
      {exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleExpand(index)}
          onPressIn={() => setHoveredIndex(index)}
          onPressOut={() => setHoveredIndex(null)}
          activeOpacity={0.9}
          style={styles.card}
        >
          <LinearGradient
            colors={hoveredIndex === index ? ['cyan', '#B5FFFC'] : ['#FFFFFF', '#F1F1F1']}
            style={styles.gradient}
          >
            <Text style={styles.title}>{exercise.title}</Text>
            {expandedIndex === index && (
                    <Animated.View style={[styles.descriptionContainer, { opacity: animation }]}>
                        <HTMLView value={exercise.description} stylesheet={htmlStyles} />
                        <TouchableOpacity onPress={() => handlePress(index)} style={styles.navigateButton}>
                        <Text style={styles.navigateButtonText}>
                            {index === 0 ? "Log In" : "Go to Exercise"}
                        </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    )}

          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradient: {
    padding: 15,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  descriptionContainer: {
    marginTop: 8,
  },
  navigateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center'
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  ul: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
  },
  li: {
    fontSize: 14,
    color: '#555',
  },
});

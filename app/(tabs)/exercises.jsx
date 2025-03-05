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
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const exercises = [
    {
      title: "Exercise 3",
      description:
        "Create login screen<br/>Login screen fields:\n\n<ul><li>Email</li><li>Password</li></ul>",
      route: "login",
      buttonText: "Click to Log in",
    },
    {
      title: "Exercise 4",
      description:
        "Using the useState and useEffect hooks, create a stopwatch with two buttons: one for Start/Stop and one for Reset.",
      route: "stopwatch",
      buttonText: "Try Stopwatch",
    },
    {
      title: "Exercise 5",
      description:
        "Create register screen<br/>Register screen fields:\n\n<ul><li>Image: Allows user to select image</li><li>Name</li><li>Email</li><li>Password</li></ul>",
      route: "register",
      buttonText: "Click to Register an Account",
    },
    {
      title: "Exercise 6",
      description: "Simple CRUD using useContext and useReducer",
      route: "crud",
      buttonText: "Click for CRUD Content",
    },
  ];

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start(() => setExpandedIndex(null));
    } else {
      setExpandedIndex(index);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }).start();
    }
  };

  const handleNavigation = (route) => {
    if (route) {
      navigation.navigate(route);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Exercises</Text>
      {exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleExpand(index)}
          activeOpacity={0.9}
          style={styles.card}
        >
          <LinearGradient
            colors={expandedIndex === index ? ['#B5FFFC', 'cyan'] : ['#FFFFFF', '#F1F1F1']}
            style={styles.gradient}
          >
            <Text style={styles.title}>{exercise.title}</Text>

            {expandedIndex === index && (
              <Animated.View style={[styles.descriptionContainer, { opacity: animation }]}>
                <HTMLView value={exercise.description} stylesheet={htmlStyles} />

                {exercise.route && (
                  <TouchableOpacity
                    onPress={() => handleNavigation(exercise.route)}
                    style={styles.navigateButton}
                  >
                    <Text style={styles.navigateButtonText}>
                      {exercise.buttonText}
                    </Text>
                  </TouchableOpacity>
                )}
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

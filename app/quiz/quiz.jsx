import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Quiz({ navigation }) {
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;
    if (isQuizStarted && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isQuizStarted, timer]);

  const fetchQuestions = async () => {
    const num = parseInt(numQuestions);
    if (isNaN(num) || num < 10 || num > 30) {
      setError("Please enter a number between 10 and 30.");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${num}&type=multiple`
      );
      const data = await response.json();
      setQuestions(data.results);
      setScore(0);
      setCurrentQuestion(0);
      setShowScore(false);
      setIsQuizStarted(true);
      setTimer(10);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      if (selectedAnswer === questions[currentQuestion]?.correct_answer) {
        setScore((prev) => prev + 1);
      }
      setSelectedAnswer(null);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  return (
    <LinearGradient colors={["#ffffff", "#bdbdbd", "#7d7d7d"]} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("(tabs)", { screen: "exercises" })}>
        <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>

      {!isQuizStarted ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Number of Questions (10-30)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numQuestions}
            onChangeText={(text) => setNumQuestions(text)}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={fetchQuestions}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : showScore ? (
        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsQuizStarted(false)}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.timer}>Time Left: {timer}s</Text>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{currentQuestion + 1}. {questions[currentQuestion]?.question}</Text>
          </View>
          {questions[currentQuestion]?.incorrect_answers.concat(questions[currentQuestion]?.correct_answer).sort().map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, selectedAnswer === option && styles.selectedOption]}
              onPress={() => setSelectedAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.navButton} onPress={handleNextQuestion}>
            <Text style={styles.buttonText}>{currentQuestion === questions.length - 1 ? "Finish" : "Next"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1e3c72",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#919191",
    padding: 20,
    borderRadius: 15,
    width: "90%",
  },
  label: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: "80%",
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  button: {
    backgroundColor: "#5c67f2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quizContainer: {
    alignItems: "center",
    width: "90%",
    backgroundColor: "#919191",
    padding: 20,
    borderRadius: 15,

  },
  timer: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
    marginLeft: "auto",

  },
  questionBox: {
    backgroundColor: "#5c67f2",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  option: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2, 
    borderColor: "transparent",
  },
  selectedOption: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "black",
 
  },
  navButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    width: "90%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
});
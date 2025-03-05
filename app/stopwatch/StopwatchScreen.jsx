import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function StopwatchScreen() {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
      <Text style={styles.timer}>{formatTime()}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setRunning(!running)}>
          <LinearGradient colors={running ? ["#ff416c", "#ff4b2b"] : ["#56ab2f", "#a8e063"]} style={styles.button}>
            <Text style={styles.buttonText}>{running ? "Stop" : "Start"}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setTime(0); setRunning(false); }}>
          <LinearGradient colors={["#007bff", "#00c6ff"]} style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push("/exercises")}>
        <LinearGradient colors={["#6c757d", "#495057"]} style={[styles.button, styles.backButton]}>
          <Text style={styles.buttonText}>Go Back</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 30,
  },
});

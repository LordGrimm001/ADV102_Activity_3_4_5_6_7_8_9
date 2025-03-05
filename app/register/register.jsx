import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("⚠️ Error", "Please fill in all fields.");
      return;
    }
    Alert.alert("✅ Success", "You have successfully registered!", [
      { text: "OK", onPress: resetForm },
    ]);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setImage(null);
  };

  return (
    <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/exercises")}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Register</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text style={styles.imageText}>Select Image</Text>}
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 30,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  imagePicker: {
    width: 120,
    height: 120,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  imageText: {
    color: "#555",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    overflow: "hidden",
  },
  buttonGradient: {
    padding: 12,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

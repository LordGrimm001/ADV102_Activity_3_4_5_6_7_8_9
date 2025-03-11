import React, { useReducer, createContext, useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const CrudContext = createContext();

const initialState = { tasks: [] };

function crudReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { tasks: [...state.tasks, { id: Date.now(), text: action.payload }] };
    case "UPDATE":
      return { tasks: state.tasks.map(task => (task.id === action.payload.id ? { ...task, text: action.payload.text } : task)) };
    case "DELETE":
      return { tasks: state.tasks.filter(task => task.id !== action.payload) };
    default:
      return state;
  }
}

export default function Crud() {
  const router = useRouter();
  const [state, dispatch] = useReducer(crudReducer, initialState);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(null);

  const handleAddOrUpdate = () => {
    if (editing !== null) {
      dispatch({ type: "UPDATE", payload: { id: editing, text } });
      setEditing(null);
    } else {
      dispatch({ type: "ADD", payload: text });
    }
    setText("");
  };

  return (
    <CrudContext.Provider value={{ state, dispatch }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/exercises")}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter task"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddOrUpdate}>
            <Text style={styles.buttonText}>{editing !== null ? "Update" : "Add"}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={state.tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>{item.text}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => { setText(item.text); setEditing(item.id); }} style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch({ type: "DELETE", payload: item.id })} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </CrudContext.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 30,
    color: "#007BFF",
  },
  inputContainer: {
    marginTop: 80, 
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    padding: 8,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "red",
    borderRadius: 5,
  },
});
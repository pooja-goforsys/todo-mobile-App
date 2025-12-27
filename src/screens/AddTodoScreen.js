import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from "react-native";

const AddTodoScreen = ({ navigation, setTodos }) => {
  const [projectName, setProjectName] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const saveTask = () => {
    if (!projectName || !ticketName || !dueDate) {
      Alert.alert("Error", "Project, Ticket & Due Date are required");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      projectName,
      ticketName,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [...prev, newTask]);

    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
        Add New Task
      </Text>

      <Text>Project Name *</Text>
      <TextInput
        value={projectName}
        onChangeText={setProjectName}
        style={inputStyle}
      />

      <Text>Ticket Name *</Text>
      <TextInput
        value={ticketName}
        onChangeText={setTicketName}
        style={inputStyle}
      />

      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[inputStyle, { height: 80 }]}
        multiline
      />

      <Text>Due Date (YYYY-MM-DD) *</Text>
      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        style={inputStyle}
      />

      <Button title="Save Task" onPress={saveTask} />
    </ScrollView>
  );
};

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 10,
  marginBottom: 12,
  borderRadius: 6,
  backgroundColor: "#fff",
};

export default AddTodoScreen;

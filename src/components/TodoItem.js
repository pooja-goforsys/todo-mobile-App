import React from "react";
import { View, Text, Button } from "react-native";

const TodoItem = ({ item, overdue, createdAt, onDelete }) => {
  return (
    <View
      style={{
        padding: 12,
        marginVertical: 6,
        backgroundColor: overdue ? "#ffe6e6" : "#fff",
        borderRadius: 6,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{item.projectName}</Text>
      <Text>{item.ticketName}</Text>
      <Text>Due: {item.dueDate}</Text>
      <Text>Created: {createdAt}</Text>

      {overdue && <Text style={{ color: "red" }}>Overdue</Text>}

      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

export default TodoItem;

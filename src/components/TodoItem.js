import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const TodoItem = ({ item, overdue, createdAt, onEdit, onDelete }) => {
  return (
    <View style={globalStyles.todoCard}>
      <View style={{ flex: 1 }}>
        <Text style={globalStyles.todoTitle}>{item.title}</Text>
        <Text style={globalStyles.todoDate}>
          Created: {createdAt}
        </Text>

        {overdue && (
          <Text style={globalStyles.overdueBadge}>OVERDUE</Text>
        )}
      </View>

      <View style={globalStyles.actionRow}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={globalStyles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Text style={globalStyles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;

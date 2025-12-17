import { StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 15,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 16,
    color: COLORS.text,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});

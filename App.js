import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    <NavigationContainer>
      <DrawerNavigator
        todos={todos}
        setTodos={setTodos}
      />
    </NavigationContainer>
  );
};

export default App;

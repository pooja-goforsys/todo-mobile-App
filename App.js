import React, { useEffect, useState } from "react";
import { View } from "react-native";
import RootNavigation from "./src/navigation/RootNavigation";
import InlineError from "./src/components/InlineError";
import { registerGlobalErrorHandler } from "./src/api/axios";

const App = () => {
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    registerGlobalErrorHandler(setGlobalError);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <InlineError message={globalError} />
      <RootNavigation />
    </View>
  );
};

export default App;

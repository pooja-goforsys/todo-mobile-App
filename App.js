import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RootNavigation from "./src/navigation/RootNavigation";
import InlineError from "./src/components/InlineError";
import { registerGlobalErrorHandler } from "./src/api/axios";
import { ENV } from "./src/config/env";

const App = () => {
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    registerGlobalErrorHandler(setGlobalError);

    console.log("ENV TEST:", ENV);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.envBox}>
        <Text style={styles.envText}>
          ENV APP NAME: {ENV.APP_NAME}
        </Text>
        <Text style={styles.envText}>
          API URL: {ENV.API_BASE_URL}
        </Text>
      </View>

      <Text style={styles.defaultText}>
        Default System Font
      </Text>

      <Text style={styles.poppinsText}>
        Poppins Font Working
      </Text>

      <InlineError message={globalError} />
      <RootNavigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  envBox: {
    padding: 10,
    backgroundColor: "#eef",
  },
  envText: {
    fontSize: 14,
  },
  defaultText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
  poppinsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    marginLeft: 10,
    marginTop: 5,
  },
});

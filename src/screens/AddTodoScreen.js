import React, { useState } from "react";
import { View, Button, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { globalStyles } from "../styles/globalStyles";

const AddTodoScreen = () => {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={globalStyles.container}>
      <Button title="Pick Image" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
    </View>
  );
};

export default AddTodoScreen;

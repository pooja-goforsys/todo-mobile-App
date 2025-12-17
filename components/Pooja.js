// import { Text, View } from "react-native";

// const Pooja = () => {
//   return (
//     <View >
//       <Text style={{ fontSize: 20,backgroundColor: "red" , padding: 5 }}>Presented By : Pooja Sharma</Text>
//       console.log("hello react");
//     </View>
//   );
// };

// export default Pooja;



// -------------------
//props:

import { Text } from "react-native";

const Message = (props) => {
  return <Text style={{ fontSize: 20 }}>{props.text}</Text>;
};

export default Message;



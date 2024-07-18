// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Image,
//   SafeAreaView,
// } from "react-native";
// import Voice from "@react-native-voice/voice";
// import { Button, IconButton } from "@react-native-material/core";
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import ChatBubble from "react-native-chat-bubble";

// export default SpeechToText = () => {
//   const [messages, setMessages] = useState([]);
//   const [isListening, setIsListening] = useState(false);
//   const [recognizedText, setRecognizedText] = useState("");

//   useEffect(() => {
//     Voice.onSpeechStart = onSpeechStart;
//     Voice.onSpeechEnd = stopListening;
//     Voice.onSpeechResults = onSpeechResults;
//     Voice.onSpeechError = (e) => console.log("onSpeechError:  ", e);

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const startListening = async () => {
//     setIsListening(true);
//     try {
//       await Voice.start("en-US");
//     } catch (error) {
//       console.log("err in startListening:: ", error);
//       setIsListening(false);
//     }
//   };

//   const stopListening = async () => {
//     try {
//       Voice.removeAllListeners();
//       await Voice.stop();
//       setIsListening(false);
//     } catch (error) {}
//   };

//   const onSpeechStart = (evt) => {
//     console.log("recording started... : ", evt);
//   };

//   const onSpeechResults = (evt) => {
//     console.log("onSpeechResults:: ", evt);
//     const text = evt?.value?.[0] || "";
//     setRecognizedText(text);
//   };

//   const sendMessage = () => {
//     if (recognizedText) {
//       setMessages([...messages, { text: recognizedText, sender: "user" }]);
//       setRecognizedText("");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <SafeAreaView />
//       <ScrollView contentContainerStyle={styles.messagesContainer}>
//         {messages.map((message, index) => (
//           <View key={index}>
//             <ChatBubble
//               isOwnMessage={true}
//               bubbleColor="#1084ff"
//               tailColor="#1084ff"
//               withTail={true}
//               onPress={() => console.log("Bubble Pressed!")}
//             >
//               <Text>{message.text}</Text>
//             </ChatBubble>
//           </View>
//         ))}
//       </ScrollView>
//       <View style={styles.inputContainer}>
//         <TextInput
//           label="Label"
//           style={(flex = 1)}
//           placeholder="Type your message..."
//           value={recognizedText}
//           onChangeText={(text) => setRecognizedText(text)}
//           leading={(props) => <Icon name="account" {...props} />}
//         />

//         <IconButton
//           onPress={isListening ? stopListening : startListening}
//           icon={(props) => <Icon name="microphone" {...props} />}
//         />
//         <Button title="Send" onPress={sendMessage}></Button>
//       </View>
//     </View>
//   );
// };

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#DEF9C4",
//   },
//   messagesContainer: {
//     padding: 10,
//   },
//   messageBubble: {
//     maxWidth: "70%",
//     marginVertical: 5,
//     borderRadius: 10,
//     padding: 10,
//   },
//   messageText: {
//     color: "white",
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "white",
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     padding: 10,
//     borderRadius: 20,
//     backgroundColor: "#EFEFEF",
//   },
//   voiceButton: {
//     marginLeft: 10,
//     fontSize: 24,
//   },
//   voiceButtonText: {
//     fontSize: 24,
//     height: 45,
//   },
//   sendButton: {
//     marginLeft: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: "#FF6969",
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

import { View, Text } from "react-native";
import React from "react";

const SpeechToText = () => {
  return (
    <View>
      <Text>SpeechToText</Text>
    </View>
  );
};

export default SpeechToText;

import { StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { useState } from "react";

export default function MyScreen() {
  const [text, setText] = useState("");
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Page</Text>
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={10}
        placeholder="메모를 입력하세요"
        value={text}
        onChangeText={setText}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textArea: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
    borderRadius: 8,
  },
});

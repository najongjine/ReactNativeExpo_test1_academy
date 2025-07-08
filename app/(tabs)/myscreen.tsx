import { Button, ScrollView, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useState } from "react";

interface MyMemoType {
  id: number;
  content: string;
}
export default function MyScreen() {
  const [text, setText] = useState("");
  const [myMemo, setMyMemo] = useState<MyMemoType[]>([]);

  const handleAddMemo = () => {
    if (!text?.trim()) return;
    let newMemo: MyMemoType = {
      // 이거 문법 어렵다고 맨붕하시면 안됨. 어짜피 DB 연동 안한거라 큰 의미 없는 코드
      id: myMemo?.length > 0 ? myMemo[myMemo.length - 1].id + 1 : 1,
      content: text,
    };
    // 기존에 있는 list에서 새로운 데이터 붙여라
    setMyMemo([...myMemo, newMemo]);
    // text 데이터 초기화
    setText("");
    console.log("## myMemo:", myMemo);
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>My Page</Text>
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={10}
        placeholder="메모를 입력하세요"
        value={text}
        onChangeText={setText}
      />
      <Button title="눌러보세요" onPress={handleAddMemo} />

      <View style={{ padding: 20 }}>
        {myMemo?.length > 0 && (
          <View style={{ padding: 20 }}>
            {myMemo.map((item) => (
              <Text key={item.id} style={{ fontSize: 16, marginBottom: 8 }}>
                {item.id}. {item.content}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
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

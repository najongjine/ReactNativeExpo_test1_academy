import { Button, Modal, ScrollView, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import CustomModal from "@/components/CustomModal";

interface MyMemoType {
  id: number;
  content: string;
}
export default function MyScreen() {
  const [text, setText] = useState("");
  const [myMemo, setMyMemo] = useState<MyMemoType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState<MyMemoType | null>(null);

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
  };
  const handleUpdateMemo = (memo: MyMemoType) => {
    setSelectedMemo(memo); // 수정할 대상 선택
    setModalVisible(true); // 모달 열기
  };
  const handleDeleteMemo = (id: number) => {};
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
        {myMemo.length > 0 && (
          <View style={{ padding: 20 }}>
            {myMemo.map((memo) => (
              <View key={memo.id} style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>
                  {memo.id}. {memo.content}
                </Text>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Button title="수정" onPress={() => handleUpdateMemo(memo)} />
                  <Button
                    title="삭제"
                    onPress={() => handleDeleteMemo(memo.id)}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          memo={selectedMemo}
          onChangeText={() => {}}
          onSave={() => {}}
        />
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

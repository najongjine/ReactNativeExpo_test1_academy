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
  // 메모 작성 textarea 에 타이핑한거 저장됨
  const [text, setText] = useState("");
  // 메모작성하고 아래쪽에 뜨는 list 목록
  const [myMemo, setMyMemo] = useState<MyMemoType[]>([]);
  // 모달창 보이고 안보이게 하는 스위치 변수
  const [modalVisible, setModalVisible] = useState(false);
  // 수정버튼 눌렀을때 특정 메모 데이터를 여기다가 저장함
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
  const handleDeleteMemo = (id: number) => {
    if (id) setMyMemo((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMemoChange = (text: string) => {
    if (selectedMemo) {
      setSelectedMemo({ ...selectedMemo, content: text });
    }
  };
  const handUpdateMemo_Save = () => {
    let data = myMemo.find((e) => e?.id == selectedMemo?.id);
    console.log("## data: ", data);
    const updated = myMemo.map((item) =>
      item.id === data?.id ? selectedMemo : item
    );
    console.log("## updated: ", updated);
    //@ts-ignore
    setMyMemo(updated!); // ✅ 상태 업데이트
    setModalVisible(false);
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
      <Button title="새로작성" onPress={handleAddMemo} />

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

      {/* 부모 화면에 있는 화면 바인딩 변수들을 자식한테 넘겨주면 얘도 바인딩 기능이 작동함
      selectedMemo 변수를 자식한테 주니깐, 모달창에 우리가 작성했던 메모가 뜨는거임
      TextInput창에서 타이핑을 하면 데이터 바뀌게 하기 위해선 onChangeText 이부분에 set 함수
      바인딩 변수를 바꿔주는 함수를 발동 시켜야 한다.
      그래서 여기선 handleMemoChange 함수를 따로 만들고, 그 안에서 setSelectedMemo 함수를 호출함
       */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          memo={selectedMemo}
          onChangeText={handleMemoChange}
          onSave={handUpdateMemo_Save}
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

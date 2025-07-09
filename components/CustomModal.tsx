import React from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";

interface MyMemoType {
  id: number;
  content: string;
}

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  memo: MyMemoType | null;
  onChangeText: (text: string) => void;
  onSave: () => void;
}

export default function CustomModal({
  visible,
  onClose,
  memo,
  onChangeText,
  onSave,
}: CustomModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalBox}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={10}
            placeholder="메모를 입력하세요"
            value={memo?.content || ""}
            onChangeText={onChangeText}
          />
          <Button title="저장" onPress={onSave} />
          <Button title="닫기" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    height: 150,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: "top",
  },
});

import React from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  ModalProps,
} from "react-native";

interface CustomModalProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  text: string;
  setText: (text: string) => void;
}

export default function CustomModal({
  visible,
  onClose,
  text,
  setText,
  ...modalProps
}: CustomModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      {...modalProps}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalBox}>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={10}
            placeholder="메모를 입력하세요"
            value={text}
            onChangeText={setText}
          />
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

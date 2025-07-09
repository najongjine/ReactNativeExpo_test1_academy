import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  GestureResponderEvent,
} from "react-native";

interface CustomButtonProps {
  title: string;
  buttonColor?: string;
  textColor?: string;
  size?: "small" | "medium" | "large";
  align?: "left" | "center" | "right";
  onPress: (event: GestureResponderEvent) => void;
}

export default function CustomButton({
  title,
  buttonColor = "#2196F3",
  textColor = "#fff",
  size = "medium",
  align = "center",
  onPress,
}: CustomButtonProps) {
  const sizeStyle = {
    small: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 14 },
    medium: { paddingVertical: 10, paddingHorizontal: 20, fontSize: 16 },
    large: { paddingVertical: 14, paddingHorizontal: 24, fontSize: 18 },
  }[size];

  const alignMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  } as const;

  const alignStyle = alignMap[align];

  return (
    <View style={[styles.wrapper, { alignItems: alignStyle }]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: buttonColor,
            paddingVertical: sizeStyle.paddingVertical,
            paddingHorizontal: sizeStyle.paddingHorizontal,
          },
        ]}
      >
        <Text style={{ color: textColor, fontSize: sizeStyle.fontSize }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 5,
  },
  button: {
    borderRadius: 8,
  },
});

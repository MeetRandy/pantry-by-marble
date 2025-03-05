import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DividerWithText = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#54634B",
  },
  text: {
    marginHorizontal: 28.5,
    fontSize: 16,
    color: "#54634B",
  },
});

export default DividerWithText;

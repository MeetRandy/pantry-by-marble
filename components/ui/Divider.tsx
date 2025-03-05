import React from "react";
import { View, StyleSheet } from "react-native";

export default function Divider({ color = "#54634B", thickness = 15, marginVertical = 10 }) {
  return <View style={[styles.divider, { backgroundColor: color, height: thickness, marginVertical }]} />;
}

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    alignSelf: 'center',  // Full widt
    marginVertical: 24,
  },
});

import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground, Image, } from "react-native";

const CategoryGridTile = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.onPress();
        }}>
        <View style={styles.img}>
          <ImageBackground
            source={require("../assets/img_mobile/1_1.png")}
            style={styles.bgImage}>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={2}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    height: 220,
    // backgroundColor: "white",
  },
  gridItem: {
    // flex: 1,
    // margin: 15,
    height: 140,
  },
  img: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "flex-end",
  },
});

export default CategoryGridTile;

import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

const PlaceDetailScreen = ({ navigation }) => {
    return (
      <View style={styles.screen}>
        <Text>Palce Detail Screen</Text>
        <Button 
        title="หน้าแรก"
        onPress={() => {
          navigation.popToTop();
        }}>Next Page</Button>
      </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCE2F0"
  },

});

export default PlaceDetailScreen;
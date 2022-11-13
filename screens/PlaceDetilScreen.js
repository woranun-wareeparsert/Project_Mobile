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
import { longdo, map, LongdoMap } from "../components/Longdo";

const PlaceDetailScreen = ({ navigation }) => {
  const initMap = () => {
    map.Layers.setBase(longdo.Layers.GRAY);
  }
  const mapKey = '718724d3e36dd8a8a83c4cb47654b1de'
  return (
    <View style={styles.screen}>
      {/* <Text>Palce Detail Screen</Text>
      <Button
        title="หน้าแรก"
        color="#50586C"
        onPress={() => {
          navigation.popToTop();
        }}>Next Page</Button> */}
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCE2F0",
  },

});

export default PlaceDetailScreen;

import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";

import SelectList from 'react-native-dropdown-select-list'
import Axios from "axios";
import { useState, useEffect } from "react";

const SearchScreen = ({ navigation, route }) => {
  const [selectedstart, setSelectedstart] = React.useState("");
  const [selectedend, setSelectedend] = React.useState("");
  const [startStaion, onChangestartStaion] = React.useState("");
  const [endStation, onChangeendStation] = React.useState("");
  const [Bts, setBts] = React.useState([]);
  const [check, setCheck] = React.useState(0);

  const getBts = () => {
    Axios.get("http://localhost:3000/bts").then((res) => {
      let newArray = res.data.map((item) => {
        return { key: item.id, value: item.sname }
      })
      setBts(newArray);
      setCheck(1);
    }).catch((error) => {
      console.log("Api call error");
      alert(error.message);
    });
  }
  useEffect(() => {
    if (check == 0) {
      getBts()
    }
  })
  return (
    <View style={styles.screen}>
      <Text>สถานีเริ่มต้น</Text>
      <SelectList setSelected={setSelectedstart} data={Bts} onSelect={() => alert(selectedstart)} placeholder="เลือกสถานีเริ่มต้น" />
      <Text>สถานี/สถานที่ปลายทาง</Text>
      <SelectList setSelected={setSelectedend} data={Bts} onSelect={() => alert(selectedend)} placeholder="เลือกสถานีปลายทาง" />
      <Button
        title="ค้นหา"
        onPress={() => {
          if (selectedstart == "" || selectedend == "") {
            alert("กรุณาระบุสถานี")
          }
          else {
            navigation.navigate("Direction", { prev: "pathBts", start: selectedstart, end: selectedend })
          }
        }} />
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCE2F0",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#50586C",
    color: "#DCE2F0",
    borderRadius: "5px",
  }

});

export default SearchScreen;

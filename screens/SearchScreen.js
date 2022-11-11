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
  // const [checkstation, setCheckstation] = React.useState("");
  var checkstation = ""

  const getBts = () => {
    if (checkstation == "BTS" || checkstation == "") {
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        console.log("BTS")
        setBts(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    else if (checkstation == "MRT") {
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.tname }
        })
        console.log("MRT")
        setBts(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    setCheck(1);
  }
  useEffect(() => {
    if (check == 0) {
      getBts()
    }
  })
  return (
    <View style={styles.screen}>

      <View style={styles.screenbtn}>
        <Button
          title="BTS"
          color="#50586C"
          onPress={() => {
            // setCheckstation("BTS")
            checkstation = "BTS"
            getBts()
          }} />
        <View style={styles.space} />
        <Button
          title="MRT"
          color="#50586C"
          onPress={() => {
            // setCheckstation("MRT")
            checkstation = "MRT"
            getBts()
          }} />
      </View>


      <View style={styles.inscreen}>
        <Text style={styles.text}>สถานีเริ่มต้น</Text>
        <SelectList setSelected={setSelectedstart} data={Bts} onSelect={() => console.log(selectedstart)} placeholder="เลือกสถานีเริ่มต้น" />
        <Text style={styles.text}>สถานี/สถานที่ปลายทาง</Text>
        <SelectList setSelected={setSelectedend} data={Bts} onSelect={() => console.log(selectedend)} placeholder="เลือกสถานีปลายทาง" />
        <View style={styles.btn}>
          <Button
            title="ค้นหา"
            color="#50586C"
            onPress={() => {
              // if (selectedstart == "" || selectedend == "") {
              //   alert("กรุณาระบุสถานี")
              // }
              // else {
              navigation.navigate("Direction", { prev: "pathBts", start: selectedstart, end: selectedend })
              // }
            }} />
        </View>
      </View>
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
  screenbtn: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  space: {
    width: 30, // or whatever size you need
    height: 30,
  },
  inscreen: {
    height: "50%",
    minWidth: "65%",
    maxWidth: "90%",
    // backgroundColor: "white",
  },
  text: {
    marginVertical: 20,
    marginBottom: 10,
  },
  btn: {
    marginVertical: 20,
  }

});

export default SearchScreen;

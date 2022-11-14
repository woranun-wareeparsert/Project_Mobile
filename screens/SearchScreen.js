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

  const [Bts, setBts] = React.useState([]);
  const [Locations, setLocations] = React.useState([]);

  const [check, setCheck] = React.useState(0);
  const [checkstations, setCheckstations] = React.useState("BTS");
  const [checkstationsend, setCheckstationsend] = React.useState("");

  var checkstation = ""
  var checkstationend = ""

  const getBts = () => {
    //เริ่มมากดเลือก BTS เลย
    if (checkstation == "BTS" || checkstation == "" && checkstationend == "BTS" || checkstationend == "") {
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        console.log("BTS")
        setBts(newArray);
        setLocations(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    //BTS แล้วเลือก Location
    else if (checkstation == "BTS" || checkstation == "" && checkstationend == "LOCATION") {
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setBts(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
      Axios.get("http://localhost:3000/travelBts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.tname }
        })
        setLocations(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    else if (checkstation == "MRT") {
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        console.log("MRT")
        setBts(newArray);
        setLocations(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    //ยังไม่ทำ mrt เพราะยังไม่มีสถานที่ท่องเที่ยวของ mrt
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
            checkstation = "BTS"
            checkstationend = "BTS"
            setCheckstations("BTS")
            setCheckstationsend("BTS")
            getBts()
          }} />
        <View style={styles.space} />
        <Button
          title="MRT"
          color="#50586C"
          onPress={() => {
            checkstation = "MRT"
            checkstationend = "MRT"
            setCheckstations("MRT")
            setCheckstationsend("MRT")
            getBts()
          }} />
        <View style={styles.space} />
        <Button
          title="Location"
          color="#50586C"
          onPress={() => {
            checkstationend = "LOCATION"
            setCheckstationsend("LOCATION")
            getBts()
          }} />
      </View>


      <View style={styles.inscreen}>
        <Text style={styles.text}>สถานีเริ่มต้น</Text>
        <SelectList setSelected={setSelectedstart} data={Bts} onSelect={() => console.log(selectedstart)} placeholder="เลือกสถานีเริ่มต้น" />
        <Text style={styles.text}>สถานี/สถานที่ปลายทาง</Text>
        <SelectList setSelected={setSelectedend} data={Locations} onSelect={() => console.log(selectedend)} placeholder="เลือกสถานีปลายทาง" />
        <View style={styles.btn}>
          <Button
            title="ค้นหา"
            color="#50586C"
            onPress={() => {
              // if (selectedstart == "" || selectedend == "") {
              //   alert("กรุณาระบุสถานี")
              // }
              // else {
              navigation.navigate("Direction", { prev: "pathBts", start: selectedstart, end: selectedend, checkSTA: checkstations, checkSTAEnd: checkstationsend })
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

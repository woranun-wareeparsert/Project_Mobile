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

  const [startStation, setstartStation] = React.useState([]);
  const [endStation, setendStation] = React.useState([]);

  // const [Bts, setBts] = React.useState([]);
  const [check, setCheck] = React.useState(0);
  const [checkstation, setCheckstation] = React.useState("");
  const [checkendstation, setCheckendstation] = React.useState("");
  // let checkstation = ""
  // var checkendstation = ""

  const getBts = (checkstation, checkendstation) => {
    if ((checkstation == "BTS" ) && checkendstation == "location") {
      //Start Station
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        console.log("BTS")
        setstartStation(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
      //End Station
      Axios.get("http://localhost:3000/travelBts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.idbts, value: item.tname }
        })
        console.log("location")
        setendStation(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    else if (checkstation == "MRT" && checkendstation == "location") {
      //Start Station
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.tname }
        })
        console.log("MRT")
        setstartStation(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
      //End Station
      Axios.get("http://localhost:3000/travelBts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.idbts, value: item.tname }
        })
        console.log("location")
        setendStation(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    else if ((checkstation == "BTS" || checkstation == "") && checkendstation == "") {
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        console.log("BTS")
        setstartStation(newArray);
        setendStation(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    else if (checkstation == "MRT" && checkendstation == "") {
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.tname }
        })
        console.log("MRT")
        setstartStation(newArray);
        setendStation(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    setCheck(1);
  }
  useEffect(() => {
    if (check == 0) {
      getBts(checkstation, checkendstation)
    }
  }, [getBts]);
  return (
    <View style={styles.screen}>

      <View style={styles.screenbtn}>
        <Button
          title="BTS"
          color="#50586C"
          onPress={() => {
            setCheckstation("BTS")
            setCheckendstation("")
            // checkstation = "BTS"
            // checkendstation = ""
            getBts(checkstation, checkendstation)
          }} />
        <Button
          title="MRT"
          color="#50586C"
          onPress={() => {
            setCheckstation("MRT")
            setCheckendstation("")
            // checkstation = "MRT"
            // checkendstation = ""
            getBts(checkstation, checkendstation)
          }} />
        <Button
          title="location"
          color="#50586C"
          onPress={() => {
            setCheckstation(checkstation)
            setCheckendstation("location")
            // checkstation = checkstation
            // checkendstation = "location"
            getBts(checkstation, checkendstation)
          }} />
      </View>


      <View style={styles.inscreen}>
        <Text style={styles.text}>สถานีเริ่มต้น</Text>
        <SelectList setSelected={setSelectedstart} data={startStation} onSelect={() => console.log(selectedstart)} placeholder="เลือกสถานีเริ่มต้น" />
        <Text style={styles.text}>สถานี/สถานที่ปลายทาง</Text>
        <SelectList setSelected={setSelectedend} data={endStation} onSelect={() => console.log(selectedend)} placeholder="เลือกสถานีปลายทาง" />
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
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-around"
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

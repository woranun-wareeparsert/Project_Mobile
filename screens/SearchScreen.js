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
  Image,
  SafeAreaView,
  ScrollView,
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
  const [checkstationsend, setCheckstationsend] = React.useState("BTS");
  const [checkStart, setCheckStart] = React.useState("");
  const [checkEnd, setCheckEnd] = React.useState("");
  const [checkstationsend1, setCheckstationsend1] = React.useState("");
  const [checkstationsend2, setCheckstationsend2] = React.useState("");
  const [checkstationsend3, setCheckstationsend3] = React.useState("");

  var checkstation = "BTS";
  var checkstationend = "BTS";
  var checkGG = "1";

  const getBts = () => {
    //กดเลือก BTS บน
    if (checkstation == checkstations && checkstationend == checkstationsend && checkstationsend1 == "" || checkGG == "0") {
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setCheckStart("BTS")
        setCheckEnd("BTS")
        setBts(newArray);
        setLocations(newArray);
        setCheckstationsend1("")
        setCheckstationsend2("")
        setCheckstationsend3("")
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    //BTS บน แล้วเลือก MRT ล่าง
    else if (checkstation == checkstations && checkstationend != checkstationsend && checkstationend != "LOCATION" && checkstationsend1 == "") {
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setCheckStart("BTS")
        setCheckEnd("MRT")
        setBts(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setLocations(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    //BTS บน แล้วเลือก BTS ล่าง
    else if (checkstation == checkstations && checkstationend == checkstationsend && checkstationsend2 == "" && checkstationsend3 == "") {
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setCheckStart("BTS")
        setCheckEnd("BTS")
        setBts(newArray);
        setLocations(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    //BTS บน แล้วเลือก Location ล่าง
    else if (checkstation == checkstations && checkstationend == "LOCATION" && checkGG == "1" && checkstationsend2 == "") {
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
        setCheckStart("BTS")
        setCheckEnd("LOCATION")
        setLocations(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    //กดเลือก MRT บน
    else if (checkstation != checkstations && checkstationend != checkstationsend) {
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setCheckStart("MRT")
        setCheckEnd("MRT")
        setBts(newArray);
        setLocations(newArray);
        setCheckstationsend1("MRTTOBTS");
        setCheckstationsend2("MRTTOMRT");
        setCheckstationsend3("1");
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    //MRT บน แล้วเลือก BTS ล่าง
    else if (checkstation == checkstations && checkstationend == checkstationsend && checkstationsend1 == "MRTTOBTS" && checkstationsend3 == "1") {
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setCheckStart("MRT")
        setCheckEnd("BTS")
        setBts(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
      Axios.get("http://localhost:3000/bts").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setLocations(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    //MRT บน แล้วเลือก MRT ล่าง
    else if (checkstation == checkstations && checkstationend != checkstationsend && checkstationend != "LOCATION" && checkstationsend2 == "MRTTOMRT" && checkstationsend3 == "1") {
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let newArray = res.data.map((item) => {
          return { key: item.id, value: item.sname }
        })
        setCheckStart("MRT")
        setCheckEnd("MRT")
        setBts(newArray);
        setLocations(newArray);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    // //MRT บน แล้วเลือก Location ล่าง
    else if (checkstation == checkstations && checkstationend == "LOCATION" && checkstationsend1 != "" && checkstationsend2 != "") {
      Axios.get("http://localhost:3000/mrt").then((res) => {
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
        setCheckStart("MRT")
        setCheckEnd("LOCATION")
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
    <View style={styles.screen}>
      <View style={styles.screenbtn}>
        <Button
          title="BTS"
          color="#50586C"
          onPress={() => {
            checkstation = "BTS"
            checkstationend = "BTS"
            checkGG = "0";
            getBts()
          }} />
        <View style={styles.space} />
        <Button
          title="MRT"
          color="#50586C"
          onPress={() => {
            checkstation = "MRT"
            checkstationend = "MRT"
            getBts()
          }} />
      </View>


      <View style={styles.inscreen}>
        <Text style={styles.text}>สถานีเริ่มต้น</Text>
        <SelectList setSelected={setSelectedstart} data={Bts} onSelect={() => console.log(selectedstart)} placeholder="เลือกสถานีเริ่มต้น" />
        <Text style={styles.text}>สถานี/สถานที่ปลายทาง</Text>
        <SelectList setSelected={setSelectedend} data={Locations} onSelect={() => console.log(selectedend)} placeholder="เลือกสถานีปลายทาง" />

        <View style={styles.btn}>
        <View style={styles.screenbtn}>
            <Button
              title="BTS"
              color="#50586C"
              onPress={() => {
                checkstationend = "BTS"
                checkGG == "0"
                getBts()
              }} />
            <View style={styles.space} />
            <Button
              title="MRT"
              color="#50586C"
              onPress={() => {
                checkstationend = "MRT"
                getBts()
              }} />
            <View style={styles.space} />
            <Button
              title="Location"
              color="#50586C"
              onPress={() => {
                checkstationend = "LOCATION"
                getBts()
              }} />
          </View>
        </View>
        <Button
            title="ค้นหา"
            color="#50586C"
            margin={10}
            onPress={() => {
              // if (selectedstart == "" || selectedend == "") {
              //   alert("กรุณาระบุสถานี")
              // }
              // else {
                // console.log(selectedstart)
                // console.log(selectedend)
                console.log(checkstations)
                console.log(checkstationsend)
              navigation.navigate("Direction", { prev: "pathBts", start: selectedstart, end: selectedend, checkSTA: checkStart, checkSTAEnd: checkEnd })
              // }
            }} />
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#DCE2F0",
  },
  screen: {
    flex: 1,
    marginVertical: "10%",
    alignItems: "center",
    backgroundColor: "#DCE2F0",
  },
  screenbtn: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  space: {
    width: 30,
    height: 30,
  },
  inscreen: {
    height: "50%",
    minWidth: "65%",
    maxWidth: "90%",
  },
  text: {
    marginVertical: 20,
    marginBottom: 10,
  },
  btn: {
    marginVertical: 20,
  },
  image: {
    width: 50,
    height: 50
  }

});

export default SearchScreen;

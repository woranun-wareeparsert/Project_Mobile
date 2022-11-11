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
import Axios from "axios";
import { useState, useEffect } from "react";


const DirectionScreen = ({ navigation, route }) => {
  const { prev, start, end } = route.params;
  const [direcBts, setdirecBts] = React.useState([]);
  const [check, setCheck] = React.useState(0);
  const [direcpass, setdirecpass] = React.useState([]);
  const [cost, setCost] = React.useState([]);
  const [stationAll, setstationAll] = React.useState([]);

  const getBtsDirect = () => {
    Axios.get("http://localhost:3000/direcBts").then((res) => {
      let valstart = res.data.filter((val) => {
        return val.id == start
      })
      let valend = res.data.filter((val) => {
        return val.id == end
      })
      setdirecBts(res.data);
      setCheck(1);
      let myloop = [];

      //sukhumvit ไป sukhumvit แบบ บนลงล่าง
      if (valstart[0].id < valend[0].id && valstart[0].type == "sukhumvit" && valend[0].type == "sukhumvit") {
        for (let i = valstart[0].id; i <= valend[0].id; i++) {
          res.data.forEach(function (item, index) {
            if (item.sta_id == i && item.type == "sukhumvit") {
              myloop.push(item);
            }
          })
        }
        setdirecpass(myloop);
      }
      //silom ไป silom แบบ บนลงล่าง
      else if (valstart[0].id < valend[0].id && valstart[0].type == "silom" && valend[0].type == "silom") {
        for (let i = valstart[0].id; i <= valend[0].id; i++) {
          res.data.forEach(function (item, index) {
            if (item.id == i && item.type == "silom") {
              myloop.push(item);
            }
          })
        }
        setdirecpass(myloop);
      }
      //sukhumvit ไป sukhumvit แบบ ล่างขึ้นบน 
      else if (valstart[0].id > valend[0].id && valstart[0].type == "sukhumvit" && valend[0].type == "sukhumvit") {
        for (let i = valstart[0].id; i >= valend[0].id; i--) {
          res.data.forEach(function (item, index) {
            if (item.sta_id == i && item.type == "sukhumvit") {
              myloop.push(item);
            }
          })
        }
        setdirecpass(myloop);
      }
      //silom ไป silom แบบ ล่างขึ้นบน
      else if (valstart[0].id > valend[0].id && valstart[0].type == "silom" && valend[0].type == "silom") {
        for (let i = valstart[0].id; i >= valend[0].id; i--) {
          res.data.forEach(function (item, index) {
            if (item.id == i && item.type == "silom") {
              myloop.push(item);
            }
          })
        }
        setdirecpass(myloop);
      }
      //เปลี่ยนสาย sukhumvit ไป silom แบบบนลงล่าง ก่อนสถานี Siam
      else if (valstart[0].sta_id < 24 && valstart[0].type == "sukhumvit" && valend[0].type == "silom") {
        for (let i = valstart[0].sta_id; i <= 24; i++) {
          res.data.forEach(function (item, index) {
            if (item.id == i && item.type == "sukhumvit") {
              myloop.push(item);
            }
          })
        }
        if (valend[0].sta_id == 1) {
          res.data.forEach(function (item, index) {
            if (item.sta_id == 1 && item.type == "silom") {
              myloop.push(item);
            }
          })
        } else {
          for (let i = 3; i <= valend[0].sta_id; i++) {
            res.data.forEach(function (item, index) {
              if (item.sta_id == i && item.type == "silom") {
                myloop.push(item);
              }
            })
          }
        }
        setdirecpass(myloop);
      }
      //เปลี่ยนสาย sukhumvit ไป silom แบบบนลงล่าง หลังสถานี Siam
      else if (valstart[0].sta_id > 24 && valstart[0].type == "sukhumvit" && valend[0].type == "silom") {
        for (let i = valstart[0].sta_id; i >= 24; i--) {
          res.data.forEach(function (item, index) {
            if (item.id == i && item.type == "sukhumvit") {
              myloop.push(item);
            }
          })
        }
        if (valend[0].sta_id == 1) {
          res.data.forEach(function (item, index) {
            if (item.sta_id == 1 && item.type == "silom") {
              myloop.push(item);
            }
          })
        } else {
          for (let i = 3; i <= valend[0].sta_id; i++) {
            res.data.forEach(function (item, index) {
              if (item.sta_id == i && item.type == "silom") {
                myloop.push(item);
              }
            })
          }
        }
        setdirecpass(myloop);
      }
      //เปลี่ยนสาย silom ไป sukhumvit แบบล่างขึ้นบน (จากสนามกีฬาแห่งชาติ)
      else if (valstart[0].sta_id < 2 && valstart[0].type == "silom" && valend[0].type == "sukhumvit" || valend[0].type == "silom") {
        for (let i = valstart[0].sta_id; i < 2; i++) {
          res.data.forEach(function (item, index) {
            if (item.sta_id == i && item.type == "silom") {
              myloop.push(item);
            }
          })
        }
        if (valend[0].sta_id == 24) {
          res.data.forEach(function (item, index) {
            if (item.sta_id == 24 && item.type == "sukhumvit") {
              myloop.push(item);
            }
          })
        } else if (valend[0].sta_id < 24) {
          for (let i = 24; i >= valend[0].sta_id; i--) {
            res.data.forEach(function (item, index) {
              if (item.sta_id == i && item.type == "sukhumvit") {
                myloop.push(item);
              }
            })
          }
        } else if (valend[0].sta_id > 24) {
          for (let i = 24; i <= valend[0].sta_id; i++) {
            res.data.forEach(function (item, index) {
              if (item.sta_id == i && item.type == "sukhumvit") {
                myloop.push(item);
              }
            })
          }
        }
        setdirecpass(myloop);
      }
      //เปลี่ยนสาย silom ไป sukhumvit แบบล่างขึ้นบน (จากราชดำริ)
      else if (valstart[0].sta_id > 2 && valstart[0].type == "silom" && valend[0].type == "sukhumvit" || valend[0].type == "silom") {
        for (let i = valstart[0].sta_id; i > 2; i--) {
          res.data.forEach(function (item, index) {
            if (item.sta_id == i && item.type == "silom") {
              myloop.push(item);
            }
          })
        }
        if (valend[0].sta_id < 24) {
          for (let i = 24; i >= valend[0].sta_id; i--) {
            res.data.forEach(function (item, index) {
              if (item.sta_id == i && item.type == "sukhumvit") {
                myloop.push(item);
              }
            })
          }
        } 
        else if (valend[0].sta_id > 24) {
          for (let i = 24; i <= valend[0].sta_id; i++) {
            res.data.forEach(function (item, index) {
              if (item.sta_id == i && item.type == "sukhumvit") {
                myloop.push(item);
              }
            })
          }
        }
        else if (valend[0].sta_id == 24) {
          res.data.forEach(function (item, index) {
            if (item.sta_id == 24 && item.type == "sukhumvit") {
              myloop.push(item);
            }
          })
        }
        setdirecpass(myloop);
      }
      setstationAll(myloop);
      //คิดค่าโดยสาร BTS
      if (myloop == 0) {
        setCost(0)
      }
      else if (myloop.length == 2) {
        setCost(16)
      }
      else if (myloop.length == 3) {
        setCost(23)
      }
      else if (myloop.length == 4) {
        setCost(26)
      }
      else if (myloop.length == 5) {
        setCost(30)
      }
      else if (myloop.length == 6) {
        setCost(33)
      }
      else if (myloop.length == 7) {
        setCost(37)
      }
      else if (myloop.length == 8) {
        setCost(40)
      }
      else {
        setCost(44)
      }
    }).catch((error) => {
      console.log("Api call error");
      alert(error.message);
    });
  }
  useEffect(() => {
    if (check == 0) {
      getBtsDirect()
    }
  })
  const renderCategories = (item) => {
    return (<Text style={styles.text}>{item.item.sname}</Text>)
  }
  return (
    <View style={styles.screen}>
      <View style={styles.screentop}>
        <FlatList data={direcpass} renderItem={renderCategories} numColumns={1} />
      </View>
      <Text>Direction Screen</Text>
      <Text>ราคาค่าโดยสาร : {cost}</Text>
      <Button
        title="เส้นทางเพิ่มเติม"
        onPress={() => {
          navigation.navigate("Travel", { prev: "pathBts", Allsta: stationAll})
        }}>Next Page</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCE2F0",
    padding: 10,
  },
  screentop: {
    width: "80%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ACE2F0",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    backgroundColor: "green",
    fontSize: 18,
  }

});

export default DirectionScreen;
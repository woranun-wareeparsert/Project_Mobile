import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  SafeAreaView,
  ScrollView,
  // Modal,
} from "react-native";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons'


const DirectionScreen = ({ navigation, route }) => {
  const { prev, start, end } = route.params;
  const [direcBts, setdirecBts] = React.useState([]);
  const [check, setCheck] = React.useState(0);
  const [direcpass, setdirecpass] = React.useState([]);
  const [cost, setCost] = React.useState([]);
  const [stationAll, setstationAll] = React.useState([]);
  var num = 0

  // const [modalVisible, setModalVisible] = useState(true);

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
      // setstationAll(myloop);

      //คิดค่าโดยสาร BTS
      Axios.get("http://localhost:3000/costs").then((res) => {
        let getCost = res.data.forEach(function (item) {
          if (myloop.length == item.num_stat) {
            console.log(item.num_stat)
            console.log(item.cost)
            setCost(item.cost);
          }
          else if (myloop.length > 9) {
            setCost(44);
          }
        })
      });
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
    num++
    if (start == item.item.id || end == item.item.id) {
      return (<View style={styles.station}><Ionicons name="ellipsis-vertical" size={24} color={"black"} /><Text style={styles.text}>{item.item.sname}</Text></View>)
    }
    //  ต้องมีวิธีคิดอีกอันที่ ถ้าการแสดงผลชื่อสถานีมันเยอะก็จะให้มันแสดงเป็น ... แทนตรงระหว่างทาง
    else {
      return (<View style={styles.station}><Ionicons name="ellipsis-vertical" size={24} color={"black"} /><Text style={styles.text_ect}>{item.item.sname}</Text></View>)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.screentop}>
            <Ionicons name="bus" size={24} color={"black"} />
            <FlatList data={direcpass} renderItem={renderCategories} numColumns={1} />
            <Ionicons name="bus" size={24} color={"black"} />
          </View>
          <Text style={styles.txt}>ราคาค่าโดยสาร :
            <Text style={styles.text_cost}> {cost} ฿</Text></Text>
          <Button
            title="สถานที่ท่องเที่ยว"
            color="#50586C"
            onPress={() => {
              navigation.navigate("Travel", { prev: "pathBts", Endstation: end });
            }} />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#DCE2F0",
  },
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DCE2F0",
    padding: 10,
    marginVertical: "5%",
  },
  station: {
    marginBottom: 5,
    flexDirection: "row",
  },
  screentop: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold"
  },
  text_ect: {
    marginLeft: 15,
    fontSize: 18,
  },
  txt: {
    margin: 20,
    fontSize: 20,
  },
  text_cost: {
    fontSize: 30,
    fontWeight: "bold"
  },

});

export default DirectionScreen;

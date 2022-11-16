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
  const { prev, start, end, checkSTA, checkSTAEnd } = route.params;
  const [direcBts, setdirecBts] = React.useState([]);
  const [check, setCheck] = React.useState(0);
  const [direcpass, setdirecpass] = React.useState([]);
  const [cost, setCost] = React.useState([]);
  const [cost3, setCost3] = React.useState("");
  const [cost4, setCost4] = React.useState("");
  const [stationAll, setstationAll] = React.useState([]);
  var num = 0

  // const [modalVisible, setModalVisible] = useState(true);

  const getBtsDirect = () => {
    if (checkSTA == "BTS" && checkSTAEnd == "BTS" || checkSTAEnd == "") {
      Axios.get("http://localhost:3000/direcBts").then((res) => {
        let valstart = res.data.filter((val) => {
          return val.id == start
        })
        let valend = res.data.filter((val) => {
          return val.id == end
        })
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
        //คิดค่าโดยสาร
        Axios.get("http://localhost:3000/costs").then((res) => {
          let getCost = res.data.forEach(function (item) {
            if (myloop.length == item.num_stat && checkSTA == "BTS") {
              setCost(item.cost);
            }
            else if (myloop.length > 9 && checkSTA == "BTS") {
              setCost(44);
            }
            else if (myloop.length == item.num_stat && checkSTA == "MRT") {
              setCost(item.cost_mrt);
            } else if (myloop.length > 13 && checkSTA == "MRT") {
              setCost(item.cost_mrt);
            }
          })
        });
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    else if (checkSTA == "BTS" && checkSTAEnd == "MRT") {
      Axios.get("http://localhost:3000/direcBts").then((res) => {
        let valstart = res.data.filter((val) => {
          return val.id == start
        })
        let myloop = [];
        let myloop1 = [];
        let myloop2 = [];
        if (valstart[0].id < 17 && valstart[0].type == "sukhumvit") {
          for (let i = valstart[0].id; i < 17; i++) {
            res.data.forEach(function (item, index) {
              if (item.id == i) {
                myloop.push(item);
                myloop1.push(item);
              }
            })
          }
        } else if (valstart[0].id > 27 && valstart[0].type == "sukhumvit") {
          for (let i = valstart[0].id; i > 27; i--) {
            res.data.forEach(function (item, index) {
              if (item.id == i) {
                myloop.push(item);
                myloop1.push(item);
              }
            })
          }
        } else if (valstart[0].id >= 48 && valstart[0].id <= 55 && valstart[0].type == "silom") {
          if (valstart[0].id >= 48 && valstart[0].id <= 51) {
            for (let i = valstart[0].id; i <= 51; i++) {
              res.data.forEach(function (item, index) {
                if (item.id == i) {
                  myloop.push(item);
                  myloop1.push(item);
                }
              })
            }
          }
        }
        Axios.get("http://localhost:3000/mrt").then((res) => {
          let valend = res.data.filter((val) => {
            return val.id == end
          })
          //sukhumvit ไป mrt N9
          if (valstart[0].id < 17 && valstart[0].type == "sukhumvit") {
            if (valstart[0].id < 17 && valend[0].id > 73 && valend[0].id < 90 && valstart[0].type == "sukhumvit") {
              for (let i = 74; i <= valend[0].id; i++) {
                res.data.forEach(function (item, index) {
                  if (item.id == i) {
                    myloop.push(item);
                    myloop2.push(item);
                  }
                })
              }
              setdirecpass(myloop);
            } else if (valstart[0].id < 17 && valend[0].id < 74 || valend[0].id >= 90 && valstart[0].type == "sukhumvit") {
              if (valend[0].id < 74) {
                for (let i = 74; i >= valend[0].id; i--) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                    }
                  })
                }
                setdirecpass(myloop);
              } else if (valend[0].id == 93) {
                for (let i = 74; i >= 62; i--) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                    }
                  })
                }
                res.data.forEach(function (item, index) {
                  if (item.id == 93) {
                    myloop.push(item);
                  }
                })
                setdirecpass(myloop);
              } else if (valend[0].id < 93 && valend[0].id >= 90) {
                for (let i = 74; i >= 62; i--) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                    }
                  })
                }
                for (let i = 93; i >= valend[0].id; i--) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                    }
                  })
                }
                setdirecpass(myloop);
              } else if (valend[0].id > 93 && valend[0].id <= 99) {
                for (let i = 74; i >= 62; i--) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                    }
                  })
                }
                for (let i = 93; i <= valend[0].id; i++) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                    }
                  })
                }
                setdirecpass(myloop);
              }
            }
          }
          //sukhumvit ไป mrt E4
          else if (valstart[0].id > 27 && valstart[0].type == "sukhumvit") {
            if (valstart[0].id > 27 && valend[0].id > 65 && valend[0].id < 83 && valstart[0].type == "sukhumvit") {
              for (let i = 82; i >= valend[0].id; i--) {
                res.data.forEach(function (item, index) {
                  if (item.id == i) {
                    myloop.push(item);
                    myloop2.push(item);
                  }
                })
              }
              setdirecpass(myloop);
            } else if (valstart[0].id > 27 && valend[0].id <= 65 || valend[0].id <= 99 && valstart[0].type == "sukhumvit") {
              if (valend[0].id <= 65) {
                for (let i = 82; i <= 93; i++) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                      myloop2.push(item);
                    }
                  })
                }
                for (let i = 62; i <= valend[0].id; i++) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                      myloop2.push(item);
                    }
                  })
                }
                setdirecpass(myloop);
              }
              else if (valend[0].id <= 99) {
                for (let i = 82; i <= 93; i++) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                      myloop2.push(item);
                    }
                  })
                }
                for (let i = 94; i <= valend[0].id; i++) {
                  res.data.forEach(function (item, index) {
                    if (item.id == i) {
                      myloop.push(item);
                    }
                  })
                }
                setdirecpass(myloop);
              }
            }
          }
          //silom ไป mrt S2
          else if (valstart[0].id >= 48 && valstart[0].id <= 55 && valstart[0].type == "silom") {
            if (valend[0].id <= 86 && valend[0].id >= 70 && valstart[0].type == "silom") {
              for (let i = 86; i >= valend[0].id; i--) {
                res.data.forEach(function (item, index) {
                  if (item.id == i) {
                    myloop.push(item);
                    myloop2.push(item);
                  }
                })
              }
              setdirecpass(myloop)
            } else if (valend[0].id >= 62 && valend[0].id <= 69 && valstart[0].type == "silom") {
              for (let i = 86; i <= 93; i++) {
                res.data.forEach(function (item, index) {
                  if (item.id == i) {
                    myloop.push(item);
                    myloop2.push(item);
                  }
                })
              }
              for (let i = 62; i <= valend[0].id; i++) {
                res.data.forEach(function (item, index) {
                  if (item.id == i) {
                    myloop.push(item);
                    myloop2.push(item);
                  }
                })
              }
              setdirecpass(myloop)
            } else if (valend[0].id <= 99 && valend[0].id >= 86 && valstart[0].type == "silom") {
              for (let i = 86; i <= valend[0].id; i++) {
                res.data.forEach(function (item, index) {
                  if (item.id == i) {
                    myloop.push(item);
                    myloop2.push(item);
                  }
                })
              }
              setdirecpass(myloop)
            }
          }
        });
        // คิดค่าโดยสาร
        Axios.get("http://localhost:3000/costs").then((res) => {
          let getCost = res.data.forEach(function (item) {
            if (myloop1.length == item.num_stat && checkSTA == "BTS") {
              setCost3(item.cost)
            }
            else if (myloop1.length > 9 && checkSTA == "BTS") {
              setCost3(44)
            }
          })
          let getCost1 = res.data.forEach(function (item) {
            if (myloop2.length == item.num_stat && checkSTAEnd == "MRT") {
              setCost4(item.cost_mrt);
            } else if (myloop2.length > 13 && checkSTAEnd == "MRT") {
              setCost4(42);
            }
          })
        });
        setCheck(1);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    else if (checkSTA == "MRT" && checkSTAEnd == "MRT") {
      Axios.get("http://localhost:3000/mrt").then((res) => {
        let valstart = res.data.filter((val) => {
          return val.id == start
        })
        let valend = res.data.filter((val) => {
          return val.id == end
        })
        setCheck(1);
        let myloop1 = [];
        //แบบ บนลงล่าง
        if (valstart[0].id < valend[0].id) {
          for (let i = valstart[0].id; i <= valend[0].id; i++) {
            res.data.forEach(function (item, index) {
              if (item.sta_id == i) {
                myloop1.push(item);
              }
            })
          }
          console.log(myloop1);
          setdirecpass(myloop1);
        }
        //คิดค่าโดยสาร
        Axios.get("http://localhost:3000/costs").then((res) => {
          let getCost = res.data.forEach(function (item) {
            if (myloop1.length == item.num_stat && checkSTA == "BTS") {
              setCost(item.cost);
            }
            else if (myloop1.length > 9 && checkSTA == "BTS") {
              setCost(44);
            }
            else if (myloop1.length == item.num_stat && checkSTA == "MRT") {
              setCost(item.cost_mrt);
            } else if (myloop1.length > 13 && checkSTA == "MRT") {
              setCost(item.cost_mrt);
            }
          })
        });
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
    else if (checkSTA == "BTS" && checkSTAEnd == "LOCATION") {
      Axios.get("http://localhost:3000/travelBts").then((res) => {
        let valend = res.data.filter((val) => {
          return val.id == end
        })
        let myloop = [];
        //ปลายทาง Location
        Axios.get("http://localhost:3000/direcBts").then((res) => {
          let valstart = res.data.filter((val) => {
            return val.id == start
          })
          let valtravel = res.data.filter((val) => {
            return val.id == valend[0].idbts
          })
          if (valstart[0].id != valtravel[0].id) {
            //sukhumvit ไป sukhumvit แบบ บนลงล่าง
            if (valstart[0].id < valtravel[0].id && valstart[0].type == "sukhumvit" && valtravel[0].type == "sukhumvit") {
              for (let i = valstart[0].id; i <= valtravel[0].id; i++) {
                res.data.forEach(function (item, index) {
                  if (item.sta_id == i && item.type == "sukhumvit") {
                    myloop.push(item);
                  }
                })
              }
              setdirecpass(myloop);
            }
            //silom ไป silom แบบ บนลงล่าง
            else if (valstart[0].id < valtravel[0].id && valstart[0].type == "silom" && valtravel[0].type == "silom") {
              for (let i = valstart[0].id; i <= valtravel[0].id; i++) {
                res.data.forEach(function (item, index) {
                  if (item.id == i && item.type == "silom") {
                    myloop.push(item);
                  }
                })
              }
              setdirecpass(myloop);
            }
            //sukhumvit ไป sukhumvit แบบ ล่างขึ้นบน 
            else if (valstart[0].id > valtravel[0].id && valstart[0].type == "sukhumvit" && valtravel[0].type == "sukhumvit") {
              for (let i = valstart[0].id; i >= valtravel[0].id; i--) {
                res.data.forEach(function (item, index) {
                  if (item.sta_id == i && item.type == "sukhumvit") {
                    myloop.push(item);
                  }
                })
              }
              setdirecpass(myloop);
            }
            //silom ไป silom แบบ ล่างขึ้นบน
            else if (valstart[0].id > valtravel[0].id && valstart[0].type == "silom" && valtravel[0].type == "silom") {
              for (let i = valstart[0].id; i >= valtravel[0].id; i--) {
                res.data.forEach(function (item, index) {
                  if (item.id == i && item.type == "silom") {
                    myloop.push(item);
                  }
                })
              }
              setdirecpass(myloop);
            }
            //เปลี่ยนสาย sukhumvit ไป silom แบบบนลงล่าง ก่อนสถานี Siam
            else if (valstart[0].sta_id < 24 && valstart[0].type == "sukhumvit" && valtravel[0].type == "silom") {
              for (let i = valstart[0].sta_id; i <= 24; i++) {
                res.data.forEach(function (item, index) {
                  if (item.id == i && item.type == "sukhumvit") {
                    myloop.push(item);
                  }
                })
              }
              if (valtravel[0].sta_id == 1) {
                res.data.forEach(function (item, index) {
                  if (item.sta_id == 1 && item.type == "silom") {
                    myloop.push(item);
                  }
                })
              } else {
                for (let i = 3; i <= valtravel[0].sta_id; i++) {
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
            else if (valstart[0].sta_id > 24 && valstart[0].type == "sukhumvit" && valtravel[0].type == "silom") {
              for (let i = valstart[0].sta_id; i >= 24; i--) {
                res.data.forEach(function (item, index) {
                  if (item.id == i && item.type == "sukhumvit") {
                    myloop.push(item);
                  }
                })
              }
              if (valtravel[0].sta_id == 1) {
                res.data.forEach(function (item, index) {
                  if (item.sta_id == 1 && item.type == "silom") {
                    myloop.push(item);
                  }
                })
              } else {
                for (let i = 3; i <= valtravel[0].sta_id; i++) {
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
            else if (valstart[0].sta_id < 2 && valstart[0].type == "silom" && valtravel[0].type == "sukhumvit" || valtravel[0].type == "silom") {
              for (let i = valstart[0].sta_id; i < 2; i++) {
                res.data.forEach(function (item, index) {
                  if (item.sta_id == i && item.type == "silom") {
                    myloop.push(item);
                  }
                })
              }
              if (valtravel[0].sta_id == 24) {
                res.data.forEach(function (item, index) {
                  if (item.sta_id == 24 && item.type == "sukhumvit") {
                    myloop.push(item);
                  }
                })
              } else if (valtravel[0].sta_id < 24) {
                for (let i = 24; i >= valtravel[0].sta_id; i--) {
                  res.data.forEach(function (item, index) {
                    if (item.sta_id == i && item.type == "sukhumvit") {
                      myloop.push(item);
                    }
                  })
                }
              } else if (valtravel[0].sta_id > 24) {
                for (let i = 24; i <= valtravel[0].sta_id; i++) {
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
            else if (valstart[0].sta_id > 2 && valstart[0].type == "silom" && valtravel[0].type == "sukhumvit" || valtravel[0].type == "silom") {
              for (let i = valstart[0].sta_id; i > 2; i--) {
                res.data.forEach(function (item, index) {
                  if (item.sta_id == i && item.type == "silom") {
                    myloop.push(item);
                  }
                })
              }
              if (valtravel[0].sta_id < 24) {
                for (let i = 24; i >= valtravel[0].sta_id; i--) {
                  res.data.forEach(function (item, index) {
                    if (item.sta_id == i && item.type == "sukhumvit") {
                      myloop.push(item);
                    }
                  })
                }
              }
              else if (valtravel[0].sta_id > 24) {
                for (let i = 24; i <= valtravel[0].sta_id; i++) {
                  res.data.forEach(function (item, index) {
                    if (item.sta_id == i && item.type == "sukhumvit") {
                      myloop.push(item);
                    }
                  })
                }
              }
              else if (valtravel[0].sta_id == 24) {
                res.data.forEach(function (item, index) {
                  if (item.sta_id == 24 && item.type == "sukhumvit") {
                    myloop.push(item);
                  }
                })
              }
              setdirecpass(myloop);
            }
            console.log(valstart)
            console.log(valtravel)
          }
          console.log(myloop);
        });
        //คิดค่าโดยสาร
        Axios.get("http://localhost:3000/costs").then((res) => {
          let getCost = res.data.forEach(function (item) {
            if (myloop.length == item.num_stat && checkSTA == "BTS") {
              setCost(item.cost);
            }
            else if (myloop.length > 9 && checkSTA == "BTS") {
              setCost(44);
            }
            else if (myloop.length == item.num_stat && checkSTA == "MRT") {
              setCost(item.cost_mrt);
            } else if (myloop.length > 13 && checkSTA == "MRT") {
              setCost(item.cost_mrt);
            }
          })
        });
        setCheck(1);
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    }
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
        <View style={styles.screen}>
          <View style={styles.screentop}>
          <ScrollView>
            <Ionicons name="bus" size={24} color={"black"} />
            <FlatList data={direcpass} renderItem={renderCategories} numColumns={1} />
            <Ionicons name="bus" size={24} color={"black"} />
            </ScrollView>
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
    // margin: "5%",
    alignItems: "center",
    backgroundColor: "#DCE2F0",
    padding: 10,
    paddingTop: "15%",
    // marginVertical: "5%",
  },
  station: {
    marginBottom: 5,
    flexDirection: "row",
  },
  screentop: {
    width: "80%",
    minHeight: "20%",
    maxHeight: "50%",
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

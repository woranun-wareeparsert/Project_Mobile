import React from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Pressable,
    Modal,
    Alert,
    Image,
    ScrollView,
    SafeAreaView
} from "react-native";
import Axios from "axios";
import { useState, useEffect } from "react";
import CategoryGridTile from "../components/CategoryGridTile";

const TravelScreen = ({ navigation, route }) => {
    const { prev, Endstation } = route.params;
    const [direcpass, setdirecpass] = React.useState([]);
    const [check, setCheck] = React.useState(0);

    var IdImage = 0;
    const [allimage, setallimage] = React.useState([]);

    //open-close Modal
    const [visible, setVisible] = React.useState(false);
    const showModal = (item) => {
        IdImage = item.item.id;
        setVisible(true);
        let myloop1 = [];
        Axios.get("http://localhost:3000/img_travel").then((res) => {
            res.data.forEach(function (item1, index) {
                if (item1.travel_id == IdImage) {
                    myloop1.push(item1.image);
                }
            })
            setallimage(myloop1);
        });
    }
    const hideModal = () => setVisible(false);

    const getBtsDirect = () => {
        Axios.get("http://localhost:3000/travelBts").then((res) => {
            let myloop = [];
            res.data.forEach(function (item1, index) {
                if (Endstation == item1.idbts) {
                    myloop.push(item1);
                }
            })
            setdirecpass(myloop);
            setCheck(1);
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
        return (
            <CategoryGridTile
                style={styles.text}
                title={item.item.tname}
                color="#50586C"
                onPress={() => showModal(item)}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.screen}>
                    <Modal animationType="fade" transparent={true} visible={visible} onDismiss={hideModal}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.showimage}>
                                    <ScrollView
                                        horizontal={true}
                                        style={styles.contentContainer}>
                                        <FlatList
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            style={styles.task}
                                            data={allimage}
                                            renderItem={({ item, index }) => (
                                                <Image
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false}
                                                    source={require("../assets/" + item)}
                                                    key={index}
                                                    style={{
                                                        width: 260,
                                                        height: 300,
                                                        // borderWidth: 2,
                                                        resizeMode: 'cover',
                                                        resizeMode: 'contain',
                                                        margin: 8
                                                    }}></Image>
                                            )} />
                                    </ScrollView>
                                </View>

                                <Text style={styles.modalText}>Hello World!</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={hideModal}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </View>

                        </View>

                    </Modal>

                    <View style={styles.screentop}>
                        <FlatList style={styles.task} data={direcpass} renderItem={renderCategories} numColumns={2} />
                    </View>
                    <Button
                        title="เส้นทางเพิ่มเติม"
                        color="#50586C"
                        onPress={() => {
                            navigation.navigate("Detail");
                        }}>Next Page</Button>
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
        height: "100%",
        flex: 1,
        alignItems: "center",
        backgroundColor: "#DCE2F0",
        padding: 10,
    },
    screentop: {
        width: "100%",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    text: {
        backgroundColor: "green",
        fontSize: 18,
    },
    img: {
        width: 50,
        height: 50,
    },
    showimage: {
        width: "100%",

    },
    task: {
        padding: 10,
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(80, 88, 108,.5)",
    },
    modalView: {
        margin: 20,
        width: "85%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});

export default TravelScreen;

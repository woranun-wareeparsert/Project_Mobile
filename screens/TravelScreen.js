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
    Alert
} from "react-native";
import Axios from "axios";
import { useState, useEffect } from "react";
import CategoryGridTile from "../components/CategoryGridTile";


const TravelScreen = ({ navigation, route }) => {
    const { prev, Endstation } = route.params;
    const [direcpass, setdirecpass] = React.useState([]);
    const [check, setCheck] = React.useState(0);

    //open-close Modal
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const getBtsDirect = () => {
        Axios.get("http://localhost:3000/travelBts").then((res) => {
            let myloop = [];
            // Allsta.forEach(function (item, index) {
            //     res.data.forEach(function (item1, index) {
            //         if (item1.idbts == item.id) {
            //             myloop.push(item1);
            //         }
            //     })
            // })
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
                onPress={showModal}
            />
        );
    };

    return (
        <View style={styles.screen}>
            <Modal animationType="fade" transparent={true} visible={visible} onDismiss={hideModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
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
    )
}

const styles = StyleSheet.create({
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


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(80, 88, 108,.5)",
    },
    modalView: {
        margin: 20,
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

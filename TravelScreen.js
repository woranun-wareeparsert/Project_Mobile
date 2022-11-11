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


const TravelScreen = ({ navigation, route }) => {
    const { prev, Allsta } = route.params;
    const [direcpass, setdirecpass] = React.useState([]);
    const [check, setCheck] = React.useState(0);

    const getBtsDirect = () => {
        Axios.get("http://localhost:3000/travelBts").then((res) => {
            let myloop = [];
            Allsta.forEach(function (item, index) {
                res.data.forEach(function (item1, index) {
                    if (item1.idbts == item.id) {
                        myloop.push(item1);
                    }
                })
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
        return (<Text style={styles.text}>{item.item.tname}</Text>)
    }
    return (
        <View style={styles.screen}>
            <View style={styles.screentop}>
                <FlatList style={styles.task} data={direcpass} renderItem={renderCategories} numColumns={1} />
            </View>
            <Button
                title="เส้นทางเพิ่มเติม"
                onPress={() => {
                    navigation.navigate("Detail");
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
        backgroundColor: "#ACE2F0",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    text: {
        backgroundColor: "green",
        fontSize: 18,
    },
    task:{
        
    }

});

export default TravelScreen;
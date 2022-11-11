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
import CategoryGridTile from "../components/CategoryGridTile";


const TravelScreen = ({ navigation, route }) => {
    const { prev, Endstation } = route.params;
    const [direcpass, setdirecpass] = React.useState([]);
    const [check, setCheck] = React.useState(0);

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
            // onSelect={() => {
            //   navigation.navigate("CategoryMeals", {id: itemData.item.id, title: itemData.item.title});
            // }}
            />
        );
    };

    return (
        <View style={styles.screen}>
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
    task: {

    }

});

export default TravelScreen;

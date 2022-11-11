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

const Directioncomponents = ({ navigation, route }) => {
    const { prev, start, end } = route.params;
    return (
        <View style={styles.screen}>
            <Text>{start}</Text>
            <Text>{end}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DCE2F0"
    },

});

export default Directioncomponents;
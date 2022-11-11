import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { Ionicons } from '@expo/vector-icons'

import DirectionScreen from '../screens/DirectionScreen';
import PlaceDetailScreen from '../screens/PlaceDetilScreen';
import SearchScreen from "../screens/SearchScreen";
import TravelScreen from "../screens/Travelscreen";

const page = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function Screen() {
    return (
        <page.Navigator initialRouteName="Search"
            screenOptions={{ headerStyle: { backgroundColor: "#50586C" } }}>
            <page.Screen name="search" component={SearchScreen}
                options={{
                  title: "Search Page"
            }}/>
            <page.Screen name="Direction" component={DirectionScreen}
                options={{
                  title: "Direction Page"
            }}/>
            <page.Screen name="Travel" component={TravelScreen}
                options={{
                  title: "Travel Page"
            }}/>
            <page.Screen name="Detail" component={PlaceDetailScreen}
                options={{
                  title: "Detail Page"
            }}/>
        </page.Navigator>
    )
}


export default function Navigator() {
    return (
        <NavigationContainer>
            <Screen/>
        </NavigationContainer>
    );
}
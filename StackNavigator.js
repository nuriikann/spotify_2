import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { BlurView } from 'expo-blur';
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Search from "./screens/Search"
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create ({
    navlogo: {
        width: 24,
        height: 24
    },
    navBarBg: {
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        bottom:0,
        left:0,
        right:0,
        shadowOpacity:4,
        elevation:4,
        shadowRadius:4,
        width:0,
        shadowOffset:{
            height:-4
        },
        borderTopWidth:0 
    },
    blurredView: {
        
    }
})

const Tab = createBottomTabNavigator()

const TabBar = ({ state, descriptors, navigation }) => {
    const styles = StyleSheet.create({
      tabContainer: {
        flexDirection: "row",
        height: 90,
        alignItems: "flex-start",
        justifyContent: "center",
      },
      tabButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 3,
      },
      tabLabel: {
        fontSize: 14,
        fontFamily: "Inconsolata-Regular",
        alignSelf: "center",
      },
    });
  

  
    return (
        <LinearGradient
          colors={["#232323", "#000000"]}
          style={styles.tabContainer}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : route.name;
            const isFocused = state.index === index;
  
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
  
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
  
            return (
              <View key={route.key} style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPress}
                  style={[
                    styles.tabButton,
                    { backgroundColor: isFocused ? "#484848" : "transparent" },
                  ]}
                >
                  {<Text
                    style={[
                      styles.tabLabel,
                      { color: isFocused ? "#fff" : "#aaa" },
                    ]}
                  >
                    {label}
                  </Text>}
                </TouchableOpacity>
              </View>
            );
          })}
        </LinearGradient>
    );
  };
  

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ tabBarLabel: "Home" }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{ tabBarLabel: "Search" }} 
            />
            <Tab.Screen name="Profile" 
                component={Profile} 
                options={{ tabBarLabel: "Profile" }}    
            />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator()

export default function Navigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={BottomTabs} />
                <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
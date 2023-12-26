import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as AppAuth from 'expo-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession()

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/login',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

   function Login() {
    const [request, response, promptAsync, navigation] = useAuthRequest(
      {
        clientId: process.env.EXPO_PUBLIC_CLIENTID,
        scopes: 
        ['user-read-email', 
        'playlist-modify-public'],
        usePKCE: false,
        redirectUri: process.env.EXPO_PUBLIC_REDIRECTURL
      },
      discovery
    );
  
    React.useEffect(() => {
      if (response?.type === 'success') {
        navigation.navigate("Main")
      }
    }, [response]);
    return (
        <LinearGradient colors={['#040306', '#131624']} style={{flex:1}}>
            <SafeAreaView>
                <View style={{height:80}}/>
                <Image style={styles.logo} source={require('../assets/spotify-logo.png')} />
                <Text style={styles.logoText}>Millions of Songs Free on spotify!</Text>
                <View style={{marginTop: 50}}>
                    <TouchableOpacity 
                    disabled={!request}
                    title="Login"
                    onPress={() => {
                        promptAsync();
                    }} 
                    style={styles.spotifyBtn}>
                        <Text style={{fontSize: 15}}>Sign in with Spotify</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.logInBtn}>
                        <Image style={{height: 24, width: 24}} source={require ('../assets/icons/iphone.png')}/>
                        <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with phone number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logInBtn}>
                    <Image style={{height: 24, width: 24}} source={require ('../assets/icons/google.png')}/>
                        <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Sign in with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logInBtn}>
                    <Image style={{height: 24, width: 24}} source={require ('../assets/icons/facebook.png')}/>
                        <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Sign in with Facebook</Text>
                    </TouchableOpacity> */}
                </View>
            </SafeAreaView>
        </LinearGradient>
        
      ) //Istakoz96 nuri.kann@outlook.com    
  }

// const Login = () => {
//     const navigation = useNavigation();
//     useEffect(() => {
//         const checkTokenValidty = async () => {
//             const accessToken = await AsyncStorage.getItem('token');
//             const expirationDate = await AsyncStorage.getItem('expirationDate');
//             console.log("access token",accessToken);
//             console.log("expiration date",expirationDate);

//             if(accessToken && expirationDate){
//                 const currentTime = Date.now()
//                 if(currentTime < parseInt(expirationDate)){
//                     //token hala gecerli mi kontrolu
//                     navigation.replace('Main')
//                 } else {
//                     //token gecerli degilse
//                     AsyncStorage.removeItem('token')
//                     AsyncStorage.removeItem('expirationDate')
//                 }
//             }
//         }
//         checkTokenValidty()
//     },[])
//     async function authenticate(){
//         const config ={
//             issuer: 'https://accounts.spotify.com',
//             clientId: '488dff28d86b4c8a86d452aed8ae9a76',
//             scopes: [
//                 "user-read-email",
//                 "user-library-read",
//                 "user-read-recently-played",
//                 "user-top-read",
//                 "playlist-read-private",
//                 "playlist-read-collaborative",
//                 "playlist-modify-public"
//               ],
//               redirectUrl:"exp://192.168.8.197:8081/--/spotify-auth-callback"
//         }

//         const results = await AppAuth.authAsync(config)
//         if(results.accessToken){
//             const expirationDate = new Date(results.accessTokenExpirationDate).getDate
//             AsyncStorage.setItem('token',results.accessToken)
//             AsyncStorage.setItem("expirationDate",expirationDate.toString());
//             navigation.navigate('Main')
//         }
//     }


export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#111111'
    },
    logo: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 80,
        height: 80
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 40,
        fontWeight: 'bold'
    },
    spotifyBtn: {
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical:10,
    },
    logInBtn: {
        backgroundColor: "transparent",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
    }
})
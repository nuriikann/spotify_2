import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ArtistCard from '../components/ArtistCard';
import RecentlyPlayedCard from '../components/RecentlyPlayedCard';

const styles = StyleSheet.create({
  navlogo: {
    width: 24,
    height: 24,
  },
});

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topArtist, setTopArtist] = useState([]);

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return 'Good Morning';
    } else if (currentTime < 16) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const message = greetingMessage();

  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem('token');
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  // useEffect(() =>{
  //   getProfile()
  // },[])

  console.log(userProfile);

  const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=4',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const tracks = response.data.items;
      setRecentlyPlayed(tracks);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRecentlyPlayedSongs();
  }, []);

  console.log(recentlyPlayed);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 8,
          backgroundColor: '#282828',
          borderRadius: 4,
          elevation: 3,
        }}
      >
        <Image
          style={{ height: 55, width: 55 }}
          source={{ uri: item.track.album.images[0].url }}
        />
        <View
          style={{ flex: 1, marginHorizontal: 8, justifyContent: 'center' }}
        >
          <Text
            numberOfLines={2}
            style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}
          >
            {item.track.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  useEffect(() => {
    const getTopItems = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('token');
        if (!accessToken) {
          console.log('Access Token Not Found!');
          return;
        }
        //type ister sanatci ister sarki olabilir
        const type = 'artists';
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/${type}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTopArtist(response.data.items);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTopItems();
  }, []);

  console.log(topArtist);

  return (
    <LinearGradient
      colors={['#040306', '#131624']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView style={{ marginTop: 50 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: 'cover',
                marginLeft: 10,
              }}
              source={{ uri: userProfile?.images[0].url }}
            /> */}
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {message}
            </Text>
          </View>
          <Image
            style={{ height: 25, width: 25 }}
            source={require('../assets/icons/settings-light.png')}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 20, margin: 10 }}>
          <Pressable
            style={{
              backgroundColor: '#363836',
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: 'white' }}>Music</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: '#363836',
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: 'white' }}>Podcasts & Shows</Text>
          </Pressable>
        </View>

        <View style={{ height: 10 }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: '#202020',
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <LinearGradient colors={['#33006F', '#FFFFFF']}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require('../assets/icons/like-light.png')}
                />
              </Pressable>
            </LinearGradient>
            <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>
              Liked Songs
            </Text>
          </Pressable>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: '#202020',
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <Image
              style={{ width: 55, height: 55 }}
              source={{ uri: 'https://i.pravatar.cc/100' }}
            />
            <View style={styles.randomArtist}>
              <Text
                style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}
              >
                Hiphop
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Your Top Artists
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtist.map((item, index) => (
            <ArtistCard item={item} key={index} />
          ))}
        </ScrollView>
        <View style={{ height: 10 }} />
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginHorizontal: 10,
          }}
        >
          Recently Played
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentlyPlayed}
          renderItem={({ item, index }) => (
            <RecentlyPlayedCard item={item} key={index} />
          )}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

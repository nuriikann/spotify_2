import React, { useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

import { ResponseType, useAuthRequest } from 'expo-auth-session';

const { width: wWidth, height: wHeight } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '488dff28d86b4c8a86d452aed8ae9a76',
      clientSecret: '93c756563e214ef2a0243d51930d38c5',
      scopes: [
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-top-read',
        'user-modify-playback-state',
        'streaming',
        'user-read-email',
        'user-read-private',
      ],
      usePKCE: false,
      redirectUri: 'exp://192.168.8.197:8081/--/spotify-auth-callback',
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      navigation.navigate('Main', { screen: 'Main' });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => promptAsync()}>
        <View
          style={{
            backgroundColor: 'green',
            width: wWidth * 0.9,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

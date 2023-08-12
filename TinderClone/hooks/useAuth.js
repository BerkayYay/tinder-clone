import {View, Text} from 'react-native';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import fbAuth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {auth} from '../firebase';

const AuthContext = createContext({});

GoogleSignin.configure({
  androidClientId:
    '',
  iosClientId:
    '',
  scope: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
  webClientId:
    '',
});

export const AuthProvider = ({children}) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = fbAuth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });
    return subscriber; // unsubscribe on unmount
  });

  const singInWithGoogleAsync = async () => {
    setLoading(true);
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    await GoogleSignin.signIn()
      .then(async logInResult => {
        if (logInResult) {
          const {idToken} = logInResult;
          const googleCredential =
            fbAuth.GoogleAuthProvider.credential(idToken);
          await fbAuth().signInWithCredential(googleCredential);
          console.log('Google Sign In Success');
        }
        return Promise.reject();
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setLoading(true);
    fbAuth()
      .signOut()
      .then(() => {
        console.log('Sign Out Success');
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      logout,
      singInWithGoogleAsync,
    }),
    [user, loading, error],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native';

const Manhinhchao = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('Slide'); 
      }, 2300);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <LottieView 
            source={require('../assets/rocket.json')} 
            autoPlay 
            loop 
            style={styles.lottie} 
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#081a26',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081a26',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  lottie: {
    width: 400,
    height: 400,
  },
});

export default Manhinhchao;

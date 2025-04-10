import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ReanimatedCarousel from 'react-native-reanimated-carousel';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons'; 

const { width, height } = Dimensions.get('window');

const slides = [
    {
      id: '1',
      title: 'Đặt Bàn Nhanh Chóng',
      description: 'Đặt bàn trực tuyến chỉ với vài cú chạm, không cần chờ đợi!',
      animation: require('../assets/slide1.json'), 
    },
    {
      id: '2',
      title: 'Gọi Món Dễ Dàng',
      description: 'Khám phá thực đơn đa dạng và gọi món ngay trên ứng dụng.',
      animation: require('../assets/slide2.json'), 
    },
  ];
  

const Slide = ({ navigation }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <LottieView source={item.animation} autoPlay loop style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ReanimatedCarousel
        ref={carouselRef}
        data={slides}
        renderItem={renderItem}
        width={width}
        height={height * 0.75}
        loop={false}
        onSnapToItem={(index) => setCurrentIndex(index)}
      />
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Thanh chỉ báo tiến trình */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>

      {/* Nút "Back" chỉ xuất hiện ở slide 2 */}
      {currentIndex === 1 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => carouselRef.current?.prev()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      )}

      {/* Nút "Next" */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (currentIndex < slides.length - 1) {
            carouselRef.current?.next();
          } else {
            navigation.replace('Login');
          }
        }}
      >
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8e7ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: width,
    height: height * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Nền mờ giúp nổi bật hơn
    borderRadius: 20, 
  },
  skipText: {
    fontSize: 18,
    color: '#ff4081',
    fontWeight: 'bold',
  },  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
    paddingHorizontal: 40,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#ff4081',
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    backgroundColor: '#ff4081',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#ff4081',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Slide;

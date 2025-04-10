import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper'; // Import Checkbox
import LottieView from 'lottie-react-native';  // For Lottie animations

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);  // State to track "Remember Password"

 

  return (
    <SafeAreaView style={styles.container}>
      <LottieView source={require('../assets/background.json')} style={styles.backgroundImage} />
      <View style={styles.content}>
        <Text style={styles.title}>Chào mừng bạn đã quay trở lại</Text>

        


        <Text style={styles.orText}>Đăng nhập với tư cách:</Text>

        <View style={styles.roleButtons}>
  <Button
    mode="outlined"
    style={styles.roleButton}
    onPress={() => navigation.navigate("LoginAdmin")} // Chủ nhà hàng
  >
    Chủ nhà hàng
  </Button>

  <Button
    mode="outlined"
    style={styles.roleButton}
    onPress={() => navigation.navigate("LoginNhanVien")} // Nhân viên
  >
    Nhân viên
  </Button>

  <Button
    mode="outlined"
    style={styles.roleButton}
    onPress={() => navigation.navigate("LoginKhachHang")} // Khách hàng
  >
    Khách hàng
  </Button>
</View>




      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  roleButtons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'column',
    gap: 10,
  },
  roleButton: {
    borderColor: '#0F9D58',
    marginBottom: 10,
  },
  
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingTop: 20, // Added padding to avoid content being too close to the top on iPhone X-like devices
  },
  checkboxContainer: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  checkboxText: { 
    marginLeft: 5 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,  // Bo góc cho input
  },
  forgotPassword: {
    color: '#0F9D58',
    marginLeft: 10, // Added margin left to separate from checkbox
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#0F9D58',
    padding: 5,
  },
  orText: {
    marginVertical: 15,
    fontSize: 16,
    color: '#666',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20, // Added vertical spacing
  },
  socialIcon: {
    width: 60,  // Adjust width to make it larger
    height: 60, // Adjust height to match the width, making it a square
    marginHorizontal: 15, // Adjust spacing between icons
  },
  rememberMeContainer: {
    flexDirection: 'row',  // Align items horizontally
    alignItems: 'center',  // Center the checkbox with text and forgot password link
    marginBottom: 15, // Add some spacing below this section
    width: '100%', // Make sure the container takes up full width
    justifyContent: 'space-between', // Distribute space between checkbox and "Forgot Password"
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
});

export default Login;

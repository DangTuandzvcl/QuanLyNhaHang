import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; // Import TextInput and Button
import LottieView from 'lottie-react-native';  // For Lottie animations

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);   // for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // for confirm password visibility

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Create refs for inputs
  const emailRef = useRef();
  const fullNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // Validate email in real-time
  const handleEmailChange = (text) => {
    setEmail(text);
    if (!/\S+@\S+\.\S+/.test(text)) {
      setEmailError('Vui lòng nhập địa chỉ email hợp lệ.');
    } else {
      setEmailError('');
    }
  };

  // Validate password in real-time
  const handlePasswordChange = (text) => {
    setPassword(text);
    if (confirmPassword && text !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Validate confirm password in real-time
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (password && text !== password) {
      setConfirmPasswordError('Mật khẩu không khớp.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = () => {
    let isValid = true;

    // Check for errors and focus on the first field that is incorrect
    if (!email || emailError) {
      isValid = false;
      emailRef.current.focus();
    } else if (!fullName) {
      isValid = false;
      fullNameRef.current.focus();
    } else if (!password || passwordError) {
      isValid = false;
      passwordRef.current.focus();
    } else if (!confirmPassword || confirmPasswordError) {
      isValid = false;
      confirmPasswordRef.current.focus();
    }

    if (isValid) {
      // Registration logic here
      console.log('Registering...');

      // On success, show success message and navigate
      Alert.alert(
        "Đăng ký thành công",
        "Chúc mừng bạn đã đăng ký thành công!",
        [
          {
            text: "OK", 
            onPress: () => navigation.navigate('Login')  // Navigate to the Login screen after successful registration
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LottieView source={require('../assets/background.json')} style={styles.backgroundImage} />
      <View style={styles.content}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <Text style={styles.subtitle}>Nhập thông tin của bạn</Text>

        <TextInput
          ref={fullNameRef}
          label="Tên đầy đủ"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          mode="outlined"
          theme={{ roundness: 10 }}
        />

        <TextInput
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          style={styles.input}
          mode="outlined"
          theme={{ roundness: 10 }}
          error={!!emailError}  // Display error if emailError exists
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          ref={passwordRef}
          label="Mật khẩu"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
          right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
          style={styles.input}
          mode="outlined"
          theme={{ roundness: 10 }}
          error={!!passwordError}  // Display error if passwordError exists
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TextInput
          ref={confirmPasswordRef}
          label="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
          right={<TextInput.Icon icon={showConfirmPassword ? 'eye-off' : 'eye'} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
          style={styles.input}
          mode="outlined"
          theme={{ roundness: 10 }}
          error={!!confirmPasswordError}  // Display error if confirmPasswordError exists
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <Button mode="contained" style={styles.registerButton} onPress={handleRegister}>
          Đăng ký
        </Button>

        <Text style={styles.orText}>Hoặc</Text>

        <View style={styles.socialButtons}>
          <Image
            source={require('../assets/google.jpg')}
            style={styles.socialIcon}
          />
          <Image
            source={require('../assets/facebook.jpg')}
            style={styles.socialIcon}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Bạn đã có tài khoản? <Text style={{ color: '#0F9D58' }}>Đăng nhập</Text></Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingTop: 20,
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
    borderRadius: 10,
  },
  registerButton: {
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
    marginVertical: 20,
  },
  socialIcon: {
    width: 60,
    height: 60,
    marginHorizontal: 15,
  },
  loginText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default Register;

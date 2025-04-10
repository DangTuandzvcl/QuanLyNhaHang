import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import LottieView from 'lottie-react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Button } from 'react-native-paper';

const CELL_COUNT = 6;

const LoginKhachHang = ({ navigation }) => {
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otpValues, setOtpValues] = useState(Array(CELL_COUNT).fill(''));

  const inputRefs = useRef([]);

  React.useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setIsSending(false);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const handleSendOTP = () => {
    const isValid = phoneInput.current?.isValidNumber(phoneNumber);
    if (!isValid) {
      alert('Vui lòng nhập số điện thoại hợp lệ!');
      return;
    }

    setIsSending(true);
    setCounter(60);
    setIsOTPSent(true);
  };

  const handleOTPChange = (text, index) => {
    const newOtp = [...otpValues];
    newOtp[index] = text;
    setOtpValues(newOtp);

    // Auto move to next input
    if (text && index < CELL_COUNT - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Auto hide keyboard if last digit filled
    if (index === CELL_COUNT - 1 && text) {
      Keyboard.dismiss();
    }
  };

  const handleLogin = () => {
    const otp = otpValues.join('');
    if (otp.length < CELL_COUNT) {
      alert('Vui lòng nhập đầy đủ mã OTP!');
      return;
    }
    console.log('Mã OTP:', otp);
    navigation.navigate('sanPhamScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LottieView source={require('../assets/background.json')} style={styles.backgroundImage} />
      <View style={styles.content}>
        {!isOTPSent ? (
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="VN"
            layout="first"
            onChangeText={setPhoneNumber}
            onChangeFormattedText={setFormattedValue}
            withShadow
            autoFocus
            containerStyle={styles.phoneContainer}
            textContainerStyle={{ paddingVertical: 0 }}
          />
        ) : (
          <>
            <Text style={styles.otpTitle}>Nhập mã xác thực</Text>
            <Text style={styles.otpInfo}>Mã xác thực đã được gửi qua tin nhắn đến số</Text>
            <Text style={styles.phoneDisplay}>{formattedValue}</Text>

            <View style={styles.otpContainer}>
              {otpValues.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOTPChange(text, index)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </View>

            <Text style={styles.resendText}>
              Không nhận được mã?{' '}
              {counter > 0 ? `Gửi lại sau ${counter}s` : (
                <Text style={styles.resendLink} onPress={handleSendOTP}>Gửi lại</Text>
              )}
            </Text>
          </>
        )}

        <Button
          mode="contained"
          style={styles.button}
          onPress={isOTPSent ? handleLogin : handleSendOTP}
          disabled={isSending && !isOTPSent}
        >
          {isOTPSent ? ( 'Đăng nhập') : (isSending ? `Gửi lại mã (${counter}s)` : 'Gửi mã')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  phoneContainer: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  otpInfo: {
    fontSize: 14,
    color: '#555',
  },
  phoneDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15,
  },
  otpInput: {
    borderBottomWidth: 2,
    borderColor: '#999',
    width: 40,
    height: 50,
    fontSize: 20,
    textAlign: 'center',
  },
  resendText: {
    marginTop: 10,
    fontSize: 13,
    color: '#777',
  },
  resendLink: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#f33',
    marginTop: 30,
  },
});

export default LoginKhachHang;

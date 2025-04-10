import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store/store';  // Your Redux store setup

// Your screen imports
import Slide from './Screen/Slide'; 
import Login from './Screen/Login';  
import Register from './Screen/Register';  
import Manhinhchao from './Screen/Manhinhchao';  
import sanPhamScreen from './Screen/sanPhamScreen';  
import AddSanPham from './Screen/AddSanPham';  
import ProductDetailScreen from './Screen/ProductDetailScreen';  
import EditSanPham from './Screen/EditSanPham';  
import LoginNhanVien from './Screen/LoginNhanVien';  
import LoginKhachHang from './Screen/LoginKhachHang';  
import LoginAdmin from './Screen/LoginAdmin';  

const Stack = createStackNavigator();

LogBox.ignoreLogs([
  'Support for defaultProps will be removed', // Ignore warning
]);
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={store}>  // Wrapping with Redux Provider
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Manhinhchao">
          <Stack.Screen name="Manhinhchao" component={Manhinhchao} options={{ headerShown: false }} />
          <Stack.Screen name="Slide" component={Slide} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="sanPhamScreen" component={sanPhamScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddSanPham" component={AddSanPham} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditSanPham" component={EditSanPham} options={{ headerShown: false }} />
          <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{ headerShown: false }} />
          <Stack.Screen name="LoginKhachHang" component={LoginKhachHang} options={{ headerShown: false }} />
          <Stack.Screen name="LoginNhanVien" component={LoginNhanVien} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

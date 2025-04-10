import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import { delteteSanPhamAction } from '../redux/actions/sanPhamAction';
import { useNavigation } from '@react-navigation/native';

const SanPhamItem = ({ sanPham }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa sản phẩm này?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            await dispatch(delteteSanPhamAction(sanPham.id));
            Alert.alert("Thông báo", "Xóa thành công");
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate("EditSanPham", { sanPham });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: sanPham.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Tên sản phẩm: {sanPham.name}</Text>
        <Text style={styles.price}>Giá: {sanPham.price}đ</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3, // cho Android
    shadowColor: '#000', // cho iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SanPhamItem;
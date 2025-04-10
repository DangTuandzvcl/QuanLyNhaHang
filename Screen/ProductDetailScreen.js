import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {delteteSanPhamAction} from '../redux/actions/sanPhamAction'
import { Ionicons } from '@expo/vector-icons'; // nếu dùng Expo

const ProductDetailScreen = ({ route, navigation }) => {
    const { sanPham } = route.params;
    const dispatch = useDispatch();

    const handleDelete = () => {
      Alert.alert(
        "Xóa sản phẩm",
        "Bạn có chắc muốn xóa sản phẩm này?",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Xóa", onPress: () => {
              dispatch(delteteSanPhamAction(sanPham.id));
              Alert.alert("Xoá thành công")
              navigation.goBack(); // Quay lại sau khi xoá
            }
          }
        ]
      );
    };

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Image source={{ uri: sanPham.image }} style={styles.productImage} />

                <View style={styles.content}>
                    <Text style={styles.productName}>{sanPham.name}</Text>

                    <View style={styles.meta}>
                        <Text style={styles.rating}>⭐ {sanPham.rating || '4.9'}</Text>
                        <Text style={styles.time}>{sanPham.prep_time || '20 mins'}</Text>
                    </View>

                    <Text style={styles.description}>
                        {sanPham.description || 'Không có mô tả.'}
                    </Text>

                    <Text style={styles.price}>Giá: <Text style={styles.priceValue}>{sanPham.price} VND</Text></Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditSanPham', { sanPham })}
                        >
                            <Text style={styles.buttonText}>Chỉnh sửa</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Xóa sản phẩm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        padding: 16,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        color: '#f39c12',
    },
    time: {
        fontSize: 16,
        color: '#555',
    },
    description: {
        fontSize: 15,
        color: '#444',
        marginBottom: 12,
    },
    price: {
        fontSize: 16,
        marginBottom: 20,
    },
    priceValue: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#e74c3c',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#3498db',
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductDetailScreen;
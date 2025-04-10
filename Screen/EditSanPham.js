import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import { useDispatch } from 'react-redux';
import { updateSanPhamAction, getListSanPham } from '../redux/actions/sanPhamAction';
import * as ImagePicker from 'expo-image-picker';

const EditSanPham = ({ route, navigation }) => {
    const { sanPham } = route.params;

    const [name, setName] = useState(sanPham.name);
    const [price, setPrice] = useState("" + sanPham.price);
    const [image, setImage] = useState(sanPham.image);
    const [description, setDescription] = useState(sanPham.description);
    const [prepTime, setPrepTime] = useState(sanPham.prep_time);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Chưa được cấp quyền", "Vui lòng cấp quyền truy cập thư viện ảnh.");
            }
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleEdit = async () => {
        if (!name || !price || !image || !description || !prepTime) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin sản phẩm.");
            return;
        }

        const objEdit = {
            name,
            price: Number(price),
            image,
            description,
            prep_time: prepTime
        };

        try {
            await dispatch(updateSanPhamAction(sanPham.id, objEdit));
            dispatch(getListSanPham());
            Alert.alert("Thông báo", "Sửa sản phẩm thành công.");
            navigation.navigate('sanPhamScreen');
        } catch (error) {
            Alert.alert("Lỗi", "Có lỗi xảy ra khi sửa sản phẩm.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chỉnh sửa sản phẩm</Text>

            <TextInput
                style={styles.input}
                placeholder="Tên sản phẩm"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Mô tả sản phẩm"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Giá sản phẩm"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Thời gian làm"
                value={prepTime}
                onChangeText={setPrepTime}
            />

            {image ? (
                <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 10 }} />
            ) : null}

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.imageButtonText}>Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 16,
    },
    imageButton: {
        backgroundColor: '#6c757d',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditSanPham;

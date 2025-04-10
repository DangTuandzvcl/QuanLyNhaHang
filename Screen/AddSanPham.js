import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createSanPhamAction } from '../redux/actions/sanPhamAction';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';

const AddSanPham = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [prepTime, setPrepTime] = useState('');

    const dispatch = useDispatch();

    // Fetch categories from the API
    useEffect(() => {
        fetch('http://192.168.1.30:3000/sanpham')  // Replace with your actual endpoint
            .then(response => response.json())
            .then(data => {
                setCategories(data);  // Set categories to the state
            })
            .catch(error => Alert.alert('Lỗi', 'Không thể tải danh mục'));

        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Chưa được cấp quyền", "Vui lòng cấp quyền truy cập camera.");
            }

            const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (libraryStatus.status !== 'granted') {
                Alert.alert("Chưa được cấp quyền", "Vui lòng cấp quyền truy cập thư viện ảnh.");
            }
        })();
    }, []);

    const handleAdd = () => {
        if (!name || !price || !image  || !prepTime || !description) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const newSanPham = { name, description, price, image, category: selectedCategory, prepTime };
        dispatch(createSanPhamAction(newSanPham));
        Alert.alert('Thêm thành công', 'Sản phẩm đã được thêm.');
        navigation.goBack();
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setImage('');
        setSelectedCategory('');
        setPrepTime('');
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);  // Update image URI
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thêm Sản Phẩm</Text>

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

            {/* Category Picker */}
            <RNPickerSelect
                onValueChange={setSelectedCategory}
                items={categories.map(category => ({ label: category.name, value: category.id }))}
                placeholder={{ label: 'Chọn danh mục', value: null }}
                style={pickerSelectStyles}
            />

            <TextInput
                style={styles.input}
                placeholder="Thời gian làm"
                value={prepTime}
                onChangeText={setPrepTime}
            />

            {/* Select Image */}
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
                <Text style={styles.imageButtonText}>Chọn ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>+ Thêm Sản Phẩm</Text>
            </TouchableOpacity>
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 16,
    },
    inputAndroid: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 16,
    },
});

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
    addButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageButton: {
        backgroundColor: '#007bff',
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
});

export default AddSanPham;

import React, { useEffect, useState } from 'react';
import {
    FlatList,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getListSanPham } from '../redux/actions/sanPhamAction';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const categories = ['Món nổi bật', 'Trà sữa', 'Ice Cream', 'Cream Cheese', 'Fresh Fruit Tea', 'Cà phê', 'Special Menu'];

const SanPhamScreen = ({ navigation }) => {
    const lstSanPham = useSelector((state) => state.sanPham.listSanPham);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredSanPham, setFilteredSanPham] = useState(lstSanPham);

    useEffect(() => {
        dispatch(getListSanPham());
    }, [dispatch]);

    useEffect(() => {
      if (selectedCategory === 'All') {
          setFilteredSanPham(lstSanPham);
      } else {
          const filtered = lstSanPham.filter(product =>
              Array.isArray(product.categories) && product.categories.includes(selectedCategory)
          );
          setFilteredSanPham(filtered);
      }
  }, [selectedCategory, lstSanPham]);
  

    const renderCategory = (item) => (
        <TouchableOpacity
            key={item}
            style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === item && styles.selectedCategoryText,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetailScreen', { sanPham: item })}
            style={styles.cardWrapper} // Add this wrapper for consistent spacing between cards
        >
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.name}</Text>
                <View style={styles.cardInfo}>
                    <Text style={styles.ratingText}>⭐ {item.rating || 4.5}</Text>
                    <TouchableOpacity>
                        <FontAwesome name="heart-o" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Foodgo</Text>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }}
                    style={styles.avatar}
                />
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#aaa" />
                <TextInput
                    placeholder="Search"
                    style={styles.searchInput}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity>
                    <Ionicons name="filter" size={24} color="#f33" />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 100 }}
                contentContainerStyle={styles.categories}
            >
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === 'All' && styles.selectedCategory,
                    ]}
                    onPress={() => setSelectedCategory('All')}
                >
                    <Text
                        style={[
                            styles.categoryText,
                            selectedCategory === 'All' && styles.selectedCategoryText,
                        ]}
                    >
                        Tất cả
                    </Text>
                </TouchableOpacity>
                {categories.map(renderCategory)}
            </ScrollView>

            <FlatList
                data={filteredSanPham}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListEmptyComponent={<Text style={styles.emptyText}>Chưa có sản phẩm nào.</Text>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
            />

            {/* Floating Bottom Navigation */}
            <View style={styles.bottomNavContainer}>
                <View style={styles.bottomNav}>
                    <TouchableOpacity>
                        <Ionicons name="home-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="person-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.fabWrapper}>
                        <TouchableOpacity
                            style={styles.fabButton}
                            onPress={() => navigation.navigate("AddSanPham")}
                        >
                            <Text style={styles.fabText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Ionicons name="receipt-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="heart-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f3f6',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    categories: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f1f3f6',
        borderRadius: 20,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCategory: {
        backgroundColor: '#f33',
    },
    categoryText: {
        color: '#333',
        fontSize: 14,
    },
    selectedCategoryText: {
        color: '#fff',
    },
    cardWrapper: {
        flex: 1, // Ensure equal spacing for cards
        marginBottom: 16, // Add some space between rows
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        flex: 1, // Ensure equal space within the card
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 120, // Adjust to make the image slightly larger
        borderRadius: 12,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    cardTitle: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        color: '#777',
    },
    flatListContainer: {
        paddingBottom: 90,
        paddingTop: 10,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: '#888',
    },

    // Bottom Navigation styles...
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#f33',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: width,
        height: 70,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    fabWrapper: {
        position: 'absolute',
        top: -30,
        left: width / 2 - 30, // center the button
        zIndex: 10,
    },
    fabButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    fabText: {
        fontSize: 30,
        color: '#f33',
        fontWeight: 'bold',
        marginTop: -2,
    },
});

export default SanPhamScreen;

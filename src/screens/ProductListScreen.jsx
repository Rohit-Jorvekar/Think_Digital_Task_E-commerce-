import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  RefreshControl, StyleSheet, TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, searchProducts } from '../redux/actions/productActions';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error } = useSelector(state => state.products);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProducts());
    setRefreshing(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch(searchProducts(term));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return (
    <View style={styles.centerContainer}>
      <Text style={styles.centerText}>Loading products...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>Error: {error}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#aaa"
            onChangeText={handleSearch}
            value={searchTerm}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6C63FF"
            colors={['#6C63FF']}
          />
        }
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  // ── Layout ──────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#F2F4F8',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },

  // ── Search Bar ───────────────────────────────────────
  searchWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  // ── Product Card ─────────────────────────────────────
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginTop: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 5,
    lineHeight: 20,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#888',
    lineHeight: 17,
  },

  // ── States ───────────────────────────────────────────
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  centerText: {
    fontSize: 16,
    color: '#888',
  },
  errorText: {
    fontSize: 15,
    color: '#E53935',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default ProductListScreen;
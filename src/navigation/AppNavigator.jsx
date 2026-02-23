import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={({ navigation, route }) => ({
        // ── Header Base Style 
        headerStyle: {
          backgroundColor: '#6C63FF',
          shadowColor: '#6C63FF',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        headerTintColor: '#fff',         
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 18,
          color: '#fff',
          letterSpacing: 0.4,
        },
        headerTitleAlign: 'center',

        // ── Custom Back Button 
        headerBackTitleVisible: false,   
        headerLeftContainerStyle: {
          paddingLeft: 8,
        },
        headerLeft: () =>
          navigation.canGoBack() ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
          ) : null,
      })}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: '🛍  Products' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  backBtn: {
    marginLeft: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: '#fff',
    lineHeight: 36,
    fontWeight: '300',
    marginTop: -2,
  },
});

export default AppNavigator;
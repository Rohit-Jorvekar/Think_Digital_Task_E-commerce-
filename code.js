import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const OddEven = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  const checkOddEven = () => {
    if (number === '') {
      setResult('Please enter a number');
      return;
    }

    if (parseInt(number) % 2 === 0) {
      setResult('Even Number');
    } else {
      setResult('Odd Number');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Odd / Even Checker</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a number"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={checkOddEven}>
        <Text style={styles.buttonText}>Check</Text>
      </TouchableOpacity>

      {result !== '' && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

export default OddEven;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
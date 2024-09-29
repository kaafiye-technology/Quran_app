import { StyleSheet, Text, View, Pressable, Image, Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');  // Get the screen width for responsive design

const semesters = () => {
  const url = 'https://db.al-marwaziuniversity.so/api/report';

  const [balance, setBalance] = useState([]);
  const [secondData, setSecondData] = useState([]); 
  const [ThirdData, setThirdData] = useState([]); 
  const [error, setError] = useState(null); 
  
  const fetchBalance = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        
        const values1 = { sp: 540, std_id: userData.result.auto_id };
        const values2 = { sp: 585, std_id: userData.result.auto_id };
        const values3 = { sp: 547, std_id: userData.result.auto_id, from: 's', to: 'a' };
  
        const response1 = await axios.post(url, values1);
        setBalance(response1.data.result[0]);

        const response2 = await axios.post(url, values2);
        setSecondData(response2.data.result[0]);

        const response3 = await axios.post(url, values3);
        setThirdData(response3.data.result[0]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.feature1}>
        <Image source={require('../../assets/finance.jpg')} style={styles.image} />
        <Text style={styles.title}>Finance Information</Text>
        <Text style={styles.subtitle}>Al-Marwazi University Portal</Text>
      </View>

      <View style={styles.feature}>
        <Icon name="gift-outline" size={30} color="#FF9800" />
        <Text style={styles.featureText}>Tuition Fee</Text>
        <Text style={styles.resultText}>${secondData?.fee}</Text>
      </View>

      <View style={styles.feature}>
        <Icon name="cash" size={30} color="#FF9800" />
        <Text style={styles.featureText}>Balance</Text>
        <Text style={styles.resultText1}>${balance?.balance}</Text>
      </View>

      <Pressable style={styles.feature} onPress={() => router.push('/finance/report')}>
        <Icon name="percent" size={30} color="#9C27B0" />
        <Text style={styles.featureText}>Finance Statement Detail</Text>
        <Icon name="arrow-right" size={25} color="black" style={styles.icon} />
      </Pressable>

      <Pressable style={styles.feature} onPress={() => router.push('/finance/statement')}>
        <Icon name="file-document-outline" size={30} color="#9C27B0" />
        <Text style={styles.featureText}>All Receipts</Text>
        <Icon name="arrow-right" size={25} color="black" style={styles.icon1} />
      </Pressable>
    </View>
  );
};

export default semesters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#236b17',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 25,
  },
  feature1: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    width: '100%', // Use percentage-based width
    height: width * 0.5,  // Responsive height based on screen width
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFF00',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFF00',
  },
  featureText: {
    fontSize: 18,
    marginLeft: 20,
    color: '#333',
  },
  resultText: {
    fontSize: 18,
    marginLeft: 'auto',  // Automatically adjust spacing
    color: 'blue',
    fontWeight: 'bold',
  },
  resultText1: {
    fontSize: 18,
    marginLeft: 'auto',
    color: '#236b17',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 'auto',  // Automatically move the icon to the right
  },
  icon1: {
    marginLeft: 'auto',
  },
});

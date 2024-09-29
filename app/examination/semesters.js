import { StyleSheet, Text, View,Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link ,router} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const semesters = () => {
  const url = 'https://db.al-marwaziuniversity.so/api/report';

  const [balance, setBalance] = useState([]);
  const [secondData, setSecondData] = useState([]); // For the second API response
  const [error, setError] = useState(null); // To handle errors
  
  const fetchBalance = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        
        // Values for first API request
        const values1 = {
          sp: 540,
          std_id: userData.result.auto_id
        };
  
        // Values for second API request
        const values2 = {
          sp: 585, // Example value for second request
          std_id: userData.result.auto_id
        };
  
        // First API request
        const response1 = await axios.post(url, values1);
        const result1 = response1.data.result[0];
        setBalance(result1);
  
        // Second API request
        const response2 = await axios.post(url, values2);
        const result2 = response2.data.result[0];
        setSecondData(result2);  // Store the second response
        console.log('fee::',response2.data.result)

      }
    } catch (err) {
      setError(err.message);
    } finally {
      // setLoading(false); // Uncomment if using a loading state
    }
  };
  useEffect(() => {
    fetchBalance();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.feature1} >
          <Image  source={require('../../assets/exam.jpg')}  style={styles.image}/>
          <Text style={styles.title}>Examination Results</Text>
        <Text style={styles.subtitle}>Al-Marwazi University Portal</Text>
        </View>
     
        <Pressable style={styles.feature} onPress={() => router.push('/examination/transcript')}>
        <Icon name="dots-grid" size={30} color="#FF9800"  />
        <Text style={styles.featureText}>Show as Transcript</Text>
          <Icon name="arrow-right" size={25} color="black" style={styles.icon}/>

        </Pressable>
        <Pressable style={styles.feature} onPress={() => router.push('/examination/semesterwise')}>
          <Icon name="calendar-blank" size={30} color="#9C27B0"  />
          <Text style={styles.featureText}>Show as Semester Wise</Text>
          <Icon name="arrow-right" size={25} color="black" style={styles.icon1}/>

        </Pressable>
    </View>
  )
}

export default semesters

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#236b17',
  },
  
  featuresContainer: {
    marginTop: 20,
  },
  image: {
    width: '100%',    // Make sure the image takes the full width of the container
    height: '100%',   // Make sure the image takes the full height of the container
    position: 'absolute',  // Positions the image behind the view
    top: 0,
    left: 0,
    borderRadius: 25,  // Optional: apply border radius to match the view
  },
  feature1: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    borderRadius: 25,
    width: 370,   // Adjust size of the View
    height: 200,  // Adjust size of the View
    justifyContent: 'center',  // Center any content vertically
    alignItems: 'center',      // Center any content horizontally
    marginBottom: 20
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
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
    marginLeft: 40,
    color: '#333',
  },
  resultText: {
    fontSize: 18,
    marginLeft: 152,
    color: 'blue',
  },
  resultText1: {
    fontSize: 18,
    marginLeft: 180,
    color: 'red',
    
  },
  icon:{
    marginLeft: 93
  },
  icon1:{
    marginLeft: 50
  }
 })
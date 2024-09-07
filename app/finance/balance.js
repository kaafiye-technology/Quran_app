import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Balance() {
  const url = 'https://db.al-marwaziuniversity.so/api/report'
  
  const [balance, setBalance] = useState([]);
  
    
  const fetchBalance = async () => {
      
      try {
          const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
          const userData = JSON.parse(jsonValue);
          const values = {
              sp: 540,
              std_id: userData.result.auto_id
          }

          const response = await axios.post(url,values);
          
          const result = response.data.result[0];
              setBalance(result);
          
      }
          

         
      } catch (err) {
          setError(err.message);
      } finally {
        //  setLoading(false);
      }
  };

  useEffect(()=>{
      fetchBalance();
  },[])
  


    console.log(  'balance:', balance);
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
            <Image source={{ uri: 'https://al-marwaziuniversity.so/uploads/ktc_edit_sp/logo/marwaziunivbersity.png_ktceditsp_20240521065859.png' }} style={styles.logo} />

            </View>
            <Text style={styles.title}>Balance</Text>
           
           <Text>Haraaga waa: {balance?.balance}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#214923',

    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 70
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        width: '100%',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    button: {
        width: '100%',
        backgroundColor: '#007bff',
    },
});

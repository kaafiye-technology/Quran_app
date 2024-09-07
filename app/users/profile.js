import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity } from 'react-native';
 import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Profile() {
  const url = 'https://db.al-marwaziuniversity.so/api/report'
   
    const [user, setUser] = useState([]);
  
    
    const fetchProfile = async () => {
        
        try {
            const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
            const userData = JSON.parse(jsonValue);
            const values = {
                sp: 537,
                std_id: userData.result.auto_id
            }

            const response = await axios.post(url,values);
            
            const result = response.data.result[0];
                setUser(result);
            
        }
            

           
        } catch (err) {
            setError(err.message);
        } finally {
          //  setLoading(false);
        }
    };

    useEffect(()=>{
        fetchProfile();
    },[])
    


    console.log('user:', user);
    return (
        <ScrollView contentContainerStyle={styles.container}>
         <Image source={{ uri: 'https://al-marwaziuniversity.so/uploads/ktc_edit_sp/logo/marwaziunivbersity.png_ktceditsp_20240521065859.png' }} style={styles.logo} />
          <Text style={styles.title}>Student Profile</Text>
          <View style={styles.profileItem}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{user?.auto_id}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user?.name}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Faculty:</Text>
            <Text style={styles.value}>{user?.faculty}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.value}>{user?.department}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Class:</Text>
            <Text style={styles.value}>{user?.class}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Semester:</Text>
            <Text style={styles.value}>{user?.semester}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Campus:</Text>
            <Text style={styles.value}>{user?.campus}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Shift:</Text>
            <Text style={styles.value}>{user?.shift}</Text>
          </View>
          <TouchableOpacity style={styles.logout} onPress={() => router.push('/users/login')}>            
          <Text style={styles.log}>Log out</Text>
</TouchableOpacity>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#29bdc1',

      },
      logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 50,
        margin:'auto'
          },
          logout:{
            backgroundColor: '#e1e1e6',
            borderRadius: 8,
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'center',
            paddingVertical: 7,
            paddingHorizontal: 65,
            
            borderColor:'#e1e1e6'
            },
            log:{
              fontSize: 17,
              fontWeight: 'bold',
              fontFamily:'arial',
            },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
      },
      profileItem: {
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 3,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
        width: 100,
      },
      value: {
        fontSize: 16,
        color: '#333',
        flexShrink: 1,
      },
    });

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Link ,router} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SemesterItem = ({ semester }) => {
    return (
      <TouchableOpacity onPress={() => router.push('examination/marks?semester_id='+semester.id)}>

      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{semester.id}</Text>
        </View>
        <Text style={styles.itemText}>{semester.name}</Text>
      </View>
      </TouchableOpacity>       

    );
  };

const SemestersList = () => {
  const [semesters, setSemesters] = useState([]);
  const url = 'https://db.al-marwaziuniversity.so/api/report'

  const fetchSemesters = async () => {
      
    try {
        const jsonValue = await AsyncStorage.getItem('user');
    if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        const values = {
            sp: 542,
            class_id: userData.result.class_id
        }

        const response = await axios.post(url,values);
        
        const result = response.data.result;
            setSemesters(result);
        
    }
        

       
    } catch (err) {
       // setError(err.message);
       console.log('eeror', err)
    } finally {
      //  setLoading(false);
    }
};

useEffect(()=>{
    fetchSemesters();
},[])


console.log('semester:', semesters)
  const renderItem = ({ item }) => (
    <Link
        style={styles.itemContainer}
        href={''}
    >

<View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{item.id}</Text>
      </View>
      <Text style={styles.itemText}>{item.semester}</Text>
    </View>

   
    </Link>
);

  return (
    <View style={styles.container}>
        <Text>Semesters</Text>
      <FlatList
        data={semesters}
        keyExtractor={(item) => item.id.toString()} // Assuming each semester has an `id` field
        renderItem={({ item }) => <SemesterItem semester={item} />} // Assuming the semester number is in `item.number`
     //  renderItem={renderItem}
     />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#214923',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SemestersList;

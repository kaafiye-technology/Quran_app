import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CourseList = () => {
  const [groupedCourses, setGroupedCourses] = useState({});

  const url = 'https://quraan.kaafiye.com/api/report'; // Replace with actual URL

  const fetchMarks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        const values = {
          sp: 569,
          std_id: userData.result.auto_id,
        };

        const response = await axios.post(url, values);
        const result = response.data.result;

        // Grouping courses by semester_id
        const grouped = result.reduce((acc, course) => {
          (acc[course.semester_id] = acc[course.semester_id] || []).push(course);
          return acc;
        }, {});

        setGroupedCourses(grouped); // Set the grouped data
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  // Function to map numeric semester to Arabic words
  const getArabicSemester = (semesterId) => {
    const semesterMap = {
      1: 'الأول',
      2: 'الثاني',
      3: 'الثالث',
      4: 'الرابع',
      5: 'الخامس',
      6: 'السادس',
      7: 'السابع',
      8: 'الثامن',
    };

    return semesterMap[semesterId] || semesterId; // Fallback in case the semesterId doesn't exist
  };

  const renderCourse = ({ item }) => (
    <View style={styles.courseRow}>
      <Text style={styles.courseTotal}>{item.total}</Text>
      <Text style={styles.courseName}>{item.course}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {Object.keys(groupedCourses).map((semesterId) => (
          <View key={semesterId} style={styles.semesterContainer}>
            {/* Using the mapping function to get the Arabic name for the semester */}
            <Text style={styles.semesterTitle}>المستوى {getArabicSemester(semesterId)}</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>المجموع</Text>
              <Text style={styles.headerText}>إسم  المادة</Text>
            </View>
            <FlatList
              data={groupedCourses[semesterId]}
              renderItem={renderCourse}
              keyExtractor={(item) => item.course}
              style={styles.list}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#071533',

  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#071533',
  },
  semesterContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  semesterTitle: {
    backgroundColor: '#06ab8b',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#06ab8b',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  list: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  courseName: {
    fontSize: 16,
    color: '#333',
  },
  courseTotal: {
    fontSize: 16,
    color: '#333',
  },
});

export default CourseList;

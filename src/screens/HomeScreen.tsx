import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Book: undefined;
  Schedule: undefined;
};

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section with Blue Gloss */}
      <View style={styles.header}>
        <View style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hello,</Text>
              <Text style={styles.name}>John Doe</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileGloss}>
                <Ionicons name="person-circle" size={45} color="#007AFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Search Section with Blue Gloss */}
      <TouchableOpacity 
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Explore')}
        activeOpacity={0.8}
      >
        <View style={styles.searchGloss}>
          <Ionicons name="search" size={22} color="#007AFF" style={styles.searchIcon} />
          <Text style={styles.searchText}>Search doctors, specialties...</Text>
        </View>
      </TouchableOpacity>

      {/* Upcoming Appointment Card with Blue Gloss */}
      <TouchableOpacity 
        style={styles.appointmentCard}
        onPress={() => navigation.navigate('Schedule')}
        activeOpacity={0.9}
      >
        <View style={styles.cardGloss}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Upcoming Appointment</Text>
            <Ionicons name="chevron-forward" size={20} color="#007AFF" />
          </View>
          <View style={styles.appointmentInfo}>
            <View style={styles.doctorInfo}>
              <View style={styles.imageGloss}>
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }}
                  style={styles.doctorImage}
                />
              </View>
              <View>
                <Text style={styles.doctorName}>Dr. Sarah Wilson</Text>
                <Text style={styles.specialty}>Cardiologist</Text>
              </View>
            </View>
            <View style={styles.appointmentTime}>
              <View style={styles.timeBadge}>
                <Ionicons name="calendar" size={18} color="#007AFF" />
                <Text style={styles.timeText}>Today, 2:30 PM</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Quick Actions with Blue Gloss */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Book')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, styles.blueGloss]}>
              <Ionicons name="calendar" size={26} color="#007AFF" />
            </View>
            <Text style={styles.actionText}>Book Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Explore')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, styles.blueGloss]}>
              <Ionicons name="medical" size={26} color="#007AFF" />
            </View>
            <Text style={styles.actionText}>Find Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Schedule')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, styles.blueGloss]}>
              <Ionicons name="time" size={26} color="#007AFF" />
            </View>
            <Text style={styles.actionText}>My Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Doctors with Blue Gloss */}
      <View style={styles.popularDoctors}>
        <Text style={styles.sectionTitle}>Popular Doctors</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={styles.doctorCard}
              onPress={() => navigation.navigate('Book')}
              activeOpacity={0.9}
            >
              <View style={styles.doctorCardGloss}>
                <View style={styles.doctorImageGloss}>
                  <Image 
                    source={{ uri: `https://randomuser.me/api/portraits/${item % 2 ? 'men' : 'women'}/${item * 10}.jpg` }}
                    style={styles.doctorCardImage}
                  />
                </View>
                <Text style={styles.doctorCardName}>Dr. James Wilson</Text>
                <Text style={styles.doctorCardSpecialty}>Neurologist</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>4.8</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 5,
  },
  headerGradient: {
    backgroundColor: '#E3F2FD',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 4,
  },
  profileButton: {
    padding: 5,
  },
  profileGloss: {
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  searchContainer: {
    margin: 20,
    marginTop: 15,
  },
  searchGloss: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  appointmentCard: {
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  cardGloss: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageGloss: {
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 30,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#E3F2FD',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  appointmentTime: {
    alignItems: 'flex-end',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  timeText: {
    marginLeft: 6,
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 14,
  },
  quickActions: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#007AFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  blueGloss: {
    backgroundColor: '#E3F2FD',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  actionText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  popularDoctors: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  doctorCard: {
    marginRight: 15,
  },
  doctorCardGloss: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    width: 170,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  doctorImageGloss: {
    alignSelf: 'center',
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 45,
  },
  doctorCardImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#E3F2FD',
  },
  doctorCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  doctorCardSpecialty: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    marginLeft: 5,
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
});

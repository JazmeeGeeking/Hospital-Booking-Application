import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Book: undefined;
  Schedule: undefined;
};

type ExploreScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Explore'>;

type Specialty = {
  id: number;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function ExploreScreen() {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const specialties: Specialty[] = [
    { id: 1, name: 'Cardiology', icon: 'heart' },
    { id: 2, name: 'Dermatology', icon: 'bandage' },
    { id: 3, name: 'Neurology', icon: 'pulse' },
    { id: 4, name: 'Pediatrics', icon: 'people' },
    { id: 5, name: 'Orthopedics', icon: 'fitness' },
    { id: 6, name: 'Ophthalmology', icon: 'eye' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      rating: 4.8,
      reviews: 124,
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      experience: '15 years',
      location: 'City Hospital'
    },
    {
      id: 2,
      name: 'Dr. James Brown',
      specialty: 'Dermatologist',
      rating: 4.7,
      reviews: 98,
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      experience: '12 years',
      location: 'Medical Center'
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrician',
      rating: 4.9,
      reviews: 156,
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      experience: '10 years',
      location: 'Children\'s Hospital'
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Blue Gloss */}
      <View style={styles.header}>
        <View style={styles.headerGloss}>
          <Text style={styles.headerTitle}>Explore</Text>
        </View>
      </View>

      {/* Search Bar with Blue Gloss */}
      <View style={styles.searchContainer}>
        <View style={styles.searchGloss}>
          <Ionicons name="search" size={22} color="#007AFF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Find Nearby Hospitals Button */}
      <View style={styles.nearbyContainer}>
        <TouchableOpacity
          style={styles.nearbyButton}
          onPress={() => {
            // @ts-ignore - Navigation to stack screen
            navigation.navigate('NearbyHospitals');
          }}
          activeOpacity={0.9}
        >
          <View style={styles.nearbyButtonGloss}>
            <View style={styles.nearbyIconGloss}>
              <Ionicons name="location" size={24} color="#007AFF" />
            </View>
            <View style={styles.nearbyTextContainer}>
              <Text style={styles.nearbyTitle}>Find Nearby Hospitals</Text>
              <Text style={styles.nearbySubtitle}>Discover hospitals and clinics near you</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Specialties with Blue Gloss */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {specialties.map((specialty) => (
            <TouchableOpacity 
              key={specialty.id} 
              style={styles.specialtyCard}
              onPress={() => navigation.navigate('Book')}
              activeOpacity={0.9}
            >
              <View style={styles.specialtyGloss}>
                <View style={styles.specialtyIconGloss}>
                  <Ionicons name={specialty.icon} size={26} color="#007AFF" />
                </View>
                <Text style={styles.specialtyName}>{specialty.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Top Doctors with Blue Gloss */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Doctors</Text>
        {doctors.map((doctor) => (
          <TouchableOpacity 
            key={doctor.id} 
            style={styles.doctorCard}
            activeOpacity={0.9}
          >
            <View style={styles.doctorCardGloss}>
              <View style={styles.doctorImageGloss}>
                <Image 
                  source={{ uri: doctor.image }}
                  style={styles.doctorImage}
                />
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text style={styles.rating}>{doctor.rating}</Text>
                  <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
                </View>
                <View style={styles.doctorDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="time" size={16} color="#007AFF" />
                    <Text style={styles.detailText}>{doctor.experience} experience</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="location" size={16} color="#007AFF" />
                    <Text style={styles.detailText}>{doctor.location}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => navigation.navigate('Book')}
                activeOpacity={0.8}
              >
                <View style={styles.bookButtonGloss}>
                  <Text style={styles.bookButtonText}>Book</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
  headerGloss: {
    backgroundColor: '#E3F2FD',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#007AFF',
  },
  specialtyCard: {
    marginRight: 15,
  },
  specialtyGloss: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    width: 110,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  specialtyIconGloss: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  specialtyName: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  doctorCard: {
    marginBottom: 18,
  },
  doctorCardGloss: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  doctorImageGloss: {
    marginRight: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 45,
  },
  doctorImage: {
    width: 85,
    height: 85,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#E3F2FD',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 6,
    color: '#333',
    fontWeight: '600',
    fontSize: 15,
  },
  reviews: {
    marginLeft: 6,
    color: '#666',
    fontSize: 13,
  },
  doctorDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 6,
  },
  detailText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 13,
    fontWeight: '500',
  },
  nearbyContainer: {
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  nearbyButton: {
    // Container for the button
  },
  nearbyButtonGloss: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  nearbyIconGloss: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  nearbyTextContainer: {
    flex: 1,
  },
  nearbyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  nearbySubtitle: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  bookButton: {
    marginLeft: 10,
  },
  bookButtonGloss: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

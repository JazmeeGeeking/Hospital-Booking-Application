import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapsView from '../components/MapsView';
import {
  getCurrentLocation,
  getNearbyHospitals,
  Hospital,
  LocationData,
  openDirections,
} from '../services/locationService';

export default function NearbyHospitalsScreen() {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Mock hospital data - In a real app, this would come from an API
  const mockHospitals: Hospital[] = [
    {
      id: 1,
      name: 'City Hospital',
      specialty: 'General',
      address: '123 Main Street, City Center',
      latitude: 37.78825,
      longitude: -122.4324,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Medical Center',
      specialty: 'Cardiology',
      address: '456 Health Avenue, Downtown',
      latitude: 37.78425,
      longitude: -122.4284,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Children's Hospital",
      specialty: 'Pediatrics',
      address: '789 Care Boulevard, Medical District',
      latitude: 37.79225,
      longitude: -122.4364,
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Community Clinic',
      specialty: 'Family Medicine',
      address: '321 Wellness Road, Suburb',
      latitude: 37.78025,
      longitude: -122.4244,
      rating: 4.6,
    },
  ];

  useEffect(() => {
    loadNearbyHospitals();
  }, []);

  const loadNearbyHospitals = async () => {
    setLoading(true);
    const location = await getCurrentLocation();
    
    if (location) {
      setUserLocation(location);
      const nearby = getNearbyHospitals(location, mockHospitals);
      setNearbyHospitals(nearby);
    } else {
      Alert.alert(
        'Location Permission',
        'Please enable location services to find nearby hospitals.',
        [{ text: 'OK' }]
      );
      // Use default location if permission denied
      const defaultLocation: LocationData = { latitude: 37.78825, longitude: -122.4324 };
      setUserLocation(defaultLocation);
      const nearby = getNearbyHospitals(defaultLocation, mockHospitals);
      setNearbyHospitals(nearby);
    }
    setLoading(false);
  };

  const handleGetDirections = async (hospital: Hospital) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open maps application.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open directions.');
    }
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Finding nearby hospitals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerGloss}>
          <Text style={styles.headerTitle}>Nearby Hospitals</Text>
          <View style={styles.viewModeButtons}>
            <TouchableOpacity
              style={[styles.viewModeButton, viewMode === 'map' && styles.viewModeButtonActive]}
              onPress={() => setViewMode('map')}
              activeOpacity={0.8}
            >
              <Ionicons
                name="map"
                size={20}
                color={viewMode === 'map' ? '#fff' : '#007AFF'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
              onPress={() => setViewMode('list')}
              activeOpacity={0.8}
            >
              <Ionicons
                name="list"
                size={20}
                color={viewMode === 'list' ? '#fff' : '#007AFF'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <MapsView
            hospitals={nearbyHospitals}
            onHospitalSelect={handleHospitalSelect}
            showUserLocation={true}
            initialRegion={
              userLocation
                ? {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }
                : undefined
            }
          />
          {selectedHospital && (
            <View style={styles.hospitalInfoCard}>
              <View style={styles.hospitalInfoGloss}>
                <Text style={styles.hospitalInfoName}>{selectedHospital.name}</Text>
                <Text style={styles.hospitalInfoAddress}>{selectedHospital.address}</Text>
                {selectedHospital.distance && (
                  <Text style={styles.hospitalInfoDistance}>
                    {selectedHospital.distance} km away
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.directionsButton}
                  onPress={() => handleGetDirections(selectedHospital)}
                  activeOpacity={0.8}
                >
                  <View style={styles.directionsButtonGloss}>
                    <Ionicons name="navigate" size={18} color="#fff" />
                    <Text style={styles.directionsButtonText}>Get Directions</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ) : (
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {nearbyHospitals.map((hospital) => (
            <TouchableOpacity
              key={hospital.id}
              style={styles.hospitalCard}
              onPress={() => handleGetDirections(hospital)}
              activeOpacity={0.9}
            >
              <View style={styles.hospitalCardGloss}>
                <View style={styles.hospitalIconGloss}>
                  <Ionicons name="medical" size={28} color="#007AFF" />
                </View>
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <Text style={styles.hospitalSpecialty}>{hospital.specialty}</Text>
                  <Text style={styles.hospitalAddress}>{hospital.address}</Text>
                  {hospital.distance && (
                    <View style={styles.distanceContainer}>
                      <Ionicons name="location" size={16} color="#007AFF" />
                      <Text style={styles.distanceText}>{hospital.distance} km away</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.directionsIconButton}
                  onPress={() => handleGetDirections(hospital)}
                  activeOpacity={0.8}
                >
                  <View style={styles.directionsIconGloss}>
                    <Ionicons name="navigate" size={24} color="#007AFF" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  viewModeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E3F2FD',
  },
  viewModeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#BBDEFB',
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  hospitalInfoCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  hospitalInfoGloss: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  hospitalInfoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  hospitalInfoAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  hospitalInfoDistance: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  directionsButton: {
    marginTop: 8,
  },
  directionsButtonGloss: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  directionsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  hospitalCard: {
    marginBottom: 18,
  },
  hospitalCardGloss: {
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
  hospitalIconGloss: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  hospitalSpecialty: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 6,
  },
  hospitalAddress: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    marginLeft: 6,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  directionsIconButton: {
    marginLeft: 10,
  },
  directionsIconGloss: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
});


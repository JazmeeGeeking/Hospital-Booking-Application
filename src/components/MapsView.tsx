import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentLocation, Hospital, LocationData } from '../services/locationService';

// Conditionally import MapView only on native platforms
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;
let Region: any = null;

if (Platform.OS !== 'web') {
  try {
    const MapsModule = require('react-native-maps');
    MapView = MapsModule.default;
    Marker = MapsModule.Marker;
    PROVIDER_GOOGLE = MapsModule.PROVIDER_GOOGLE;
    Region = MapsModule.Region;
  } catch (e) {
    console.warn('react-native-maps not available');
  }
}

interface MapsViewProps {
  hospitals: Hospital[];
  onHospitalSelect?: (hospital: Hospital) => void;
  showUserLocation?: boolean;
  initialRegion?: any;
}

export default function MapsView({
  hospitals,
  onHospitalSelect,
  showUserLocation = true,
  initialRegion,
}: MapsViewProps) {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [region, setRegion] = useState<any>(
    initialRegion || {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );
  const [loading, setLoading] = useState(true);

  // Web fallback
  if (Platform.OS === 'web' || !MapView) {
    return (
      <View style={styles.webFallback}>
        <View style={styles.webFallbackContent}>
          <Ionicons name="map-outline" size={64} color="#007AFF" />
          <Text style={styles.webFallbackTitle}>Map View</Text>
          <Text style={styles.webFallbackText}>
            Maps are available on iOS and Android devices.
          </Text>
          <Text style={styles.webFallbackSubtext}>
            {hospitals.length} hospital{hospitals.length !== 1 ? 's' : ''} found nearby
          </Text>
          <View style={styles.hospitalList}>
            {hospitals.slice(0, 3).map((hospital) => (
              <TouchableOpacity
                key={hospital.id}
                style={styles.hospitalListItem}
                onPress={() => onHospitalSelect?.(hospital)}
                activeOpacity={0.8}
              >
                <Ionicons name="medical" size={24} color="#007AFF" />
                <View style={styles.hospitalListItemText}>
                  <Text style={styles.hospitalListItemName}>{hospital.name}</Text>
                  <Text style={styles.hospitalListItemAddress}>{hospital.address}</Text>
                  {hospital.distance && (
                    <Text style={styles.hospitalListItemDistance}>
                      {hospital.distance} km away
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }

  useEffect(() => {
    loadUserLocation();
  }, []);

  const loadUserLocation = async () => {
    setLoading(true);
    const location = await getCurrentLocation();
    if (location) {
      setUserLocation(location);
      setRegion({
        ...region,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
    setLoading(false);
  };

  const handleMarkerPress = (hospital: Hospital) => {
    if (onHospitalSelect) {
      onHospitalSelect(hospital);
    }
  };

  const openDirections = async (hospital: Hospital) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Can't open maps URL");
      }
    } catch (error) {
      console.error('Error opening directions:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {MapView && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation={showUserLocation && !!userLocation}
          showsMyLocationButton={true}
          showsCompass={true}
          toolbarEnabled={false}
        >
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              coordinate={{
                latitude: hospital.latitude,
                longitude: hospital.longitude,
              }}
              title={hospital.name}
              description={hospital.address}
              onPress={() => handleMarkerPress(hospital)}
            >
              <View style={styles.markerContainer}>
                <View style={styles.markerGloss}>
                  <Ionicons name="medical" size={24} color="#007AFF" />
                </View>
              </View>
            </Marker>
          ))}
        </MapView>
      )}
      
      {userLocation && (
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={loadUserLocation}
          activeOpacity={0.8}
        >
          <View style={styles.myLocationGloss}>
            <Ionicons name="locate" size={24} color="#007AFF" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
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
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerGloss: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#E3F2FD',
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  myLocationGloss: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#E3F2FD',
  },
  webFallback: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webFallbackContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  webFallbackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 20,
    marginBottom: 10,
  },
  webFallbackText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  webFallbackSubtext: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 20,
  },
  hospitalList: {
    width: '100%',
    gap: 12,
  },
  hospitalListItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  hospitalListItemText: {
    flex: 1,
    marginLeft: 12,
  },
  hospitalListItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  hospitalListItemAddress: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  hospitalListItemDistance: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
});


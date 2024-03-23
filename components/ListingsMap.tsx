import { Text, View, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { defaultStyles } from '@/constants/Styles';
import { GeoListing } from '@/interfaces/geolisting';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';

interface Props {
  listings: GeoListing[];
}

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter();
  const onMarkerSelected = (item: GeoListing) => {
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
        <View style={styles.marker}>
          <Text style={{ color: '#000', textAlign: 'center', fontFamily: 'mon-sb', fontSize: 16 }}>
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        // renderCluster={renderCluster}
      >
        {listings.map((item: GeoListing) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              longitude: item.geometry.coordinates[0],
              latitude: item.geometry.coordinates[1],
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>$ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

ListingsMap.displayName = 'ListingsMap';

const styles = StyleSheet.create({
  container: { flex: 1 },
  marker: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 10 },
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
});

export default ListingsMap;

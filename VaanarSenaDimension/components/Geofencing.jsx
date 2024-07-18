import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, Button } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import haversine from "haversine";
import NurseMarkerImage from "./Icons/nurse.png";
import PatientMarkerImage from "./Icons/patient.png";
import { Image } from "react-native";

const markers = [
  {
    id: 1,
    latitude: 18.55,
    longitude: 73.89,
    title: "Care Giver",
    description: "This is care giver's location",
  },
];

const geofence = {
  center: {
    latitude: 18.55,
    longitude: 73.89,
  },
  radius: 500, // Radius in meters
};

const Geofencing = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 18.551,
    longitude: 73.891,
  });
  console.log("this is user location", userLocation);
  const [insideGeofence, setInsideGeofence] = useState(false);

  const checkGeofence = (location) => {
    const distance = haversine(geofence.center, location, { unit: "meter" });
    if (distance <= geofence.radius) {
      setInsideGeofence(true);
    } else {
      setInsideGeofence(false);
      Alert.alert("Geofence Alert", "You have exited the geofenced area!");
    }
  };

  useEffect(() => {
    checkGeofence(userLocation);
  }, [userLocation]);

  const changeLocation = () => {
    setUserLocation({
      latitude: userLocation.latitude + 0.001,
      longitude: userLocation.longitude + 0.001,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 18.55,
          longitude: 73.89,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        onUserLocationChange={(event) => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          setUserLocation({ latitude, longitude });
        }}
      >
        {/* {markers.map((marker) => ( */}
        <Marker
          key="caregiver-location"
          coordinate={{
            latitude: 18.55,
            longitude: 73.89,
          }}
          title="Care Giver"
          description="This is care giver's location"
        >
          <Image source={NurseMarkerImage} style={{ width: 50, height: 50 }} />
        </Marker>
        <Marker
          key="patient-location"
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Care Giver"
          description="This is care giver's location"
        >
          <Image
            source={PatientMarkerImage}
            style={{ width: 50, height: 50 }}
          />
        </Marker>
        {/* ))} */}
        <Circle
          center={geofence.center}
          radius={geofence.radius}
          strokeColor="rgba(0,0,255,0.5)"
          fillColor="rgba(0,0,255,0.2)"
        />
      </MapView>
      <View style={styles.status}>
        <Text>{insideGeofence ? "Inside Geofence" : "Outside Geofence"}</Text>
        <Button title="Change Location" onPress={changeLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  status: {
    position: "absolute",
    bottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
  },
});

export default Geofencing;

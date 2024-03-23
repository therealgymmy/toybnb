import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { Listing } from '@/interfaces/listing';
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from '@/components/Listings';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  listings: Listing[];
  category: string;
}

const ListingBottomSheet = ({ listings, category }: Props) => {
  const buttomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['8%', '100%'], []);
  const [refresh, setRefresh] = useState(0);

  const showMap = () => {
    buttomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={buttomSheetRef}
      index={1}
      snapPoints={snapPoints}
      topInset={-50}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <Listings refresh={refresh} listings={listings} category={category} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={showMap} style={styles.btn}>
            <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
            <Ionicons name="map" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
  },
});

export default ListingBottomSheet;

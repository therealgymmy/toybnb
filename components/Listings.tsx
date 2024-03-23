import {
  StyleSheet,
  Text,
  View,
  Image,
  ListRenderItem,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
  listings: Listing[];
  category: string;
  refresh: number;
}

const Listings = ({ listings, category, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  // const listRef = useRef<BottomSheetFlatListMethods>(null);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log('Refresh listings: ' + refresh);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [refresh]);

  useEffect(() => {
    console.log('Reload listing for:', category, ', length:', listings.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity style={{ position: 'absolute', top: 30, right: 30 }}>
            <Ionicons name="heart-outline" size={24} color={'#000'} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="star" size={16} color={'#000'} />
              <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating / 20}</Text>
            </View>
          </View>
          <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'mon-sb' }}>${item.price}</Text>
            <Text style={{ fontFamily: 'mon' }}> / night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={{ backgroundColor: '#fff' }}>
      {/* TODO: don't know why BottomSheetFlatList doesn't render anything */}
      {/* <BottomSheetFlatList */}
      <FlatList
        ref={listRef}
        data={loading ? [] : listings}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.listingsSummary}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{listings.length} homes</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 4,
    marginVertical: 0,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  listingsSummary: {
    alignItems: 'center',
  },
});

export default Listings;

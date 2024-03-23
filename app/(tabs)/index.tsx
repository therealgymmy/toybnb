import { Stack } from 'expo-router';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { Listing } from '@/interfaces/listing';
import ListingsMap from '@/components/ListingsMap';
import ListingBottomSheet from '@/components/ListingBottomSheet';

const Page = () => {
  const [category, setCategory] = React.useState('Tiny homes');
  const items = useMemo(() => listingsData as Listing[], []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop: 120 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsMap listings={listingsDataGeo.features} />
      <ListingBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Page;

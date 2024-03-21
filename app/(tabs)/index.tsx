import { Stack } from 'expo-router';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';

const Page = () => {
  const [category, setCategory] = React.useState('Tiny homes');
  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Page;

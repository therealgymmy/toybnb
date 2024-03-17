import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const Page = () => {
  return (
    <View>
      <Text>Page</Text>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Booking</Link>
    </View>
  );
};

export default Page;

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import Card from "../../components/ItemCard";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../queries/items";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [filter, setFiltered] = useState([]);
  const { loading, error, data } = useQuery(GET_ITEMS);

  useEffect(() => {
    if (data) {
      if (category == "All") {
        setFiltered(data.getItems);
      } else {
        const _items = data.getItems.filter(
          (el) => el.Category.name == category
        );
        setFiltered(_items);
      }
    }
  }, [category, data]);

  const changeCategory = (val) => {
    setCategory(val);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}>
        <Button
          title="All Menu"
          color="green"
          onPress={() => {
            changeCategory("All");
          }}
        />
        <Button
          title="Main Menu"
          color="green"
          onPress={() => {
            changeCategory("Main Menu");
          }}
        />
        <Button
          title="Beverage"
          color="green"
          onPress={() => {
            changeCategory("Beverage");
          }}
        />
        <Button
          title="Snack"
          color="green"
          onPress={() => {
            changeCategory("Snack");
          }}
        />
        <Button
          title="Desert"
          color="green"
          onPress={() => {
            changeCategory("Desert");
          }}
        />
        <Button
          title="Soup"
          color="green"
          onPress={() => {
            changeCategory("Soup");
          }}
        />
      </View>
      <FlatList
        data={filter}
        renderItem={(ite) => <Card item={ite} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

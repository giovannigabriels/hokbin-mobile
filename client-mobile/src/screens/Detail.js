import { ActivityIndicator, Image, Text, View } from "react-native";

import { useQuery } from "@apollo/client";
import { GET_ITEM_BY_ID } from "../queries/items";
export default function Detail({ route }) {
  const { itemId } = route.params;
  const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
    variables: {
      getOneItemId: itemId,
    },
  });
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <Image
        style={{
          width: 375,
          height: 300,
          justifyContent: "space-around",
          marginHorizontal: 10,
          marginVertical: 8,
        }}
        source={{ uri: data.getOneItem.imgUrl }}
      />
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", marginBottom: 10 }}>
          {data.getOneItem.name}
        </Text>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", marginBottom: 10 }}>
          Rp {data.getOneItem.price}
        </Text>

        <Text style={{ marginBottom: 10 }}>{data.getOneItem.description}</Text>

        <Text style={{ fontWeight: "bold" }}>Contains : </Text>
        {data.getOneItem.Ingredients.map((el, i) => {
          return (
            <Text key={i}>
              {i + 1}. {el.name}
            </Text>
          );
        })}

        <Text
          style={{
            textAlign: "center",
            backgroundColor: "gray",
            fontWeight: "bold",
          }}>
          By : {data.getOneItem.User.username}
        </Text>
      </View>
    </View>
  );
}

import { useNavigation } from "@react-navigation/native";

import { Image, View, Text, StyleSheet, Button } from "react-native";
export default function Card({ item }) {
  const navigation = useNavigation();

  return (
    <View>
      <View style={style.card}>
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={{ uri: item.item.imgUrl }}
        />
        <View
          style={{
            padding: 10,
            flexDirection: "column",
          }}>
          <Button
            onPress={() => {
              navigation.navigate("Detail", {
                itemId: item.item.id,
              });
            }}
            title={item.item.name}
            color="red"
          />
          <Text>Rp {item.item.price}</Text>
          <Text>{item.item.Category.name}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    margin: 10,
    marginTop: 10,
    flexDirection: "row",
  },
});

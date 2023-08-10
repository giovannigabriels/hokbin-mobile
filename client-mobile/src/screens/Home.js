import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}></View>

      <View style={styles.profile}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginTop: 25,
              fontSize: 20,
            }}>
            Hi, User, Welcome Back!
          </Text>
          <Image
            style={{
              width: 75,
              height: 75,
            }}
            source={{
              uri: "https://www.hokben.co.id/assets/img/logo_hokben_1.png",
            }}
          />
        </View>
      </View>
      <View style={styles.promo}>
        <Image
          style={{
            width: 350,
            height: 150,
            marginTop: 30,
            marginHorizontal: 25,
          }}
          source={{
            uri: "https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/660563039c8df00662a300e6e3b3084b-1664558013106",
          }}
        />
        <View style={styles.buttons}>
          <View style={{ flexDirection: "column" }}>
            <Image
              style={{
                width: 85,
                height: 70,
                marginTop: 25,
              }}
              source={{
                uri: "https://www.hokben.co.id/assets/img/logo_hokben_1.png",
              }}
            />
            <Text style={{ textAlign: "center" }}>Delivery</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              style={{
                width: 85,
                height: 70,
                marginTop: 25,
              }}
              source={{
                uri: "https://www.hokben.co.id/assets/img/logo_hokben_1.png",
              }}
            />
            <Text style={{ textAlign: "center" }}>Take Away</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              style={{
                width: 85,
                height: 70,
                marginTop: 25,
              }}
              source={{
                uri: "https://www.hokben.co.id/assets/img/logo_hokben_1.png",
              }}
            />
            <Text style={{ textAlign: "center" }}>Drive Thru</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              style={{
                width: 85,
                height: 70,
                marginTop: 25,
              }}
              source={{
                uri: "https://www.hokben.co.id/assets/img/logo_hokben_1.png",
              }}
            />
            <Text style={{ textAlign: "center" }}>Large Order</Text>
          </View>
        </View>
      </View>
      <View style={styles.promos}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ textAlign: "center", marginVertical: 5 }}>
            Today's Promo
          </Text>
          <Image
            style={{
              width: 175,
              height: 150,
              marginHorizontal: 15,
              marginBottom: 70,
            }}
            source={{
              uri: "https://1.bp.blogspot.com/-eqbo3MhDjNE/XyeSWIvjGxI/AAAAAAADzUk/_fOF4IU9BNkqtH2n6q2rgDN5ws5h8QFJQCNcBGAsYHQ/s1600/Promo-Hokben-Paket-Big-Deals-Rp-40Ribuan-Orang-Periode-3-8-Agustus-2020.jpg",
            }}
          />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ textAlign: "center", marginVertical: 5 }}>
            News Update
          </Text>
          <Image
            style={{
              width: 175,
              height: 150,
              marginHorizontal: 15,
              marginBottom: 70,
            }}
            source={{
              uri: "https://hargamenu.net/wp-content/uploads/2015/07/harga-menu-large-delivery-hokben.jpg",
            }}
          />
        </View>
      </View>

      <Button
        title="Menu"
        color="green"
        onPress={() => {
          navigation.navigate("Menu");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "red",
  },
  profile: {
    marginTop: 10,
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  promo: {
    flex: 15,
    backgroundColor: "white",
  },
  buttons: {
    flexDirection: "row",
    margin: 7,
    justifyContent: "space-between",
  },
  promos: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

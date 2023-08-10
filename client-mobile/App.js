import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Menu from "./src/screens/Menu";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Detail from "./src/screens/Detail";
import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apollo";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

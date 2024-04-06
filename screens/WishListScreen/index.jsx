import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../../hooks/useFetch";
import WishListBookCard from "../../components/cards/WishListBookCard";

export default function WishListScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const navigation = useNavigation();
  const { data, isLoading, refetch } = useFetch("books");
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
      }}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image
            source={icons.logo}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontSize: 24,
              marginLeft: 15,
            }}
          >
            Wishlist
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={isDarkMode ? icons.searchLight : icons.search}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15 }}>
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                refetch();
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <WishListBookCard
              title={item.title}
              rating={item.rating}
              image={item.image}
              price={item.price}
              onPress={() => {
                navigation.navigate("bookdetails", { id: item.id });
              }}
              style={{ marginBottom: 15 }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.pt,
    paddingHorizontal: SIZES.ph,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
});

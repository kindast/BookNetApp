import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import GenreCard from "../../components/cards/GenreCard";

export default function GenresScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const genres = [
    {
      title: "Romance",
      image:
        "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Thriller",
      image:
        "https://images.unsplash.com/photo-1609133506262-e6c083fb26b5?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Inspiration",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Fantasy",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sci-Fi",
      image:
        "https://plus.unsplash.com/premium_photo-1682124860947-4c0ff8e0742f?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Horror",
      image:
        "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Mystery",
      image:
        "https://images.unsplash.com/photo-1482424917728-d82d29662023?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Psychlogy",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Comedy",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Action",
      image:
        "https://images.unsplash.com/photo-1506411393232-79727bc447af?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Adventure",
      image:
        "https://images.unsplash.com/photo-1551740994-7af69385a217?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Comics",
      image:
        "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
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
        <View style={styles.title}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={isDarkMode ? icons.backLight : icons.back}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontSize: 24,
              marginLeft: 20,
            }}
          >
            Explore by Genre
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={isDarkMode ? icons.searchLight : icons.search}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 35,
        }}
      >
        {genres.map((item, index) => (
          <GenreCard
            title={item.title}
            image={item.image}
            key={index}
            style={{
              height: (windowWidth - 50 - 12) / 2 / 2,
              width: (windowWidth - 50 - 12) / 2,
            }}
          />
        ))}
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
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});

import {View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONT} from '../../constants';

export default function GenreCard({title, image, style, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{
          uri: image,
        }}
        style={{
          resizeMode: 'center',
          ...style,
        }}
        imageStyle={{borderRadius: 11}}>
        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 16,
              color: COLORS.white,
              marginBottom: 8,
              marginLeft: 12,
            }}>
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

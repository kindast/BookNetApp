import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONT, SIZES} from '../../constants';

export default function Button({title, onPress, style, showShadow}) {
  const shadow = showShadow
    ? {
        shadowColor: COLORS.primary,
        shadowRadius: 24,
        shadowOffset: {width: 4, height: 8},
        shadowOpacity: 0.1,
        elevation: 12,
      }
    : {};

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          paddingHorizontal: 16,
          paddingVertical: 18,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          ...shadow,
          ...style,
        }}>
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONT.bold,
            color: 'white',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

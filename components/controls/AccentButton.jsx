import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONT, SIZES} from '../../constants';
import {useSelector} from 'react-redux';

export default function AccentButton({title, onPress, style}) {
  const isDarkMode = useSelector(state => state.settings.isDarkMode);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: isDarkMode ? '#35383f' : COLORS.secondary,
          paddingHorizontal: 16,
          paddingVertical: 18,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          ...style,
        }}>
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONT.bold,
            color: isDarkMode ? COLORS.white : COLORS.primary,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

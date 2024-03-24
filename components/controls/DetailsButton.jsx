import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FONT, COLORS, icons} from '../../constants';
import {useSelector} from 'react-redux';

export default function DetailsButton({title, onPress, style}) {
  const isDarkMode = useSelector(state => state.settings.isDarkMode);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...style,
        }}>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: isDarkMode ? COLORS.white : COLORS.black,
            fontSize: 24,
          }}>
          {title}
        </Text>
        <Image source={icons.arrow} style={{width: 16, height: 16}} />
      </View>
    </TouchableOpacity>
  );
}

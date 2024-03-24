import {View, Image, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONT, SIZES, icons} from '../../constants';
import {useSelector} from 'react-redux';

export default function GoogleButton({style}) {
  const isDarkMode = useSelector(state => state.settings.isDarkMode);

  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: isDarkMode ? '#1f222a' : '#fff',
          borderColor: isDarkMode ? '#33363d' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          paddingHorizontal: 16,
          paddingVertical: 18,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          flexDirection: 'row',
          gap: 10,
          ...style,
        }}>
        <Image source={icons.google} style={{width: 20, height: 20}} />
        <Text
          style={{
            fontSize: SIZES.medium,
            fontFamily: FONT.bold,
            color: isDarkMode ? '#fff' : COLORS.black,
          }}>
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
}

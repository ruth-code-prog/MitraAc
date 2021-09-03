import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IconMitra,
  IconMitraActive,
  IconInfo,
  IconInfoActive,
  IconMessages,
  IconMessagesActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'Mitra') {
      return active ? <IconMitraActive /> : <IconMitra />;
    }
    if (title === 'Pesan') {
      return active ? <IconMessagesActive /> : <IconMessages />;
    }
    if (title === 'Info') {
      return active ? <IconInfoActive /> : <IconInfo />;
    }
    return <IconAdmin />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  text: active => ({
    fontSize: 10,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});

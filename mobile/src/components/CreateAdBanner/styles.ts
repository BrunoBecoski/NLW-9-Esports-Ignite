import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
    marginTop: 32,
    marginBottom: 16,
    borderRadius: 8,
    borderTopWidth: 4,
    borderTopColor: THEME.COLORS.TEXT,
    backgroundColor: '#2A2634',
  },
  title: {
    fontSize: THEME.FONT_SIZE.LG,
    fontWeight: '900',
    textAlign: 'center',
    color: THEME.COLORS.TEXT,
  },
  subtitle: {
    marginTop: 8,
    fontSize: THEME.FONT_SIZE.SM,
    textAlign: 'center',
    color: THEME.COLORS.CAPTION_400,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
    borderRadius: 6,
    color: THEME.COLORS.TEXT,
    backgroundColor: THEME.COLORS.PRIMARY,
  },
  buttonTitle: {
    marginLeft: 12,
    fontWeight: '600',
    color: THEME.COLORS.TEXT,
  }
});
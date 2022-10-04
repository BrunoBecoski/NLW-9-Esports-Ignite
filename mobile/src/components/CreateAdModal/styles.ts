import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2634',
    height: '100%',
    paddingVertical: 32,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: THEME.FONT_SIZE.LG,
    fontWeight: '900',
    color: THEME.COLORS.TEXT,
  },
  wrapper: {
    marginTop: 16,
  },
  picker: {
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    color: THEME.COLORS.TEXT,
  },
  pickerItem: {
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    color: THEME.COLORS.TEXT,
  },
  label: {
    color: THEME.COLORS.TEXT,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    color: THEME.COLORS.TEXT,
  },
  error: {
    marginTop: 8,
    color: THEME.COLORS.ALERT,
    fontSize: THEME.FONT_SIZE.SM,
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    width: '45%',
  },
  timeButton: {
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 4,
    color: THEME.COLORS.TEXT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeButtonTitle: {
    color: THEME.COLORS.TEXT,
  },
  radioWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButtonInactive: {
    width: 40,
    height: 40,
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  radioButtonActive: {
    width: 40,
    height: 40,
    backgroundColor: THEME.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  radioButtonTitle: {
    color: THEME.COLORS.TEXT,
    fontWeight: 'bold',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  checkbox: {
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    borderColor: THEME.COLORS.BACKGROUND_800,
    borderWidth: 4,
    width: 24,
    height: 24,
  },
  checkboxTitle: {
    marginLeft: 8,
    color: THEME.COLORS.TEXT,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: THEME.COLORS.CAPTION_500,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cancelButtonTitle: {
    color: THEME.COLORS.TEXT,
    fontWeight: '600'
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    color: THEME.COLORS.TEXT,
    backgroundColor: THEME.COLORS.PRIMARY,
  },
  submitButtonTitle: {
    fontWeight: '600',
    color: THEME.COLORS.TEXT,
    marginLeft: 12,
  }
});
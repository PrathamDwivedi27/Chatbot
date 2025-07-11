import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  // Layout
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStretch: {
    alignItems: 'stretch',
  },

  // Colors
  bgBlack: {
    backgroundColor: '#000000',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
  },
  bgGray800: {
    backgroundColor: '#1f2937',
  },
  bgGray900: {
    backgroundColor: '#111827',
  },
  bgGray700: {
    backgroundColor: '#374151',
  },
  bgRed900: {
    backgroundColor: '#7f1d1d',
  },
  bgBlue500: {
    backgroundColor: '#3b82f6',
  },

  // Text Colors
  textWhite: {
    color: '#ffffff',
  },
  textBlack: {
    color: '#000000',
  },
  textGray300: {
    color: '#d1d5db',
  },
  textGray400: {
    color: '#9ca3af',
  },
  textGray500: {
    color: '#6b7280',
  },
  textGray600: {
    color: '#4b5563',
  },
  textRed200: {
    color: '#fecaca',
  },
  textRed400: {
    color: '#f87171',
  },

  // Typography
  textXs: {
    fontSize: 12,
  },
  textSm: {
    fontSize: 14,
  },
  textBase: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
  textXl: {
    fontSize: 20,
  },
  text2Xl: {
    fontSize: 24,
  },
  text3Xl: {
    fontSize: 30,
  },
  text4Xl: {
    fontSize: 36,
  },
  text6Xl: {
    fontSize: 60,
  },

  // Font Weights
  fontNormal: {
    fontWeight: '400',
  },
  fontMedium: {
    fontWeight: '500',
  },
  fontSemibold: {
    fontWeight: '600',
  },
  fontBold: {
    fontWeight: '700',
  },

  // Text Alignment
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },

  // Spacing
  p2: { padding: 8 },
  p3: { padding: 12 },
  p4: { padding: 16 },
  p6: { padding: 24 },
  p8: { padding: 32 },
  px2: { paddingHorizontal: 8 },
  px3: { paddingHorizontal: 12 },
  px4: { paddingHorizontal: 16 },
  px6: { paddingHorizontal: 24 },
  px8: { paddingHorizontal: 32 },
  py2: { paddingVertical: 8 },
  py3: { paddingVertical: 12 },
  py4: { paddingVertical: 16 },
  py6: { paddingVertical: 24 },
  py12: { paddingVertical: 48 },
  py20: { paddingVertical: 80 },
  pt12: { paddingTop: 48 },
  pb4: { paddingBottom: 16 },
  pb6: { paddingBottom: 24 },
  pb20: { paddingBottom: 80 },

  m2: { margin: 8 },
  m3: { margin: 12 },
  m4: { margin: 16 },
  mx3: { marginHorizontal: 12 },
  my4: { marginVertical: 16 },
  mt1: { marginTop: 4 },
  mt2: { marginTop: 8 },
  mt4: { marginTop: 16 },
  mt6: { marginTop: 24 },
  mt8: { marginTop: 32 },
  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb3: { marginBottom: 12 },
  mb4: { marginBottom: 16 },
  mb6: { marginBottom: 24 },
  mb8: { marginBottom: 32 },
  mb12: { marginBottom: 48 },
  ml2: { marginLeft: 8 },
  ml3: { marginLeft: 12 },
  ml4: { marginLeft: 16 },
  mr3: { marginRight: 12 },
  mr4: { marginRight: 16 },

  // Dimensions
  w8: { width: 32 },
  w10: { width: 40 },
  w20: { width: 80 },
  w24: { width: 96 },
  wFull: { width: '100%' },
  h8: { height: 32 },
  h10: { height: 40 },
  h20: { height: 80 },
  h24: { height: 96 },
  hFull: { height: '100%' },
  maxW80: { maxWidth: '80%' },

  // Border Radius
  rounded: { borderRadius: 4 },
  roundedLg: { borderRadius: 8 },
  roundedXl: { borderRadius: 12 },
  rounded2Xl: { borderRadius: 16 },
  roundedFull: { borderRadius: 9999 },

  // Borders
  border: { borderWidth: 1 },
  borderGray700: { borderColor: '#374151' },
  borderGray800: { borderColor: '#1f2937' },
  borderRed700: { borderColor: '#b91c1c' },
  borderT: { borderTopWidth: 1 },

  // Shadows
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },

  // Position
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },

  // Overflow
  hidden: { overflow: 'hidden' },

  // Line Height
  leading5: { lineHeight: 20 },
  leading6: { lineHeight: 24 },
});

export const componentStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  // Card styles
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  secondaryButton: {
    backgroundColor: '#1f2937',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  // Input styles
  textInput: {
    backgroundColor: '#111827',
    color: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  
  chatInput: {
    backgroundColor: '#111827',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Message styles
  userMessage: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  
  aiMessage: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#374151',
  },
  
  errorMessage: {
    backgroundColor: '#7f1d1d',
    borderRadius: 16,
    padding: 16,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#b91c1c',
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  
  // Tab bar styles
  tabBar: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#333333',
    borderTopWidth: 1,
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
  },
  
  // Suggestion chip styles
  suggestionChip: {
    backgroundColor: '#1f2937',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  
  // Icon button styles
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
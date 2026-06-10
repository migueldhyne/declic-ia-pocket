/**
 * Color tokens — light and dark bindings.
 * Customized for Déclic IA / GenerationDeclic
 * Primary accent: orange #E8500A / teal #0A7E6E
 */
import {withOpacity, stateLayerOpacity} from '../../utils/colorUtils';

import {TokenColors} from './types';

// Light base colors
const LIGHT_PRIMARY = '#333333';
const LIGHT_SECONDARY = '#E8500A';      // orange GenerationDeclic
const LIGHT_TERTIARY = '#0A7E6E';       // teal GenerationDeclic
const LIGHT_ERROR = '#FF653F';
const LIGHT_BACKGROUND = '#ffffff';
const LIGHT_ON_BACKGROUND = '#111111';
const LIGHT_SURFACE = '#F9FAFB';
const LIGHT_ON_SURFACE = '#333333';
const LIGHT_INVERSE_ON_SURFACE = '#fcfcfc';

export const lightColors: TokenColors = {
  // MD3 base palette (light)
  primary: LIGHT_PRIMARY,
  onPrimary: '#FFFFFF',
  primaryContainer: '#DEE0E6',
  onPrimaryContainer: '#2D2F33',
  secondary: LIGHT_SECONDARY,
  onSecondary: '#FFFFFF',
  secondaryContainer: '#FDE8DF',
  onSecondaryContainer: '#5C1E04',
  tertiary: LIGHT_TERTIARY,
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#D6F0EC',
  onTertiaryContainer: '#013332',
  error: LIGHT_ERROR,
  onError: '#FFFFFF',
  errorContainer: '#E6ACA9',
  onErrorContainer: '#330B09',
  background: LIGHT_BACKGROUND,
  onBackground: LIGHT_ON_BACKGROUND,
  surface: LIGHT_SURFACE,
  onSurface: LIGHT_ON_SURFACE,
  surfaceVariant: '#e4e4e6',
  onSurfaceVariant: '#646466',
  outline: withOpacity(LIGHT_PRIMARY, 0.05),
  outlineVariant: '#a1a1a1',
  // MD3 extras
  surfaceDisabled: withOpacity('#fcfcfc', 0.12),
  onSurfaceDisabled: withOpacity('#333333', 0.38),
  inverseSurface: '#858585',
  inverseOnSurface: LIGHT_INVERSE_ON_SURFACE,
  inversePrimary: '#DEE0E6',
  inverseSecondary: '#F4845A',
  shadow: '#000000',
  scrim: 'rgba(0, 0, 0, 0.25)',
  backdrop: 'rgba(51, 51, 51, 0.6)',

  // Semantic surface variants
  surfaceContainerHighest: withOpacity(LIGHT_PRIMARY, 0.05),
  surfaceContainerHigh: withOpacity(LIGHT_PRIMARY, 0.03),
  surfaceContainer: withOpacity(LIGHT_PRIMARY, 0.02),
  surfaceContainerLow: withOpacity(LIGHT_PRIMARY, 0.01),
  surfaceContainerLowest: LIGHT_SURFACE,
  surfaceDim: withOpacity(LIGHT_PRIMARY, 0.06),
  surfaceBright: LIGHT_SURFACE,

  // Text
  text: LIGHT_ON_BACKGROUND,
  textSecondary: withOpacity(LIGHT_ON_SURFACE, 0.5),
  inverseText: LIGHT_INVERSE_ON_SURFACE,
  inverseTextSecondary: withOpacity(LIGHT_INVERSE_ON_SURFACE, 0.5),

  // Border / placeholder
  border: withOpacity(LIGHT_ON_SURFACE, 0.05),
  placeholder: withOpacity(LIGHT_ON_SURFACE, 0.3),

  // Interactive state opacities
  stateLayerOpacity: 0.12,
  hoverStateOpacity: stateLayerOpacity.hover,
  pressedStateOpacity: stateLayerOpacity.pressed,
  draggedStateOpacity: stateLayerOpacity.dragged,
  focusStateOpacity: stateLayerOpacity.focus,

  // Menu
  menuBackground: LIGHT_SURFACE,
  menuBackgroundDimmed: withOpacity(LIGHT_SURFACE, 0.9),
  menuBackgroundActive: withOpacity(LIGHT_SECONDARY, 0.08),
  menuSeparator: withOpacity(LIGHT_PRIMARY, 0.5),
  menuGroupSeparator: withOpacity('#000000', 0.08),
  menuText: LIGHT_ON_SURFACE,
  menuDangerText: LIGHT_ERROR,

  // Messages
  authorBubbleBackground: '#f2f2f2',
  receivedMessageDocumentIcon: LIGHT_PRIMARY,
  sentMessageDocumentIcon: LIGHT_ON_SURFACE,
  userAvatarImageBackground: 'transparent',
  userAvatarNameColors: [
    LIGHT_SECONDARY,
    LIGHT_TERTIARY,
    LIGHT_PRIMARY,
    LIGHT_ERROR,
  ],
  searchBarBackground: 'rgba(118, 118, 128, 0.12)',

  // Thinking bubble
  thinkingBubbleBackground: '#f0faf8',
  thinkingBubbleText: '#0A7E6E',
  thinkingBubbleBorder: 'rgba(10, 126, 110, 0.4)',
  thinkingBubbleShadow: '#0A7E6E',
  thinkingBubbleChevronBackground: 'rgba(10, 126, 110, 0.1)',
  thinkingBubbleChevronBorder: 'rgba(10, 126, 110, 0.2)',

  // Status bar
  bgStatusActive: '#22c55e',
  bgStatusIdle: '#d1d5db',

  // Buttons — orange GenerationDeclic
  btnPrimaryBg: '#FEF0EB',
  btnPrimaryBorder: '#F4C4AD',
  btnPrimaryText: '#E8500A',
  btnReadyBg: '#ecfdf5',
  btnReadyBorder: '#bbf7d0',
  btnReadyText: '#047857',
  btnDownloadBg: '#EDFAF7',
  btnDownloadBorder: '#A8DDD7',
  btnDownloadText: '#0A7E6E',

  // Icons
  iconModelTypeText: '#E8500A',
  iconModelTypeVision: '#0A7E6E',
  iconModelTypeAudio: '#f97316',
};

// Dark base values
const DARK_PRIMARY = '#DADDE6';
const DARK_SECONDARY = '#F4845A';       // orange clair pour fond sombre
const DARK_TERTIARY = '#4DBFB3';        // teal clair pour fond sombre
const DARK_ERROR = '#FF653F';
const DARK_BACKGROUND = '#000000';
const DARK_ON_BACKGROUND = '#ffffff';
const DARK_SURFACE = '#0E0E0E';
const DARK_ON_SURFACE = '#E2E2E2';
const DARK_INVERSE_ON_SURFACE = '#333333';

export const darkColors: TokenColors = {
  // MD3 base palette (dark)
  primary: DARK_PRIMARY,
  onPrimary: '#44464C',
  primaryContainer: '#5B5E66',
  onPrimaryContainer: '#DEE0E6',
  secondary: DARK_SECONDARY,
  onSecondary: '#4C1E04',
  secondaryContainer: '#7A2E08',
  onSecondaryContainer: '#FDE8DF',
  tertiary: DARK_TERTIARY,
  onTertiary: '#014C4C',
  tertiaryContainer: '#016665',
  onTertiaryContainer: '#9EE6E5',
  error: DARK_ERROR,
  onError: '#4C100D',
  errorContainer: '#661511',
  onErrorContainer: '#E6ACA9',
  background: DARK_BACKGROUND,
  onBackground: DARK_ON_BACKGROUND,
  surface: DARK_SURFACE,
  onSurface: DARK_ON_SURFACE,
  surfaceVariant: '#646466',
  onSurfaceVariant: '#e3e4e6',
  outline: '#444444',
  outlineVariant: '#a1a1a1',
  // MD3 extras
  surfaceDisabled: withOpacity('#333333', 0.12),
  onSurfaceDisabled: withOpacity('#e5e5e6', 0.38),
  inverseSurface: '#e5e5e6',
  inverseOnSurface: DARK_INVERSE_ON_SURFACE,
  inversePrimary: '#5B5E66',
  inverseSecondary: LIGHT_SECONDARY,
  shadow: '#ffffff',
  scrim: 'rgba(0, 0, 0, 0.25)',
  backdrop: 'rgba(66, 66, 66, 0.8)',

  // Semantic surface variants
  surfaceContainerHighest: withOpacity(DARK_SURFACE, 0.22),
  surfaceContainerHigh: withOpacity(DARK_SURFACE, 0.16),
  surfaceContainer: withOpacity(DARK_SURFACE, 0.12),
  surfaceContainerLow: withOpacity(DARK_SURFACE, 0.08),
  surfaceContainerLowest: withOpacity(DARK_SURFACE, 0.04),
  surfaceDim: withOpacity(DARK_SURFACE, 0.06),
  surfaceBright: withOpacity(DARK_SURFACE, 0.24),

  // Text
  text: DARK_ON_BACKGROUND,
  textSecondary: withOpacity(DARK_ON_SURFACE, 0.5),
  inverseText: DARK_INVERSE_ON_SURFACE,
  inverseTextSecondary: withOpacity(DARK_INVERSE_ON_SURFACE, 0.5),

  // Border / placeholder
  border: withOpacity(DARK_ON_SURFACE, 0.05),
  placeholder: withOpacity(DARK_ON_SURFACE, 0.3),

  // Interactive state opacities
  stateLayerOpacity: 0.12,
  hoverStateOpacity: stateLayerOpacity.hover,
  pressedStateOpacity: stateLayerOpacity.pressed,
  draggedStateOpacity: stateLayerOpacity.dragged,
  focusStateOpacity: stateLayerOpacity.focus,

  // Menu
  menuBackground: '#2a2a2a',
  menuBackgroundDimmed: withOpacity(DARK_SURFACE, 0.9),
  menuBackgroundActive: withOpacity(DARK_SECONDARY, 0.08),
  menuSeparator: withOpacity(DARK_PRIMARY, 0.5),
  menuGroupSeparator: withOpacity('#FFFFFF', 0.08),
  menuText: DARK_ON_SURFACE,
  menuDangerText: DARK_ERROR,

  // Messages
  authorBubbleBackground: '#212121',
  receivedMessageDocumentIcon: DARK_PRIMARY,
  sentMessageDocumentIcon: DARK_ON_SURFACE,
  userAvatarImageBackground: 'transparent',
  userAvatarNameColors: [
    DARK_SECONDARY,
    DARK_TERTIARY,
    DARK_PRIMARY,
    DARK_ERROR,
  ],
  searchBarBackground: 'rgba(28, 28, 30, 0.92)',

  // Thinking bubble — teal GenerationDeclic
  thinkingBubbleBackground: '#0A1E1C',
  thinkingBubbleText: '#4DBFB3',
  thinkingBubbleBorder: 'rgba(77, 191, 179, 0.6)',
  thinkingBubbleShadow: '#4DBFB3',
  thinkingBubbleChevronBackground: 'rgba(77, 191, 179, 0.15)',
  thinkingBubbleChevronBorder: 'rgba(77, 191, 179, 0.3)',

  // Status bar
  bgStatusActive: '#22c55e',
  bgStatusIdle: '#4b5563',

  // Buttons — orange GenerationDeclic sombre
  btnPrimaryBg: '#2A1208',
  btnPrimaryBorder: '#7A2E08',
  btnPrimaryText: '#F4845A',
  btnReadyBg: '#052e16',
  btnReadyBorder: '#166534',
  btnReadyText: '#6ee7b7',
  btnDownloadBg: '#071A18',
  btnDownloadBorder: '#0A4A43',
  btnDownloadText: '#4DBFB3',

  // Icons
  iconModelTypeText: '#F4845A',
  iconModelTypeVision: '#4DBFB3',
  iconModelTypeAudio: '#fdba74',
};

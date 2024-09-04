import { useEffect, useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider, ThemeOptions } from '@mui/material/styles';
import { useRTL } from '@/contexts/SettingsProvider';
import palette from './palette';
// import useSettings from '../hooks/useSettings';
// import palette from './palette';
// import typography from './typography';
// import breakpoints from './breakpoints';
// import componentsOverride from './overrides';
// import shadows, { customShadows } from './shadows';

export default function ThemeProvider({ children }: {
  children: JSX.Element
}) {
  // const { themeMode, themeDirection } = useSettings();
  // const isLight = themeMode === 'light';
  const { isRTL } = useRTL();
  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette: palette.dark,
      // typography,
      // breakpoints,
      direction: isRTL ? "rtl" : "ltr",
      // shadows: isLight ? shadows.light : shadows.dark,
      // customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    // [isLight, isRTL]
    [isRTL]
  );

  const theme = createTheme(themeOptions);
  // theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme} >
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
import React from 'react'
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme/AppTheme';

export const JorunalApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter/>
      </AppTheme>
    </>
  )
}

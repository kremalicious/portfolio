import React from 'react'
import { renderToString } from 'react-dom/server'
import AppProvider from './src/store/AppProvider'
import wrapPageElementWithLayout from './src/helpers/wrapPageElement'

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  // React Context in SSR/build
  const ConnectedBody = () => <AppProvider>{bodyComponent}</AppProvider>
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}

// Layout with Page Transitions
export const wrapPageElement = wrapPageElementWithLayout

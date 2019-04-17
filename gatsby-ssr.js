import React from 'react'
import { renderToString } from 'react-dom/server'
import AppProvider from './src/store/Provider'
import wrapPageElementWithTransition from './src/helpers/wrapPageElement'

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  // React Context in SSR/build
  const ConnectedBody = () => <AppProvider>{bodyComponent}</AppProvider>
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}

// Page Transitions & Layout
export const wrapPageElement = wrapPageElementWithTransition

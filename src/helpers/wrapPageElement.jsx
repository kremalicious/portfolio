import React from 'react'
import Layout from '../components/Layout'

const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

export default wrapPageElement

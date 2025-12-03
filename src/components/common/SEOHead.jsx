import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SEOHead({ title = 'My Portfolio', description = '' }) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  )
}

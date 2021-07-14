import React from 'react'
import CompanyCard from '../CompanyCard/CompanyCard'


const CompanyCardProxy = ({ company, history, updateList }) => {
  return (
    <CompanyCard
      key={company.id}
      company={company}
    />
  )
}

export default CompanyCardProxy

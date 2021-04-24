import React from 'react'
import CompanyCard from './CompanyCard'


const CompanyCardProxy = ({ company, history, updateList }) => {
  return (
    <CompanyCard
      key={company.id}
      company={company}
    />
  )
}

export default CompanyCardProxy

import React from 'react'
import CompanyCard from '../CompanyCard/CompanyCard'
import { Link } from 'react-router-dom'


const CompanyCardProxy = ({ company, history, updateList }) => {
  return (
    <Link to={`/companies/${company.companyId}`} style={{ textDecoration: 'none' }}>
      <CompanyCard
        key={company.companyId}
        company={company}
      />
    </Link>
  )
}

export default CompanyCardProxy

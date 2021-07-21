import React from 'react'
import CompanyCard from '../CompanyCard/CompanyCard'
import { Link } from 'react-router-dom'


const CompanyCardProxy = ({ company, history, updateList }) => {
  return (
    <Link to={`/companies/${company.id}`} style={{ textDecoration: 'none' }}>
      <CompanyCard
        key={company.id}
        company={company}
      />
    </Link>
  )
}

export default CompanyCardProxy

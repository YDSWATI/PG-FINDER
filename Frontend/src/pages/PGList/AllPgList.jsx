import React from 'react'
import PGCard from './PgCard'

export const AllPgList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  
        <PGCard />
        <PGCard />
        <PGCard />
        <PGCard />
        <PGCard />

        </div>
  )
}

import React from 'react'

const StatisticCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {Array.from(Array(6)).map((_, i) => (
        <div key={i} className="flex flex-col items-center justify-center rounded-lg border bg-white px-3 py-4 text-center">
          <span className="mb-2 block text-2xl font-semibold">200</span>
          <span className="block text-xs">Total Job Posted</span>
        </div>
      ))}
    </div>
  )
}

export default StatisticCards

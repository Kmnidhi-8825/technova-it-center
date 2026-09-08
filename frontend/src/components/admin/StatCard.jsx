import React from 'react'

export const StatCard = ({title,value,color}) => {
  return (

    <div className={`rounded-2xl p-6 shaodw-lg ${color}`}>
        
    <h3 className="text-lg text-white/80" > {title} </h3>
    <p className="text-4xl font-bold mt-3">{value}</p>
     </div>
  )
}

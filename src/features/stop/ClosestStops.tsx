import React from 'react'
import ClosestStopDisplay from './ClosestStopDisplay'
import {ClosestStop} from './stopSlice'


interface ClosestStopsProps {
    closestStops: ClosestStop[]
}

const ClosestStops: React.FC<ClosestStopsProps> = ({closestStops}) => {
    return (
        <>
            {closestStops.map((cs, index) => <ClosestStopDisplay closestStop={cs} index={index}/>)}
        </>
    )
}

export default ClosestStops
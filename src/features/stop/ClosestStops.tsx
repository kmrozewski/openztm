import React from 'react'
import ClosestStopDisplay from './ClosestStopDisplay'
import {ClosestStop} from './stopSlice'


interface ClosestStopsProps {
    closestStops: ClosestStop[]
}

const ClosestStops: React.FC<ClosestStopsProps> = ({closestStops}) => {
    return (
        <>
            {closestStops.map(cs => <ClosestStopDisplay key={cs.stop.stopId} closestStop={cs}/>)}
        </>
    )
}

export default ClosestStops
import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectCoordinates} from "../position/positionSlice";
import {Circle} from "react-leaflet";

interface LocationMarkerProps {
    accuracy: number
}

const LocationMarker: React.FC<LocationMarkerProps> = ({accuracy}) => {
    const {latitude, longitude} = useAppSelector(selectCoordinates)

    return (
        <Circle
            center={[latitude, longitude]}
            fillColor={"blue"}
            radius={accuracy}
        />
    )
}

export default LocationMarker
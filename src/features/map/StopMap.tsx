import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {useAppSelector} from "../../app/hooks";
import {selectAccuracy, selectCoordinates, selectPositionError} from "../position/positionSlice";
import styles from "./StopMap.module.css"
import {useGetClosestStopsQuery} from "../stop/stopApi";
import StopMarker from "./StopMarker";
import LocationMarker from "./LocationMarker";

const StopMap: React.FC = () => {
    const {latitude, longitude} = useAppSelector(selectCoordinates)
    const accuracy = useAppSelector(selectAccuracy)
    const isError = useAppSelector(selectPositionError)
    const {data, error} = useGetClosestStopsQuery({latitude, longitude})

    if (isError || error) {
        return <>Failed to fetch position</>
    }

    return (
        <MapContainer className={styles.heightFull} center={[latitude, longitude]} zoom={16}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {data && <StopMarker closestStops={data}/>}
            {accuracy && <LocationMarker accuracy={accuracy}/>}
        </MapContainer>
    )
}

export default StopMap
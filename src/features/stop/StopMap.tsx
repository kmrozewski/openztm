import React, {useCallback, useEffect, useRef} from "react";
import {FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import {useAppSelector} from "../../app/hooks";
import {selectCoordinates, selectPositionError} from "../position/positionSlice";
import styles from "./StopMap.module.css"
import {ClosestStop, selectClosestStops} from "./stopSlice";
import {LeafletEvent} from "leaflet";

interface StopMarkerProps {
    closestStops: ClosestStop[]
}

const StopMarker: React.FC<StopMarkerProps> = ({closestStops}) => {
    const map = useMap()
    console.log('stop marker component', closestStops)

    const onFeatureGroupAdd = useCallback((event: LeafletEvent): void => {
        if (closestStops.length !== 0) {
            const bounds = event.target.getBounds()
            console.log('stops', closestStops)
            console.log('fit bounds', bounds)
            map.fitBounds(bounds)
        }
    }, [map, closestStops])

    const addMarkers = useCallback(() => {
        console.log('add markers', closestStops)
        return closestStops.map((cs, index) => {
            return (
                <Marker key={'marker-' + index} position={[cs.stop.stopLat, cs.stop.stopLon]}>
                    <Popup>
                        <span>{cs.stop.stopName} {cs.stop.stopCode}</span>
                    </Popup>
                </Marker>
            )
        })
    }, [closestStops])

    useEffect(() => {
        map.invalidateSize(false)
    }, [closestStops])

    return (
        <FeatureGroup eventHandlers={{add: onFeatureGroupAdd}}>
            {!!closestStops && addMarkers()}
        </FeatureGroup>
    )
}

const StopMap: React.FC = () => {
    const {latitude, longitude} = useAppSelector(selectCoordinates)
    const isError = useAppSelector(selectPositionError)
    const closestStops = useAppSelector(selectClosestStops)

    if (isError) {
        return <>Failed to fetch position</>
    }

    return (
        <MapContainer className={styles.heightFull} center={[latitude, longitude]} zoom={16}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <StopMarker closestStops={closestStops}/>
        </MapContainer>
    )
}

export default StopMap
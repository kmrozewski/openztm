import {ClosestStop} from "../stop/stopApi";
import React, {useCallback, useEffect} from "react";
import {FeatureGroup, Marker, Popup, useMap} from "react-leaflet";
import {LeafletEvent} from "leaflet";

interface StopMarkerProps {
    closestStops: ClosestStop[]
}

const StopMarker: React.FC<StopMarkerProps> = ({closestStops}) => {
    const map = useMap()

    const onFeatureGroupAdd = useCallback((event: LeafletEvent): void => {
        if (closestStops.length !== 0) {
            const bounds = event.target.getBounds()
            map.fitBounds(bounds)
        }
    }, [map, closestStops])

    const addMarkers = useCallback(() => {
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
        map.invalidateSize(true)
    }, [closestStops])

    return (
        <FeatureGroup eventHandlers={{add: onFeatureGroupAdd}}>
            {!!closestStops && addMarkers()}
        </FeatureGroup>
    )
}

export default StopMarker
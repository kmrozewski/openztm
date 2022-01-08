import React, {useCallback, useRef} from "react";
import {FeatureGroup, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useAppSelector} from "../../app/hooks";
import {selectCoordinates, selectPositionError} from "../position/positionSlice";
import styles from "./StopMap.module.css"
import {selectClosestStops} from "./stopSlice";
import L, {LeafletEvent} from "leaflet";


const StopMap: React.FC = () => {
    const {latitude, longitude} = useAppSelector(selectCoordinates)
    const isError = useAppSelector(selectPositionError)
    const closestStops = useAppSelector(selectClosestStops)
    const mapRef = useRef<L.Map>()

    const onFeatureGroupAdd = useCallback((event: LeafletEvent): void => {
        const bounds = event.target.getBounds()
        console.log('fit bounds', bounds)
        mapRef.current?.fitBounds(bounds)
    }, [mapRef])

    const addMarkers = useCallback(() => {
        console.log('add markers', closestStops)
        mapRef.current?.invalidateSize(true)
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

    if (isError) {
        return <>Failed to fetch position</>
    }

    return (
        <MapContainer ref={mapRef} className={styles.heightFull} center={[latitude, longitude]}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <FeatureGroup eventHandlers={{add: onFeatureGroupAdd}}>
                {addMarkers()}
            </FeatureGroup>
        </MapContainer>
    )
}

export default StopMap
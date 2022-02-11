import React, {useCallback} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {useAppSelector} from "../../app/hooks";
import {selectAccuracy, selectCoordinates, selectPositionError} from "../position/positionSlice";
import styles from "./StopMap.module.css"
import StopMarker from "./StopMarker";
import LocationMarker from "./LocationMarker";
import {LatLngExpression} from "leaflet";
import VehicleMarker from "../vehicle/VehicleMarker";
import {selectClosestStops} from "../stop/stopSlice";
import {selectVehicleIds, selectVehicles, Vehicle} from "../vehicle/vehicleSlice";

const StopMap: React.FC = () => {
    const coordinates = useAppSelector(selectCoordinates)
    const accuracy = useAppSelector(selectAccuracy)
    const isError = useAppSelector(selectPositionError)
    const closestStops = useAppSelector(selectClosestStops)
    const vehicles = useAppSelector(selectVehicles)
    const vehicleIds = useAppSelector(selectVehicleIds)

    if (isError) {
        return <>Failed to fetch position</>
    }

    const getVehicle = useCallback((id: number, vehicles: Vehicle[]): Vehicle => {
        const matchIndex = vehicles.findIndex(b => b.vehicleId === id)
        return vehicles[matchIndex]
    }, [])

    return (
        <MapContainer className={styles.heightFull} center={[coordinates.latitude, coordinates.longitude]} zoom={16}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {closestStops && <StopMarker closestStops={closestStops}/>}
            {accuracy && <LocationMarker accuracy={accuracy}/>}
            {vehicles && // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            vehicleIds.filter(id => vehicles.map(vehicle => vehicle.vehicleId).includes(id))
                .map(id => getVehicle(id, vehicles))
                .map(vehicle => {
                const position: LatLngExpression = [vehicle.lat, vehicle.lon]
                return <VehicleMarker key={vehicle.vehicleId} position={position} vehicle={vehicle}/>
            })}
        </MapContainer>
    )
}

export default StopMap
import React, {useMemo} from "react";
import {Marker, Popup} from "react-leaflet";
import L, {LatLngExpression} from "leaflet";
import {Vehicle} from "./vehicleSlice";

import busVehicle from "../../assets/bus-vehicle.svg";

interface BusPolygonProps {
    position: LatLngExpression,
    vehicle: Vehicle
}

const VehicleMarker: React.FC<BusPolygonProps> = ({position, vehicle}) => {
    const vehicleIcon = useMemo(() => new L.Icon({
        iconUrl: busVehicle,
        iconRetinaUrl: busVehicle,
        iconSize: new L.Point(32, 32),
    }), [])

    return (
        <Marker position={position} icon={vehicleIcon}>
            <Popup>
                <span>{vehicle.vehicleId}</span>
            </Popup>
        </Marker>
    )
}

export default VehicleMarker
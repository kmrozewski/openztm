import {Coordinates, positionError, selectCoordinates, updateCoordinates} from "./positionSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useCallback, useMemo} from "react";
import useGeolocation, {EnrichedGeolocationCoordinates} from 'react-hook-geolocation'


const usePosition = () => {
    const dispatch = useAppDispatch()
    const oldCoords = useAppSelector(selectCoordinates)

    const onGeolocationUpdate = useCallback((geolocation: EnrichedGeolocationCoordinates): void => {
        if (!geolocation.error && oldCoords.latitude !== geolocation.latitude
            && oldCoords.longitude !== geolocation.longitude) {
            dispatch(updateCoordinates({...geolocation}))
        } else {
            dispatch(positionError())
        }
    }, [dispatch]);

    useGeolocation({
        enableHighAccuracy: true,
        maximumAge:         15000,
        timeout:            12000
    }, onGeolocationUpdate)
}

export default usePosition
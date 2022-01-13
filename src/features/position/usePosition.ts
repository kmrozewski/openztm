import {positionError, selectCoordinates, updateCoordinates} from "./positionSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useCallback, useEffect} from "react";


const usePosition = () => {
    const dispatch = useAppDispatch()
    const oldCoords = useAppSelector(selectCoordinates)

    const onChange = (position: GeolocationPosition) => {
        const coords = position.coords
        if (isDifferent(coords)) {
            dispatch(updateCoordinates({latitude: coords.latitude, longitude: coords.longitude}))
        }
    }

    const onError = (error: GeolocationPositionError) => {
        dispatch(positionError(error.message))
    }

    const isDifferent = useCallback((newCoords: GeolocationCoordinates) => {
        return oldCoords.latitude !== newCoords.latitude && oldCoords.longitude !== newCoords.longitude
    }, [])

    useEffect(() => {
        const geo = navigator.geolocation

        if (!geo) {
            dispatch(positionError("Geolocation turned off"))
        }

        const watcher = geo.watchPosition(onChange, onError)

        return () => geo.clearWatch(watcher)
    }, [])

}

export default usePosition
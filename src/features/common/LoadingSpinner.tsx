import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectIsEmptyPosition} from "../position/positionSlice";
import {Spinner} from "react-bootstrap";

export interface LoadingSpinnerProps {
    isLoading: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({isLoading, children}) => {

    const isEmptyPosition = useAppSelector(selectIsEmptyPosition)

    if (isLoading || isEmptyPosition) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

     return (
        <>
            {children}
        </>
    )
}

export default LoadingSpinner
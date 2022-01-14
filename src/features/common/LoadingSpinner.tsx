import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectIsEmptyPosition} from "../position/positionSlice";
import {Spinner, Container, Row, Col} from "react-bootstrap";
import styles from "./LoadingSpinner.module.css"

export interface LoadingSpinnerProps {
    isLoading: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({isLoading, children}) => {

    const isEmptyPosition = useAppSelector(selectIsEmptyPosition)

    if (isLoading || isEmptyPosition) {
        return (
            <Container fluid>
                <Row className={"align-items-center vh-100"}>
                    <Col md={{span: 2, offset: 5}}>
                        <Spinner className={styles.spinner} animation={"grow"} variant={"primary"} role={"status"}>
                            <span className={"visually-hidden"}>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default LoadingSpinner
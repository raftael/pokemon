import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default function ErrorMessage(props) {
    return (
        <Alert variant='danger'>
            <Alert.Heading>Sorry!!!</Alert.Heading>
            <p>
                {props.message}
            </p>            
        </Alert>
    )
}
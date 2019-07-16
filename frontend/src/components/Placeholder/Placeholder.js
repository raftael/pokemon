import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default function Placeholder() {
    return (
        <Alert variant='info'>
            <Alert.Heading>Ooops!!!</Alert.Heading>
            <p>
                No pokemon captured yet
            </p>            
        </Alert>
    )
}
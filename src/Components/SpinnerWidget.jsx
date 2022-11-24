import React from 'react'
import "../App.css"
import Spinner from 'react-bootstrap/Spinner';
function SpinnerWidget(props) {
    return (
    <div className="spinnerflex">
    <Spinner animation="border" variant="primary" />
    <div className="valuechanger">{props.name}</div>
    </div>
    )
}

export default SpinnerWidget;
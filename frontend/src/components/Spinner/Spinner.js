import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

const Spinner = props =>
    <div className={`fadeIn ${props.spinning}`}>
        <FontAwesomeIcon icon={faCheck} size={props.size} color='green'/>
    </div>;

export default Spinner;
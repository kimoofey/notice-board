import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const Spinner = (props) => {
    const { size, spinning } = props
    return (
        <div className={`fadeIn ${spinning}`}>
            <FontAwesomeIcon icon={faCheck} size={size} color="green"/>
        </div>
    )
}

export default Spinner;

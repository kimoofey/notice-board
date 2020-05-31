import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { notify } from "react-notify-toast"
import Spinner from "../Spinner/Spinner"

export default class Confirm extends Component {
    state = {
        confirming: true,
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios
            .get(`/api/users/confirm/${id}`)
            .then((data) => {
                console.log(data)
                this.setState({ confirming: false })
                notify.show(data.data.msg)
            })
            .catch((err) => console.log(err))
    }

    // While the email address is being confirmed on the server a spinner is
    // shown that gives visual feedback. Once the email has been confirmed the
    // spinner is stopped and turned into a button that takes the user back to the
    // <Landing > component so they can confirm another email address.
    render = () => (
        <div className="confirm">
            {this.state.confirming ? (
                <Spinner size="8x" spinning={"spinning"}/>
            ) : (
                <Link to="/">
                    <Spinner size="8x" spinning={""}/>
                </Link>
            )}
        </div>
    )
}

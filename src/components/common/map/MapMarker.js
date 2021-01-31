import React, {Component} from 'react'
import {GoogleMap, Marker} from 'react-google-maps'

class MapMarker extends Component {

    state = {
        name: 'Dolores park',
        markerPosition: {
            lat: this.props.center.lat,
            lng: this.props.center.lng
        }
    }

    render() {
        return (
            <Marker google={this.props.google}
                    name={this.state.name}
                    draggable={true}
                    onDragEnd={this.onMarkerDragEnd}
                    position={{lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
            />
        )
    }
}

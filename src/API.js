import React from 'react';
import './API.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            city: null,
            zoom: 6
                };
    }
    handleClick(filteredPerson) {
        console.log(filteredPerson.name)
        fetch("https://api.jcdecaux.com/vls/v3/stations?contract=" + filteredPerson.name + "&apiKey=7886a12c53604b2668a08582a04795afcc9375b0")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        city: result[0],
                        zoom: 13
                    });
                    // console.log(this.state)
                },

                (error) => {
                    console.log(error)
                }
            )
    }
    handleClick(filteredPerson) {
        // console.log(filteredPerson.name)
        fetch("https://api.jcdecaux.com/vls/v3/stations?contract=" + filteredPerson.name + "&apiKey=7886a12c53604b2668a08582a04795afcc9375b0")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        city: result[0],
                        zoom: 13
                    });
                    // console.log(this.state)
                },

                (error) => {
                    console.log(error)
                }
            )
    }
    componentDidMount() {
        fetch("https://api.jcdecaux.com/vls/v3/contracts?apiKey=7886a12c53604b2668a08582a04795afcc9375b0")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.length)
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    for(let i = 0; i < result.length; i++) {
                        console.log(result[i])
                    }
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        // console.log(items)
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div class='wrapper'>
                    <div class="div-right-cities">
                        <h1>Toutes les villes ayant un contrat</h1>

                        <div class="btn-group">
                            {items.filter(person => person.country_code === "FR").map(filteredPerson => (
                                <button class="button-cities" key={filteredPerson.name} onClick={() => this.handleClick(filteredPerson)} >
                                    {filteredPerson.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <MapContainer center={[46.2276, 2.2137]} zoom={this.state.zoom} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* {this.state.city += null &&
                            <Marker position={[this.state.city.position.latitude, this.state.city.position.longitude]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        } */}
                        {this.state.city != null &&
                            <Marker position={[this.state.city.position.latitude, this.state.city.position.longitude]}>
                                <Popup>
                                    {this.state.city.contractName}
                                </Popup>
                            </Marker>
                        }
                    </MapContainer>
                </div>
            );
        }
    }
}
export default MyComponent;
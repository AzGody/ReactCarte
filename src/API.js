import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './API.css';
import {MapContainer, TileLayer, useMap, Marker, Popup} from "react-leaflet";

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            markers: [],
            zoom: 6
        };
    }

    handleCityClick(filteredPerson, keepOldPointer = false) {
        // console.log(filteredPerson.name)
        fetch("https://api.jcdecaux.com/vls/v3/stations?contract=" + filteredPerson.name + "&apiKey=7886a12c53604b2668a08582a04795afcc9375b0")
            .then(res => res.json())
            .then(
                (result) => {
                    if (keepOldPointer) {
                        console.log(result);
                        this.setState({
                            markers: [...this.state.markers, {
                                position: result[0].position,
                                popup: `
                                    <div>
                                        <div>${result[0].contractName}</div>
                                        <button onClick={() => this.handleContractClick(${JSON.stringify(result)})}>
                                            Voir le contrat
                                        </button>
                                    </div>`,
                                data: result
                            }],
                            zoom: 13
                        });
                    } else {
                        this.setState({
                            markers: [result[0]],
                            zoom: 13
                        });
                    }
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
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    result.filter(person => person.country_code === "FR").forEach(element => {
                        this.handleCityClick(element, true)
                    })
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleContractClick(filteredContract) {
        console.log(filteredContract)
    }

    render() {
        // console.log(items)
        const {error, isLoaded, items} = this.state;
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
                                <button class="button-cities" key={filteredPerson.name}
                                        onClick={() => this.handleCityClick(filteredPerson, false)}>
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
                        {
                            this.state.markers.map((marker) => {
                                return (
                                    <Marker position={[marker.position.latitude, marker.position.longitude]}>
                                        <Popup>
                                            {ReactHtmlParser(marker.popup)}
                                        </Popup>
                                    </Marker>
                                )
                            })
                        }
                    </MapContainer>
                </div>
            );
        }
        }
        }
        export default MyComponent;
import React from "react";
import mock_data from "./assets/mock_data.json";


const Chart = () => {
    return (
        <>
            {Object.keys(mock_data.response).map((timestamp) => (
                <div key={timestamp}>
                    <h3>{timestamp}</h3>
                    <p>ID: {mock_data.response[timestamp].id}</p>
                    <p>Value Area: {mock_data.response[timestamp].value_area}</p>
                    <p>Value Bar: {mock_data.response[timestamp].value_bar}</p>
                </div>
            ))}
        </>
    )
}

export default Chart;
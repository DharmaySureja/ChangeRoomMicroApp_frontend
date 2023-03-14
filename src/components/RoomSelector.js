import * as React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";

import {SelectChangeEvent} from "@mui/material";


export default function RoomSelector(){
    const [room, setRoom] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value);
    };
    function openRoom1(){
        window.location.href = `/changingroom/${room}`;

    }
    const initialRooms = [
        {
            title: "Room 1",
            description: "Short Description",
            content: "The brief content",
            roomsID: "2",
            userID: "11",
        }
    ];
    const [roomsData, setRoomsData] = useState(initialRooms);

    useEffect(() => {

        axios
            .get(`http://localhost:3000/api/changeroom/getroom`, {
                responseType: "json",
            })
            .then(function(response) {
                setRoomsData(response.data.rooms);
                console.log(response.data.rooms);
            });
    }, []);


    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div style={{"height" : "100%", "width" : "50%"}} >
            <br></br>
            <br></br>
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Room No</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Room"
                onChange={handleChange}
                value={room}
            >
                {roomsData?.map(
                    (room: {
                        roomNo: any;
                    }) => {
                        return (
                            <MenuItem value={room.roomNo}>{room.roomNo}</MenuItem>

                        );
                    }
                )}
            </Select>
        </FormControl>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={()=> openRoom1()}
    >
        Open Room
    </Button>
    </div>
        </div>
    )
}
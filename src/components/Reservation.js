
import * as React from "react";
import RoomCard from "./RoomCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Zoom } from "@mui/material";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
export default function Reservation(){
    const initialRooms = [
        {
            title: "Room 1",
            description: "Short Description",
            content: "The brief content",
            roomsID: "2",
            userID: "11",
        }
    ];
    setTimeout(function(){
        window.location.reload(1);
    }, 3000);
    const [roomsData, setRoomsData] = useState(initialRooms);

    useEffect(() => {

        axios
            .get(`http://localhost:3000/api/changeroom/getroom`, {
                responseType: "json",
            })
            .then(function(response) {
                setRoomsData(response.data.rooms);
                console.log(response);
            });
    }, []);


    function write() {
        window.location.href = "/addroom";
    }

    const buttonprop = {
        top: 5,
        bgcolor: "#2E8BC0",
        float: "right",
        borderRadius: "15px",
    };
return(
    <Box sx={{ flexGrow: 1 }}>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <h1>Changing Room Reservation</h1>
        </div>

        <Button
            variant="contained"
            // endIcon={<AddIcon />}
            sx={buttonprop}
            onClick={write}
        >

           ADD ROOM
        </Button>
        <Container component="main" maxWidth="lg">
            <Card
                variant="outlined"
                style={{
                    border: "none",
                    boxShadow: "none",
                    margin: "10px",
                    padding: "10px",
                }}
            >
                <Box
                    sx={{
                        marginTop: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Grid container spacing={2}>
                        {roomsData?.map(
                            (room: {
                                roomNo: any;
                                bookedBy: any;
                                customerName: any;
                                occupied: any;
                                roomsID: any;
                                help:any;
                            }) => {
                                return (
                                    <RoomCard
                                        key={Math.random()}
                                        roomNo={room.roomNo}
                                        bookedBy={room.bookedBy}
                                        customerName={room.customerName}
                                        occupied = {room.occupied}
                                        roomsID={room.roomNo}
                                        help={room.help}
                                    />
                                );
                            }
                        )}
                    </Grid>
                </Box>
            </Card>
        </Container>
    </Box>
)
}
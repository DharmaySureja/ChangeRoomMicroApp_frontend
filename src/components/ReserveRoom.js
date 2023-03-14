import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useParams} from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";


export default function ReserveRoom(){
    const { id } = useParams();
    const form_data = {
        roomNo:id
    };

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
            .post("http://192.168.2.15:3100/api/changeroom/getroom", form_data)
            .then((response) => {
                setRoomsData(response.data.rooms);
                console.log(response.data.rooms);

            })
            .catch(function(error) {
                alert("ERROR!");
                console.log(error);

            });

    }, []);

    const initialValues = {
        customerName:"",
    };
    const [formValue, setFormValue] = useState(initialValues);
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };


function bookRoom(){
    console.log(formValue.customerName);
    const form_data1 = {
        roomNo:id,
        customerName:formValue.customerName,
        bookedBy:"Staff",
        occupied:1,
        help:0

    };

    axios
        .post("http://192.168.2.15:3100/api/changeroom/reserve", form_data1)
        .then((response) => {
            console.log(response.data.rooms);
            alert("BOOKED SUCCESS");
            window.location.href = `/`;

        })
        .catch(function(error) {
            alert("Can not Reserve!");
            console.log(error);

        });

}
function home(){
    window.location.href = `/`;
}
function ReleaseReservation(){
    const form_data1 = {
        roomNo:id,
    };

    axios
        .post("http://192.168.2.15:3100/api/changeroom/release", form_data1)
        .then((response) => {
            alert("Successfully Released booking");
            window.location.reload();
        })
        .catch(function(error) {
            alert("Can not Release!");
            console.log(error);

        });
}

    function Release(){
        if (roomsData.occupied){ return (
            <div>
                <h1>Currently reserved for {roomsData.customerName}</h1>
                <h4>Reserved By {roomsData.bookedBy}</h4>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=> ReleaseReservation()}
                >
                    Release Reservation ?
                </Button>
            </div>

        );}
        else{
            return (
                <></>
            );
        }

    }


    return(

        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                   Researve Room {id}
                </Typography>
                <Box component="form"  noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="customerName"
                        label="Customer's Name"
                        name="customerName"
                        onChange={handleChange}
                        value={formValue.customerName}
                        autoFocus
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={()=> bookRoom()}
                    >
                       Reserve
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={()=> home()}
                    >
                        Go to Home
                    </Button>
                    {Release()}
                </Box>
            </Box>

        </Container>

    );
}


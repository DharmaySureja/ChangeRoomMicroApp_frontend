import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import axios from "axios";

export default function Addroom(){

    const initialValues = {
        roomNo:"",
    };
    const [formValue, setFormValue] = useState(initialValues);
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

function add(){
    const form_data = {
        roomNo:formValue.roomNo,
        customerName:"",
        bookedBy:"",
        occupied:0,
        help:0
    };

    axios
        .post("http://localhost:3000/api/changeroom/addroom", form_data)
        .then((response) => {
            console.log(response.data.rooms);
            window.location.href = `/`;
        })
        .catch(function(error) {
            alert("Error!");
            console.log(error);

        });

}

    function home(){
        window.location.href = `/`;
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
                    Add New Changing Room
                </Typography>
                <Box component="form"  noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="roomNo"
                        label="Room Number"
                        name="roomNo"
                        inputMode={"numeric"}
                        onChange={handleChange}
                        value={formValue.roomNo}
                        autoFocus
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={()=> add()}
                    >
                        ADD ROOM
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={()=> home()}
                    >
                        Go to Home
                    </Button>

                </Box>
            </Box>

        </Container>



    );

}
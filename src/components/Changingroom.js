import * as React from 'react';
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import tulip from './tulip.jpg'
import Button from "@mui/material/Button";
export default function ChangingRoom(){
    const { id } = useParams();

    const form_data = {
        roomNo:id
    };

    const initialRoom = [
        {
            title: "Room 1",
            description: "Short Description",
            content: "The brief content",
            roomsID: "2",
            userID: "11",
        }
    ];

    const [roomsData, setRoomsData] = useState(initialRoom);

    useEffect(() => {
        document.body.style.backgroundColor = "WHITE"
        axios
            .post("http://localhost:3000/api/changeroom/getroom", form_data)
            .then((response) => {
                setRoomsData(response.data.rooms);
                console.log(response.data.rooms);

            })
            .catch(function(error) {
                alert("Error!");
                console.log(error);

            });

    }, []);

    const [helpStmnt, setHelpStmnt] = useState("");

    function callHelp(){
    setHelpStmnt("Help is on the Way!");
        axios
            .post("http://localhost:3000/api/changeroom/gethelp", form_data)
            .then((response) => {
            })
            .catch(function(error) {
                alert("Error!");
                console.log(error);

            });
    }

if(roomsData.occupied){
    document.body.style.backgroundColor = "WHITE"
    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
<div>
    <img src={tulip} height={"100px"} width={"200px"}></img>
        <h1>Welcome {roomsData.customerName}</h1>
        <h2>Ready to try something Fresh and Exciting?</h2>
    <h2>{helpStmnt}</h2>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled = {helpStmnt}
        sx={{ mt: 3, mb: 2, width:500 }}
        onClick={()=> callHelp()}
    >
        Need Help?
    </Button>
</div>
        </div>


    )
}
else{
    document.body.style.backgroundColor = "Green"
    return(


        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <h1> AVAILABLE </h1>
        </div>



    );

}
}
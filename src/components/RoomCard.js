import { ButtonBase, CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import Grid from "@mui/material/Grid";

export default function RoomCard(props) {
  function reserveRoom(id) {
    window.location.href = `/reserveroom/${id}`;
  }

  function details(){
    if(props.occupied == 1){
        if(props.help == 1){
           return( <div>
               <Typography variant="body2" color="red">
                   Requires Help
               </Typography>
                <Typography variant="body2" color="text.secondary">
                    Booked By  {props.bookedBy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Booked For  {props.customerName}
                </Typography>

            </div>);
        }
        else{
            return(
                <div>
                    <Typography variant="body2" color="text.secondary">
                        Booked By  {props.bookedBy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Booked For  {props.customerName}
                    </Typography>
                </div>)
        }

    }
    else{
      return (
          <div>
              <Typography variant="body1" color="text.secondary">
                  AVAILABLE
              </Typography>
          </div>
      );
    }
  }
var reserved = "red";
if(props.occupied == 1){
    if(props.help == 1){
        reserved = "yellow";
    }
    else{
        reserved = "red";
    }

}
else{
   reserved = "green";
}

  const card_border = {
    backgroundColor: "white",
    borderRadius: "10px",
    border: "2px solid #2E8BC0",
    height: "15rem",
    width: "100%",
    display: "flex",
    background: reserved,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Grid item xs={12} md={3} style={{ display: "flex" }}>
      <Card
        style={card_border}
        elevation={5}
        onClick={() => reserveRoom(props.roomsID)}
      >
        <ButtonBase>


          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align={"center"}
              style={{ color: "black", fontWeight: "bolder" }}
            >
              {props.roomNo}
            </Typography>

              {details()}


          </CardContent>

        </ButtonBase>
      </Card>
    </Grid>
  );
}

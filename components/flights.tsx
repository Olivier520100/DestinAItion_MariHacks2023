import dayjs from 'dayjs';
import { useState } from 'react';
import { Group } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { useRef } from 'react';

import { TextInput, createStyles, rem } from '@mantine/core';

import { NumberInput, NumberInputHandlers, ActionIcon } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { SimpleGrid, Skeleton, Container, Stack, useMantineTheme, px } from '@mantine/core';

const getChild = (height: number) => <Skeleton height={height} radius="md" animate={false} />;
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);



function Flights(props) {
    let flightP = []
    const [flights, setFlights] = useState([])
    const [selected, setSelected] = useState<Date[]>([]);
    const handleSelect = (date: Date) => {
        const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
        if (isSelected) {
            try{
            setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
            if (selected.length == 2){
                let url = "https://www.cheapflights.ca/a/api/flightPricePrediction/coloredCalendar/oneWay?origin=" + props.fromWhere + "&destination=" + props.toWhere + "&dateMode=single&distinct=false"
                fetch(url)
                    .then(response => response.json())
                    .then(json => cheapFlight(selected[0], flightP, json))
            }
        else{
            setFlights([])
        }}
            catch{

            }
        } else if (selected.length < 2) {
        setSelected((current) => [...current, date]);
        try{
            if (selected.length == 1){
                let url = "https://www.cheapflights.ca/a/api/flightPricePrediction/coloredCalendar/roundTrip?origin=" + props.fromWhere + "&destination=" + props.toWhere + "&dateMode=single&distinct=false"
                if(selected[0] < date){
                    fetch(url)
                    .then(response => response.json())
                    .then(json => cheapFlight(selected[0], flightP, json))
                }
                else{
                    fetch(url)
                    .then(response => response.json())
                    .then(json => cheapFlight(date, flightP, json))
                }
            }
            else {
                let url = "https://www.cheapflights.ca/a/api/flightPricePrediction/coloredCalendar/oneWay?origin=" + props.fromWhere + "&destination=" + props.toWhere + "&dateMode=single&distinct=false"
                fetch(url)
                .then(response => response.json())
                .then(json => cheapFlight(date, flightP, json))
            }
        }
        catch{

            }
        }
    };

    function cheapFlight(date, flightPrices, data){
        let time = date.toISOString().split("T")
        let depDay = time[0]
        let FPE = []
        let FPL = []
        try{
            flightPrices = [[depDay, data["calendar"][depDay]["avgPrice"], data["calendar"][depDay]["color"]]]
        }
        catch{
            flightPrices = [undefined]
        }
        for(let i = 3; i > 0; i--){
            const dateCopyOne = new Date(date);
            const dateCopyTwo = new Date(date);
            dateCopyOne.setDate(dateCopyOne.getDate() - i);
            dateCopyTwo.setDate(dateCopyTwo.getDate() + i);
            let time1 = dateCopyOne.toISOString().split("T")
            let time2 = dateCopyTwo.toISOString().split("T")
            let depDay1 = time1[0]
            let depDay2 = time2[0]
            let newData = data
            try{
                FPE.push([depDay1, (newData["calendar"][depDay1]["avgPrice"]), newData["calendar"][depDay1]["color"]])
            }
            catch{
                console.log(depDay1 + " has no flights")
            }
            try{
                FPL.unshift([depDay2, (newData["calendar"][depDay2]["avgPrice"]), newData["calendar"][depDay1]["color"]])
            }
            catch{
                console.log(depDay2 + " has no flights")
            }
        }
        flightPrices = [...flightPrices, ...FPE, ...FPL]
        setFlights(flightPrices)
    }

    function PrintMainFlight() {
        let newFlights = flights
        const divList = []
        let day
        let fullDate
        let color
        if (selected.length == 0){
            return (
                <div style = {{width: "50vw", backgroundColor:"#212121", display: "flex", alignItems: "center", justifyContent: "center", height: "20vh", marginLeft: "10px", marginBottom: "50px", borderRadius: "20px"}}>No Date Has Been Selected</div>
            )
        }
        if(newFlights[0] !== undefined){
            day = newFlights[0][0]
            color = newFlights[0][2]
            let dateObj = new Date(day)
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];

            const dayOfMonth = dateObj.getUTCDate();

            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[dateObj.getUTCMonth()];

            const year = dateObj.getUTCFullYear();

            fullDate = dayOfWeek + ", " + month + " " + dayOfMonth + " " + year

        }
        try{
                divList.push(
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{marginLeft: "20px", marginBottom: "10px"}}>{fullDate}</div>
                        <div style = {{width: "50vw", backgroundColor:"#212121", display: "flex", alignItems: "center", justifyContent: "center", height: "20vh", marginLeft: "10px", marginBottom: "50px", borderRadius: "20px"}} key = {newFlights[0][0]}>
                            <div style={{fontSize: "30px", fontWeight: "bold"}} key={newFlights[0][0] + "info"}>Average Price of Ticket: {newFlights[0][1]}$ CAD</div>
                        </div>
                        <div style={{position: "absolute", height: "20vh", width: "15px", backgroundColor: color, marginTop: "35px", marginLeft: "10px", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px"}}></div>
                    </div>
                )
        return (
            <div>{divList}</div>
        )
        }
        catch{
            return(
                <div style = {{width: "50vw", backgroundColor:"#212121", display: "flex", alignItems: "center", justifyContent: "center", height: "20vh", marginLeft: "10px", marginBottom: "50px", borderRadius: "20px"}}>No Plane Tickets are Available</div>
            )
        }
    }
    function PrintOtherFlights() {
        let nFlights = flights
        let newFlights = nFlights.slice(1)
        if (selected.length == 0){
            return (
                <div style = {{width: "50vw", backgroundColor:"#212121", display: "flex", alignItems: "center", justifyContent: "center", height: "20vh", marginLeft: "10px", marginBottom: "50px", borderRadius: "20px"}}>No Date Has Been Selected</div>
            )
        }
        for(let i = 1; i < 2; i++){
            try{
            return (<>{newFlights.map((x, i)=>{
                let day = x[0]
                let color = x[2]
                let dateObj = new Date(day)
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];

                const dayOfMonth = dateObj.getUTCDate();

                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const month = months[dateObj.getUTCMonth()];

                const year = dateObj.getUTCFullYear();

                let fullDate = dayOfWeek + ", " + month + " " + dayOfMonth + " " + year
                return(
                    <div key = {fullDate + "container"} style={{display: "flex", flexDirection: "column"}}>
                        <div style={{marginLeft: "20px", marginBottom: "10px"}}>{fullDate}</div>
                        <div style = {{width: "50vw", backgroundColor:"#212121", display: "flex", alignItems: "center", justifyContent: "center", height: "20vh", marginLeft: "10px", marginBottom: "50px", borderRadius: "20px"}} key = {newFlights[i][0]}>
                            <div style={{fontSize: "30px", fontWeight: "bold"}} key={newFlights[i][0] + "info"}>Average Price of Ticket: {newFlights[i][1]}$ CAD</div>
                        </div>
                        <div style={{position: "absolute", height: "20vh", width: "15px", backgroundColor: color, marginTop: "35px", marginLeft: "10px", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px"}}></div>
                    </div>
                )
            })}
                </>
            )}
            catch{

            }
        }
    }

    return (
        <div style={{display: "flex", flexDirection:"row"}}>
        <div style={{marginTop: "20vh"}}>
        <Calendar
            getDayProps={(date) => ({
            selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
            onClick: () => handleSelect(date),
            })}
        />
        </div>
        <div style={{marginLeft: "10vw"}}>        
            <div style={{marginLeft: "0", fontWeight: "bold", fontSize: "30px", color: "white", marginBottom: "20px"}}>Flights</div>
            <div style={{marginLeft: "5px", fontWeight: "bold", fontSize: "20px", marginBottom: "10px"}}>Selected</div>
            <PrintMainFlight/>
            <div style={{marginLeft: "5px", fontWeight: "bold", fontSize: "20px"}}>Others</div>
            <PrintOtherFlights/>
        </div>
        </div>
    );
}

export default Flights
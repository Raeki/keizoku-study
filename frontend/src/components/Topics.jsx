// Dependencies
import React, { useState, useEffect } from 'react';

// MUI 
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'

// API URL import
const API_URL = process.env.REACT_APP_API_URL;

// Default Item styling from MUI
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// Dummy data
// const dummyData = [
//     { name: "Code Chrysalis", id: 1 },
//     { name: "CS50", id: 2 },
//     { name: "Rust", id: 3 },
// ]

export default function Topics() {
    // useStates
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const rawData = await fetch(`${API_URL}/topics`);
                console.log(rawData)
                const data = await rawData.json();
                setTopics(data);
            } catch (e) {
                console.error(e);
            }
        })()
    }, [])

    return (
        <Container>
            <Grid container spacing={2}>
                {/* map data to a grid */}
                {topics.map(obj => {
                    return (
                        <Grid item xs key={obj.id}>
                            <Item>{obj.name}</Item>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}
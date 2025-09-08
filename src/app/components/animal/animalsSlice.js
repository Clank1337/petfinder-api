import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const apiKey = process.env.REACT_APP_PETFINDER_CLIENT_ID;
const apiSecret = process.env.REACT_APP_PETFINDER_CLIENT_SECRET;

let token = null;
let tokenExpiry = 0;

async function getToken() {
    if (token && Date.now() < tokenExpiry) return token;

    const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: apiKey,
            client_secret: apiSecret,
        }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = await response.json();
    token = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000;
    return token;
}


export async function searchPets(type, location, breed, distance, page = 1) {
    const accessToken = await getToken();
    let url = `https://api.petfinder.com/v2/animals?location=${location}&page=${page}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;
    if (breed) url += `&breed=${encodeURIComponent(breed)}`;
    if (distance) url += `&distance=${encodeURIComponent(distance)}`;

    const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    const data = await res.json();
    return data;
}


export const fetchAnimals = createAsyncThunk(
    "animals/fetchAnimals",
    async ({ type, location, breed, distance, page }) => {
        const data = await searchPets(type, location, breed, distance, page);
        return data;
    }
);


export async function fetchBreedsByType(type) {
    const token = await getToken();
    const res = await fetch(`https://api.petfinder.com/v2/types/${encodeURIComponent(type)}/breeds`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.breeds?.map(b => b.name) ?? [];
}


const initialState = {
    animals: [],
    pagination: null,
    searchParams: {},
    isLoading: false,
    errMsg: ""
};

const animalsSlice = createSlice({
    name: "animals",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAnimals.pending]: (state) => {
            state.isLoading = true;
            state.errMsg = "";
        },
        [fetchAnimals.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = "";
            state.animals = action.payload?.animals ?? [];
            state.pagination = action.payload?.pagination ?? null;
            state.searchParams = action.meta.arg ?? {};
        },
        [fetchAnimals.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error?.message || "Fetch failed";
        },
    },
});

export const animalsReducer = animalsSlice.reducer;

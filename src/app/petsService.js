const apiKey = process.env.REACT_APP_PETFINDER_CLIENT_ID;
const apiSecret = process.env.REACT_APP_PETFINDER_CLIENT_SECRET;

let token = null;
let tokenExpiry = 0;

export async function getToken() {
    if (token && Date.now() < tokenExpiry) {
        return token;
    }

    const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: apiKey,
            client_secret: apiSecret,
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const data = await response.json();
    token = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000; // convert seconds to milliseconds
    return token;
}

export async function searchPets(type, location, breed, distance, page = 1) {
    const accessToken = await getToken();
    let url = `https://api.petfinder.com/v2/animals?location=${location}&page=${page}`;

    if (type) url += `&type=${type}`;
    if (breed) url += `&breed=${breed}`;
    if (distance) url += `&distance=${distance}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const data = await res.json();
    console.log("Fetched pets:", data);
    return data;
}
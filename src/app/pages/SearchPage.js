import { use } from 'react';
import { useState } from 'react';
import { searchPets } from '../petsService';
import AnimalsList from '../components/animal/AnimalsList';



const SearchPage = () => {
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [breed, setBreed] = useState('');
    const [distance, setDistance] = useState('');
    const [results, setResults] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await searchPets(type, location, breed, distance);
        console.log(data);
        if (data) {
            setResults(data.animals);
        }

    }

    return (
        <div>
            <h1>Find Your New Best Friend</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    id="breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="Breed (optional)"
                />

                <select id="type" value={type} onChange={(e) => setType(e.target.value)} >
                    <option value="">Any Type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                </select>

                <input type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="ZIP Code (required)"
                />
                <input type="number"
                    id="distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Max Radius (miles)"
                    min="1"
                    max="500"
                />
                <button type="submit">Search</button>
            </form>

            <AnimalsList animals={results} />
        </div>
    );
}

export default SearchPage
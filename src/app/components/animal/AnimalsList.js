// AnimalsList.js (unchanged, still presentational)
import React from 'react';
import AnimalCard from './AnimalCard';

const AnimalsList = ({ animals }) => {
    if (!animals || animals.length === 0) {
        return <p className="text-center mt-4">No Animals found.</p>;
    }
    return (
        <div className="container mt-4">
            <div className="mt-5 mb-3">
                <h2 className="h4">Available Pets</h2>
            </div>
            <div className="row g-3">
                {animals.map((animal) => (
                    <div key={animal.id} className="col-12 col-sm-6 col-md-4">
                        <AnimalCard animal={animal} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimalsList;

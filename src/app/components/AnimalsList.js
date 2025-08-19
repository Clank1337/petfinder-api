import React from 'react'
import AnimalCard from './AnimalCard';

const AnimalsList = ({ animals }) => {
    if (!animals || animals.length === 0) {
        return <p>No Animals found.</p>;
    }
    return (
        <div className='container mt-4'>
            <div className='row g-3'>
                <h2 className='h4 mb-3'>Available Pets</h2>
                {animals.map((animal) => (
                    <div key={animal.id} className='col-12 col-sm-6 col-md-4'>
                        <AnimalCard key={animal.id} animal={animal} />
                    </div>
                ))}
            </div>
        </div>
    );

}

export default AnimalsList
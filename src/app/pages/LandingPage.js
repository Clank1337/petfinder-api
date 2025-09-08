// LandingPage.js
import React from 'react';
import LandingPageHeader from '../components/header/LandingPageHeader';
import AnimalsList from '../components/animal/AnimalsList';
import { useSelector } from 'react-redux';

function LandingPage() {
    React.useEffect(() => {
        document.body.classList.add('landing-page', 'sidebar-collapse');
        document.documentElement.classList.remove('nav-open');
        window.scrollTo(0, 0);
        return () => {
            document.body.classList.remove('landing-page', 'sidebar-collapse');
        };
    }, []);

    const { animals, isLoading, errMsg } = useSelector((state) => state.animals);

    return (
        <div className="wrapper">
            <LandingPageHeader />
            {isLoading && <p className="text-center mt-4">Loading…</p>}
            {!!errMsg && <p className="text-danger text-center mt-2">{errMsg}</p>}
            {!isLoading && <AnimalsList animals={animals} />}
        </div>
    );
}

export default LandingPage;

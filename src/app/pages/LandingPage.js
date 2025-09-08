// LandingPage.js
import React from 'react';
import LandingPageHeader from '../components/header/LandingPageHeader';
import AnimalsList from '../components/animal/AnimalsList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnimals } from '../components/animal/animalsSlice';
import AnimalPagination from '../components/animal/AnimalPagination';
import { Spinner } from 'reactstrap';

function LandingPage() {
    React.useEffect(() => {
        document.body.classList.add('landing-page', 'sidebar-collapse');
        document.documentElement.classList.remove('nav-open');
        window.scrollTo(0, 0);
        return () => {
            document.body.classList.remove('landing-page', 'sidebar-collapse');
        };
    }, []);

    const { animals, pagination, isLoading, errMsg } = useSelector((state) => state.animals);
    const searchParams = useSelector((state) => state.animals.searchParams);
    const dispatch = useDispatch();
    console.log('Yo', pagination)
    return (
        <div className="wrapper">
            <LandingPageHeader />
            <div className='results-section'>
                {isLoading && <div className="text-center my-4"><Spinner color="primary" /></div>}
                {!!errMsg && <p className="text-danger text-center mt-2">{errMsg}</p>}
                {!isLoading && animals.length > 0 && pagination && (
                    <AnimalPagination
                        currentPage={pagination.current_page}
                        totalPages={pagination.total_pages}
                        onPageChange={(page) =>
                            dispatch(fetchAnimals({ ...searchParams, page }))
                        }
                    />
                )}
                {!isLoading && <AnimalsList animals={animals} />}
                {!isLoading && animals.length > 0 && pagination && (
                    <AnimalPagination
                        currentPage={pagination.current_page}
                        totalPages={pagination.total_pages}
                        onPageChange={(page) =>
                            dispatch(fetchAnimals({ ...searchParams, page }))
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default LandingPage;

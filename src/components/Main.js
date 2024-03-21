import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Main = ({ items, setItems, setSelectedItem, setFetchPending, isFetchPending }) => {
    const navigate = useNavigate();
    const fetchMovies = async () => {
        try {
            const response = await fetch('https://localhost:7017/Film')
            const data = await response.json()
            setItems(data)
            console.log(data);
        } catch (error) {
            console.error(error)
        } finally {
            setFetchPending(false)
        }
    }
    useEffect(() => {
        fetchMovies()
    }, [isFetchPending])

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                items.map(item => (
                        <div key={item.id} className="card m-3" style={{ width: '18rem' }}>

                            <div className='card-header text-center'>
                                <h3>{item.nev}</h3>
                            </div>

                            <Link onClick={() => {
                                navigate(`/item/${item.id}`);
                            }} to={`/item/${item.id}`}> <img src={item.kepneve ? item.kepneve : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="kép alt" /></Link>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Kiadás éve: {item.kiadasEve}</h5>
                                <h5 className="card-title">Értékelés: {item.ertekeles}</h5>
                                <hr/>
                                <div className="mt-auto">
                                
                                    <Link to={`/putItem/${item.id}`} className="btn btn-primary m-1"
                                        onClick={async () => {
                                            await setSelectedItem(item);
                                        }}>Módosítás</Link>
                                    <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" onClick={async () => {
                                        await setSelectedItem(item);
                                    }} className="btn btn-danger m-1">Törlés</button>
                                </div>
                            </div>
                        </div>
                    ))

            }
        </div>

    )
}

export default Main
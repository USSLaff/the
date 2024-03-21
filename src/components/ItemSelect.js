import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const ItemSelect = ({ selectedItem, setSelectedItem }) => {

    const navigate = useNavigate();
    const param = useParams();

    const [isFetchPending, setFetchPending] = React.useState(true)

    const fetchData = async () => {
        await axios.get(`https://localhost:7017/Film/${param.id}`).then(async (response) => {
            await setSelectedItem(response.data);
        }).finally(() => setFetchPending(false));
    }

    useEffect(() => {
        fetchData();
    }, [isFetchPending]);

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    <div key={selectedItem.id} className="card m-3" style={{ width: '18rem' }}>
                        <div className='card-header text-center'>
                            <h3>{selectedItem.nev}</h3>
                        </div>

                        <Link onClick={() => {
                            navigate(`/item/${selectedItem.id}`);
                        }} to={`/item/${selectedItem.id}`}> <img src={selectedItem.kepneve ? selectedItem.kepneve : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="kép alt" /></Link>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Kiadás éve: {selectedItem.kiadasEve}</h5>
                            <h5 className="card-title">Értékelés: {selectedItem.ertekeles}</h5>
                            <hr />
                            <div className="mt-auto">

                                <Link to={`/putItem/${selectedItem.id}`} className="btn btn-primary m-1"
                                    onClick={async () => {
                                        await setSelectedItem(selectedItem);
                                    }}>Módosítás</Link>
                                <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" onClick={async () => {
                                    await setSelectedItem(selectedItem);
                                }} className="btn btn-danger m-1">Törlés</button>
                            </div>
                        </div>
                    </div>
            }
        </div>


    )
}

export default ItemSelect
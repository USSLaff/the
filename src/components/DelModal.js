import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DeleteConfirmModal = ({ selectedItem, setFetchPending }) => {
    const navigate = useNavigate();
    return (
        <div className="modal fade" id="deleteConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deleteConfirmLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteConfirmLabel">Törlés megerősítése</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className='card-header text-center'>
                        <h3>{selectedItem.nev}</h3>
                    </div>

                    <div className="modal-body">
                        A következő film lesz törölve:
                        <div key={selectedItem.id} className="card m-3" style={{ width: '18rem' }}>
                            <img src={selectedItem.kepneve ? selectedItem.kepneve : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A píza képe xd" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Kiadás éve: {selectedItem.kiadasEve}</h5>
                                <h5 className="card-title">Értékelés: {selectedItem.ertekeles}</h5>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Mégse</button>
                        <button onClick={async () => {
                            await axios.delete(`https://localhost:7017/Film/${selectedItem.id}`).then(() => {
                                setFetchPending(true);
                                navigate('/');
                            })
                        }} type="button" className="btn btn-danger" data-bs-dismiss="modal">Törlés</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmModal
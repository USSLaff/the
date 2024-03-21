import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

export const ItemPost = ({ setFetchPending }) => {
    const navigate = useNavigate();
    return (
        <div className='container w-25 mt-5 border border-2 p-2 rounded-3'>
            <form onSubmit={async (e) => {
                e.preventDefault();
                e.persist();

                const filmNev = e.target.filmNev.value
                const filmKepNev = e.target.filmKepNev.value
                const filmErtekeles = e.target.filmErtekeles.value
                const filmKiadas = e.target.filmKiadas.value

                const postData = {
                    id: 0,
                    nev: filmNev,
                    kepneve: filmKepNev,
                    ertekeles: filmErtekeles,
                    kiadaseve : filmKiadas,

                }
                await axios.post('https://localhost:7017/Film', postData).then(async () => {
                    await setFetchPending(true);
                    navigate('/');
                });

            }}>
                <div className="mb-3">
                    <label htmlFor="filmNev" className="form-label">Film neve</label>
                    <input type="text" className="form-control" id="filmNev" />
                </div>

                <div className="mb-3">
                    <label htmlFor="filmErtekeles" className="form-label">Film értékelése</label>
                    <input type="number" className="form-control" id="filmErtekeles" />
                </div>

                <div className="mb-3">
                    <label htmlFor="filmKiadas" className="form-label">Film kiadási éve</label>
                    <input type="number" className="form-control" id="filmKiadas" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="filmKepNev" className="form-label">Kép URL</label>
                    <input type="text" onChange={()=>{document.getElementById("previmg").src=document.getElementById('filmKepNev').value /*ew wtf*/}} className="form-control" id="filmKepNev" />
                </div>

                <div className="mb-3">
                    <label htmlFor="previmg" className="form-label">Kép Preview</label>
                    <img id="previmg" className='rounded-3 mt-2 w-100'></img>
                </div>



                <button type="submit" className="btn btn-success me-2">Mentés</button>
                <Link type="button" className="btn btn-warning" to="/pizzza">Vissza</Link>

            </form>
        </div>
    )
}

export default ItemPost
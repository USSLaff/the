import React from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const ItemPut = ({ setFetchPending, selectedItem, setSelectedItem }) => {
    const navigate = useNavigate();
    const param = useParams();

    const [formPendingFetch, setFormPendingFetch] = React.useState(true)

    const [nev, setNev] = React.useState("")
    const [filmKepNev, setFilmKepNev]  = React.useState("")
    const [filmErtekeles, setFilmErtekeles]  = React.useState("")
    const [filmKiadas, setFilmKiadas]  = React.useState("")

    const fetchData = async () => {
        await axios.get(`https://localhost:7017/Film/${param.id}`).then(async (response) => {
            await setSelectedItem(response.data);
            setNev(response.data.nev);
            setFilmKepNev(response.data.kepneve);
            setFilmErtekeles(response.data.ertekeles);
            setFilmKiadas(response.data.kiadasEve)
            

        }).finally(() => setFormPendingFetch(false));
    }

    useEffect(() => {
        fetchData();
    }, [formPendingFetch]);

    const Name = (e) => {
        setNev(e.target.value)
    }

    const KepNev = (e) => {
        setFilmKepNev(e.target.value)
    }

    const Ertekeles = (e) => {
        setFilmErtekeles(e.target.value)
    }

    const Kiadas = (e) => {
        setFilmKiadas(e.target.value)
    }

    return (
        <div className='container w-25 mt-5 border border-2 p-2 rounded-3'>
            <form onSubmit={async (e) => {
                e.preventDefault();
                e.persist();

                const updateData = {
                    id: selectedItem.id,
                    nev: nev,
                    kepneve: filmKepNev,
                    ertekeles: filmErtekeles,
                    kiadasEve: filmKiadas,
                }

                console.log(updateData);
                await axios.put(`https://localhost:7017/Film/${param.id}`, updateData).then(async () => {
                    await setFetchPending(true);
                    navigate('/');
                });

            }}>

                <div className="mb-3">
                    <label htmlFor="filmNev" className="form-label">Film neve</label>
                    <input type="text"  onChange={Name} className="form-control" id="filmNev" defaultValue={nev}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="filmErtekeles" className="form-label">Film értékelése</label>
                    <input type="number" onChange={Ertekeles}  className="form-control" id="filmErtekeles" defaultValue={filmErtekeles} />
                </div>

                <div className="mb-3">
                    <label htmlFor="filmKiadas" className="form-label">Film kiadási éve</label>
                    <input type="number" onChange={Kiadas}  className="form-control" id="filmKiadas" defaultValue={filmKiadas}/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="filmKepNev" className="form-label">Kép URL</label>
                    <input type="text" defaultValue={filmKepNev} onChange={()=>{document.getElementById("previmg").src=document.getElementById('filmKepNev').value;/*ew wtf*/}} className="form-control" id="filmKepNev" />
                </div>

                <div className="mb-3">
                    <label htmlFor="previmg" className="form-label">Kép Preview</label>
                    <img id="previmg" onChange={KepNev} className='rounded-3 mt-2 w-100'></img>
                </div>

                <button type="submit" className="btn btn-success me-2">Mentés</button>
                <Link type="button" className="btn btn-warning" to="/pizzza">Vissza</Link>

            </form>
        </div>
    )
}

export default ItemPut

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Pizzak from './components/Pizzas';
//import Navbar from './components/Navbar';
//import { PizzaPost } from './components/PizzaPost';
//import { PizzaPut } from './components/PizzaPut';
//import { PizzaSelect } from './components/PizzaSelect';
//import { DeleteConfirmModal } from './components/DelModal';
import Main from './components/Main';
import Navbar from './components/Navbar';
import DeleteConfirmModal from './components/DelModal';
import ItemPost from './components/ItemPost';
import ItemSelect from './components/ItemSelect';
import ItemPut from './components/ItemPut';

function App() {
  const [items, setItems] = React.useState([]);
  const [isFetchPending, setFetchPending] = React.useState(true)
  const [selectedItem, setSelectedItem] = React.useState({});


  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path={"/"} element={<Main items={items} setItems={setItems} setSelectedItem={setSelectedItem} setFetchPending={setFetchPending} isFetchPending={isFetchPending}/>} />
          <Route path={"/addItem"} element={<ItemPost items={items} setItems={setItems} setFetchPending={setFetchPending}/>} />
          <Route path={"/item/:id"} element={<ItemSelect selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
          <Route path={"/putItem/:id"} element={<ItemPut selectedItem={selectedItem} setSelectedItem={setSelectedItem} setFetchPending={setFetchPending} isFetchPending={isFetchPending}/>} />


        </Routes>
        <DeleteConfirmModal selectedItem={selectedItem} setFetchPending={setFetchPending} />
      </BrowserRouter>
  );
}

export default App;
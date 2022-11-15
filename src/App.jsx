import { useEffect, useCallback } from 'react'
import { useState } from 'react'
import axios from 'axios'


import './App.css'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import Modal from './components/Modal'

function App() {
  
const [ usersList, setUsersList] = useState([])
const [ userSelected, setUserSelected ] = useState(null)

useEffect(() => {
  axios.get('https://users-crud1.herokuapp.com/users/')
  .then(res => setUsersList(res.data))
}, [])

const getUsers = () => {
  axios.get('https://users-crud1.herokuapp.com/users/')
  .then(res => setUsersList(res.data))
  .catch(error => console.log(error.response.data));
}

const selectUser = (user) => {
  setUserSelected(user)
  setIsOpen(true)
}

const handleClose = () => {
  setUserSelected(null)
  setIsOpen(false)
}

const deleteUser = (id) => {
  axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
  .then(()=> getUsers())
  .catch(error => console.log(error.response?.data));

}
const deselectUser= () => setUserSelected(null)




const DIV_BUTTON_STYLE = {
  position: 'relative',
  zIndex:1

}

const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="App">
      <Modal open = {isOpen}  > <UsersForm isOpen={isOpen} getUsers={getUsers} userSelected={userSelected} deselectUser={deselectUser}  handleClose={handleClose}/> </Modal>
      
      
      <div className='btn-newUser'>
         <button onClick = {() => setIsOpen(true) }>New User</button>
       </div>
       
      

      <UsersList usersList={usersList} selectUser={selectUser} deleteUser={deleteUser} isOpen={isOpen} />
      
    </div>
  )
}

export default App

import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const BeerListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
  
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])


    return (
        <>
            <h1>Beers List</h1>
          
        </>
    )
}

export default BeerListScreen
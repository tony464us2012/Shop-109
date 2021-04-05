import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {
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

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter((a, b) => (a.name > b.name) ? 1 : -1).map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{color: 'green', marginLeft: '.2rem'}}></i>) : (<i className='fas fa-times' style={{color: 'red', marginLeft: '.2rem'}}></i>)}</td>
                                <td>
                                    <div className='user-edit-btn'>
                                        <Button variant='light' onClick={() => history.push(`/admin/user/${user._id}/edit`)} className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen

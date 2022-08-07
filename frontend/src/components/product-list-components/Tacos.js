import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Tacos = ({ tacos, getProductHandler, deleteHandler }) => {
    return (
        <tbody>
            {tacos.sort((a, b) => (a.tacoCategory > b.tacoCategory) ? 1 : -1).map(product => (
                <tr key={product._id}>
                <td><button>{product.name}</button></td>
                <td><button>${product.price}</button></td>
                <td><button>{product.available ? 'Available' : 'Unavailable'}</button></td>
                <td><button>{product.tacoCategory}</button></td>
                <td style={{display: 'flex', justifyContent: 'space-around'}}>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <button  onClick={() => getProductHandler(product._id)}>
                            <i className='fas fa-edit'></i>
                        </button>
                    </LinkContainer>
                        <button style={{color: 'red'}}  onClick={() => deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                        </button>
                </td>
                </tr>
                        ))}
        </tbody>
    )
}
export default Tacos

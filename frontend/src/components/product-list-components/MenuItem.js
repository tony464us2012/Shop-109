import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'

const MenuItem = ({ menuitems, getProductHandler, deleteHandler }) => {
    return (
        <tbody>
            {menuitems.sort((a, b) => (a.category > b.category) ? 1 : -1).map(product => (
                <tr key={product._id}>
                <td>{product.name}{' '}<i style={{ marginLeft: '.5rem', color: product.available ? 'green' : 'red'}}  className={`fas fa-${product.available ? 'check' : 'ban'}`}></i></td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td style={{display: 'flex', justifyContent: 'space-around'}}>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm' onClick={() => getProductHandler(product._id)}>
                            <i className='fas fa-edit'></i>
                        </Button>
                    </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                        </Button>
                </td>
                </tr>
                        ))}
        </tbody>
    )
}

export default MenuItem

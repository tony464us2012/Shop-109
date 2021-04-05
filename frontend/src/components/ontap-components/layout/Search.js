import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import { searchBeer } from '../../../actions/beerActions'
import { Form, Button } from 'react-bootstrap'

const Search = () => {

    const dispatch = useDispatch()

    const[text, setText] = useState('');
    const onChange = (e) => {
    setText(e.target.value)
     }

     const onSubmit = e => {
         e.preventDefault()
         dispatch(searchBeer(text))
         setText('')
     }

    return (
        <>
            <Form onSubmit={onSubmit} style={{display:'block', margin: '.5rem 0 1rem'}}>
                <Form.Group controlId='text'>
                    <Form.Label>Search Beers</Form.Label>
                    <Form.Control type='text' placeholder='What beer are you looking for?' value={text} onChange={onChange}></Form.Control>
                </Form.Group>
                <input type='submit' className='btn btn-primary' value='Search'/>
            </Form>
        </>
    )
}

export default Search

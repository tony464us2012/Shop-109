import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { getMainBeers} from '../actions/beerActions'
import BackTap from '../components/ontap-components/BackTap'
import BackBottle from '../components/ontap-components/BackBottle'
import AddBottle from '../components/ontap-components/layout/AddBottle'
import Search from '../components/ontap-components/layout/Search'
import SearchedBeerItem from '../components/ontap-components/layout/SearchedBeerItem'

const BeerListScreen = ({ history }) => {
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const beers = useSelector(state => state.beers)
    const { displayBeers, bottleBeer, searchedBeers } = beers

    useEffect(() => {
        if(!userInfo.isAdmin) {
            history.push('/login')
        } 
        dispatch(getMainBeers())
    }, [dispatch, history])

return (
    <div className="dashboard1">
        {!displayBeers ? <Message>No Beers On Tap</Message> :  <BackTap displayBeers={displayBeers} />}
        {!bottleBeer ? <Message>No Bottles In Stock</Message> :   <BackBottle bottleBeer={bottleBeer}/>}
        <AddBottle />
        <div className="dashboard-container">
            <Search />
            {!searchedBeers ? <Message>No Searched Beers</Message> : 
                <div className='searchedBeerItems'>
                {searchedBeers.map((x, index) => <SearchedBeerItem 
                name={x.beer.beer_name} 
                key={index}
                id={x.beer.bid} 
                img={x.beer.beer_label} 
                style={x.beer.beer_style} 
                abv={x.beer.beer_abv} 
                company={x.brewery.brewery_name} 
                ibu={x.beer.beer_ibu}
                description={x.beer.beer_description}
                />) }
                </div>
            }
            </div>
      </div>
     )
}

export default BeerListScreen
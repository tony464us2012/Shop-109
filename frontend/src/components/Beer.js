import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { listProducts } from '../actions/productActions'
import BeerHeader from './BeerHeader'
import IPA from './beer-components/IPA'
import Lager from './beer-components/Lager'
import Ale from './beer-components/Ale'
import Sour from './beer-components/Sour'
import Cider from './beer-components/Cider'
import PorterandStout from './beer-components/PorterandStout'
import Special from './beer-components/Special'


const Beer = () => {
    
    const [beerTab, setBeerTab] = useState('IPA')
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const ipa = products.filter(product => product.typeofBeer === 'IPA')
    const lager = products.filter(product => product.typeofBeer === 'Lager')
    const porterandstout = products.filter(product => product.typeofBeer === 'PorterandStout')
    const sour = products.filter(product => product.typeofBeer === 'Sour')
    const ale = products.filter(product => product.typeofBeer === 'Ale')
    const cider = products.filter(product => product.typeofBeer === 'Cider')
    const special = products.filter(product => product.typeofBeer === 'Special')

    
    const beerTabHandler = (tab) => {
        setBeerTab(tab)
    }

    return (
        <>
            <BeerHeader beerTabHandler={beerTabHandler} beerTab={beerTab} />
            {beerTab === 'IPA' ? <IPA ipa={ipa} /> :
             beerTab === 'Lager' ? <Lager lager={lager}/> :
             beerTab === 'PorterandStout' ?  <PorterandStout porterandstout={porterandstout} /> :
             beerTab === 'Sour' ?  <Sour sour={sour} /> :
             beerTab === 'Ale' ? <Ale ale={ale} /> : 
             beerTab === 'Cider' ? <Cider cider={cider} /> :
             <Special special={special} />
            }
        </>
    )
}

export default Beer
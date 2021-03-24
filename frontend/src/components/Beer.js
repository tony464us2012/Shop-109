import React, { useState } from 'react'
import { useSelector  } from 'react-redux'
import BeerHeader from './BeerHeader'
import IPA from './beer-components/IPA'
import Lager from './beer-components/Lager'
import Ale from './beer-components/Ale'
import Sour from './beer-components/Sour'
import Cider from './beer-components/Cider'
import PorterandStout from './beer-components/PorterandStout'
import Special from './beer-components/Special'
import Loader from '../components/Loader'


const Beer = () => {
    
    const [beerTab, setBeerTab] = useState('IPA')
    
    const productList = useSelector(state => state.productList)
    const { loading, products } = productList

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

    return loading ? <Loader /> : (
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
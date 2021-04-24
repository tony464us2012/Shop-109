import React from 'react'
import MainBottleItem from './MainBottleItem'
import MainWineItem from './MainWineItem'

const FrontBottle = ({ bottleBeer }) => {
 
    const ipa = bottleBeer.filter(x => x.type === 'IPA')
    const lager = bottleBeer.filter(x => x.type === 'Lager')
    const sour = bottleBeer.filter(x => x.type === 'Sour')
    const porterandstout = bottleBeer.filter(x => x.type === 'Porter and Stout')
    const ale = bottleBeer.filter(x => x.type === 'Ale')
    const cider = bottleBeer.filter(x => x.type === 'Cider')
    const special = bottleBeer.filter(x => x.type === 'Special')
    const wine = bottleBeer.filter(x => x.type === 'Wine')

    return (
        <>
                 <div className="bottle-container">
                     {ipa.length ? 
                     <div className="bottle-item">
                        <h3>IPA</h3>
                        {ipa.sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <MainBottleItem name={beer.name} price={beer.price} key={index}  /> )}
                    </div> : ''}
                    {lager.length ? 
                    <div className="bottle-item">
                        <h3>Lager</h3>
                        {lager.sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <MainBottleItem name={beer.name} price={beer.price} key={index}  /> )}
                    </div> : ''
                    }
                    {sour.length ? 
                    <div className="bottle-item">
                        <h3>Sour</h3>
                        {sour.sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <MainBottleItem name={beer.name} price={beer.price} key={index} /> )}
                    </div> : '' }
                    {porterandstout.length ? 
                    <div className="bottle-item">
                        <h3>Porter and Stout</h3>
                        {porterandstout.sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <MainBottleItem name={beer.name} price={beer.price} key={index} /> )}
                    </div> : ''}
                    {ale.length ? 
                    <div className="bottle-item">
                        <h3>Ale</h3>
                    {ale.sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <MainBottleItem name={beer.name} price={beer.price} key={index} /> )}
                    </div> : ''
                    }
                    {cider.length ? 
                    <div className="bottle-item">
                        <h3>Ciders</h3>
                        {cider.sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <MainBottleItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
                    </div> : ''}
                    {special.length ? 
                    <div className="bottle-item">
                        <h3>Special</h3>
                        {special.sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <MainBottleItem name={beer.name} price={beer.price} key={index} /> )}
                    </div> : ''
                    }
                 </div>
                 <div className="wine-container">
                     <h3>Wines</h3>
                     <div className="wine-item-container">
                     <div className="wine-item">
                         {wine.sort((a, b) => a.name > b.name ? 1 : -1).filter((x, index) => index <= 10).map((beer, index) => <MainWineItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
                         </div>
                         <div className="wine-item">
                         {wine.sort((a, b) => a.name > b.name ? 1 : -1).filter((x, index) => index > 10).map((beer, index) => <MainWineItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
                         </div>
                     </div>
                 </div>
                </>
    )
}

export default FrontBottle

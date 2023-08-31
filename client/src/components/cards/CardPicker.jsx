import React, { useCallback, useState, useMemo } from 'react';
import AbilityCardData from '../../data/character-ability-cards';
import { HostedImage } from "../core";

const DisplayCard = ({
    data,
    style,
    inHand,
    cardKey,
    onSelected }) => {
    const { image, xws } = data;

    const handleClick = () => {
        onSelected?.(xws);
    }

    return (
        <div
            onClick={handleClick}
            style={style}
            className={"clickable-image"}>
            <HostedImage
                src={`/images/cards/${cardKey}${image}`}
                style={{
                    ...style,
                    objectFit: 'contain',
                    opacity: inHand ? 0.3 : 1
                }} />
        </div>
    );
}

const CardPicker = ({ character, level }) => {

    const gridStyle = {
        display: 'flex',
        width: '95%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        flexFlow: 'wrap',
        gap: 10
    }

    const [selectedCards, setSelectedCards] = useState([]);

    const { cardKey, hand } = character;

    const availableCards = useMemo(() => {
        let result = AbilityCardData.filter(card => card.key === cardKey && card?.level !== '-');
        return result.filter(card => card?.level <= level).sort((a, b) => b.level - a.level);
    }, [cardKey, level]);

    const handleCardToggle = useCallback((xws) => {
        if (selectedCards.some(key => key === xws)) {
            setSelectedCards(selectedCards.filter(key => key !== xws));
        }
        else {
            setSelectedCards([...selectedCards, xws])
        }
    }, [selectedCards, hand]);

    const selectedText = useMemo(() => {
        return (
            <div style={{ color: selectedCards.length > hand ? 'red' : 'white' }}>
                {`Selected (${selectedCards.length}) :: Hand Size (${hand})`}
            </div>
        )
    }, [selectedCards, hand]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
                marginTop: 10,
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
            }}
                className='header-text light-border'
            >
                {selectedText}
                <div style={gridStyle}>
                    {
                        selectedCards.map((xws, idx) => {
                            const cardInfo = availableCards.find(card => card?.xws === xws);

                            return <DisplayCard
                                style={{ width: 180, height: 270 }}
                                key={`${xws}${idx}`}
                                onSelected={handleCardToggle}
                                cardKey={cardKey}
                                data={cardInfo}
                            />
                        })
                    }
                </div>
            </div>


            <div style={{
                marginTop: 10,
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'auto',
                gap: 10
            }}
                className='header-text light-border'
            >
                Available Cards
                <div style={gridStyle}>
                    {
                        availableCards.filter(card => !selectedCards.some(xws => card?.xws === xws)).map((card, idx) => {
                            return <DisplayCard
                                style={{ width: 230, height: 365 }}
                                inHand={selectedCards.some(xws => card?.xws === xws)}
                                key={`${card?.xws}${idx}`}
                                onSelected={handleCardToggle}
                                cardKey={cardKey}
                                data={card}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default CardPicker;
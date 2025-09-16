import React, { useState } from 'react';

interface ClimateZonesGameProps {
  onScoreUpdate?: (score: number, maxScore: number) => void;
}

const zones = [
  {
    id: 'tropicalWet',
    name: 'Tropical Wet',
    description: 'High rainfall, dense forests',
    accepts: ['Tropical Rainforest', 'Elephant', 'Parrot'],
  },
  {
    id: 'tropicalDry',
    name: 'Tropical Dry',
    description: 'Dry, thorny forests',
    accepts: ['Acacia Trees', 'Deer', 'Peacock'],
  },
  {
    id: 'mountain',
    name: 'Mountain',
    description: 'Cold, alpine forests',
    accepts: ['Pine Trees', 'Snow Leopard', 'Himalayan Monal'],
  },
];

const cards = [
  { id: 'card1', name: 'Elephant', color: '#4caf50' },
  { id: 'card2', name: 'Peacock', color: '#2196f3' },
  { id: 'card3', name: 'Pine Trees', color: '#ff9800' },
  { id: 'card4', name: 'Tropical Rainforest', color: '#8bc34a' },
  { id: 'card5', name: 'Deer', color: '#9c27b0' },
  { id: 'card6', name: 'Acacia Trees', color: '#ff5722' },
  { id: 'card7', name: 'Snow Leopard', color: '#607d8b' },
  { id: 'card8', name: 'Himalayan Monal', color: '#e91e63' },
];

const maxScore = cards.length;

export default function ClimateZonesGame({ onScoreUpdate }: ClimateZonesGameProps) {
  const [placedCards, setPlacedCards] = useState<{ [key: string]: string }>({});
  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  function onDragStart(cardId: string) {
    setDraggingCard(cardId);
    setFeedback('');
  }

  function onDrop(zoneId: string) {
    if (!draggingCard) return;

    const card = cards.find(c => c.id === draggingCard);
    const zone = zones.find(z => z.id === zoneId);
    if (!card || !zone) return;

    if (zone.accepts.includes(card.name)) {
      setPlacedCards(prev => {
        const updated = { ...prev, [draggingCard]: zoneId };
        if (onScoreUpdate) onScoreUpdate(Object.keys(updated).length, maxScore);
        return updated;
      });
      setFeedback(`✔️ '${card.name}' correctly placed in ${zone.name}!`);
    } else {
      setFeedback(`❌ '${card.name}' does not belong in ${zone.name}. Try again!`);
    }

    setDraggingCard(null);
  }

  const totalCorrect = Object.keys(placedCards).length;
  const gameComplete = totalCorrect === maxScore;

  return (
    <div style={{ maxWidth: 700, margin: 'auto', fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h2>Classify Climate Zones and Their Vegetation/Wildlife</h2>
      <p>Drag each card onto the correct climate zone box.</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        {zones.map(zone => (
          <div
            key={zone.id}
            onDrop={() => onDrop(zone.id)}
            onDragOver={e => e.preventDefault()}
            style={{
              border: '2px solid #333',
              borderRadius: 8,
              padding: 16,
              width: '30%',
              minHeight: 180,
              textAlign: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <h3>{zone.name}</h3>
            <p style={{ fontSize: 12, color: '#555', minHeight: 40 }}>{zone.description}</p>

            <div style={{ marginTop: 10 }}>
              {Object.entries(placedCards)
                .filter(([, zid]) => zid === zone.id)
                .map(([cid]) => {
                  const card = cards.find(c => c.id === cid);
                  return (
                    <div
                      key={cid}
                      style={{
                        backgroundColor: card?.color,
                        color: 'white',
                        margin: '5px auto',
                        borderRadius: 6,
                        padding: '6px 10px',
                        fontWeight: 'bold',
                        width: '90%',
                      }}
                    >
                      {card?.name}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', minHeight: 120 }}>
        {cards
          .filter(c => !placedCards[c.id])
          .map(card => (
            <div
              key={card.id}
              draggable
              onDragStart={() => onDragStart(card.id)}
              style={{
                backgroundColor: card.color,
                color: 'white',
                padding: '10px 16px',
                borderRadius: 8,
                fontWeight: 'bold',
                cursor: 'grab',
                userSelect: 'none',
                marginBottom: 10,
              }}
            >
              {card.name}
            </div>
          ))}
      </div>

      <div style={{ marginTop: 12, minHeight: 24, fontWeight: 'bold', color: feedback.startsWith('✔️') ? 'green' : 'red' }}>
        {feedback}
      </div>

      {gameComplete && (
        <div style={{ marginTop: 20, padding: 15, backgroundColor: '#38b000', borderRadius: 8, color: 'white', fontWeight: 'bold' }}>
          🎉 Congratulations! You correctly classified all vegetation and wildlife!
        </div>
      )}
    </div>
  );
}

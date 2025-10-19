import React from 'react';
import type { PlacedItem } from '../types';
import PlacedItemComponent from './PlacedItemComponent';

interface CanvasProps {
  items: PlacedItem[];
  backgroundUrl: string;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onItemSelect: (itemId: string | null) => void;
  onItemUpdate: (itemId: string, updates: Partial<PlacedItem>) => void;
  selectedItemId: string | null;
}

const Canvas = React.forwardRef<HTMLDivElement, CanvasProps>(
  ({ items, backgroundUrl, onDrop, onItemSelect, onItemUpdate, selectedItemId }, ref) => {
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onItemSelect(null);
      }
    };

    return (
      <div
        ref={ref}
        onDrop={onDrop}
        onDragOver={handleDragOver}
        onClick={handleCanvasClick}
        className="w-full h-full relative bg-cover bg-center bg-no-repeat"
        style={{
          '--grid-color': 'rgba(128, 128, 128, 0.2)',
          '--grid-size': '20px',
          backgroundSize: `cover, var(--grid-size) var(--grid-size)`,
          backgroundImage: `url(${backgroundUrl}), 
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
        } as React.CSSProperties}
      >
        {items.map(item => (
          <PlacedItemComponent
            key={item.id}
            item={item}
            isSelected={item.id === selectedItemId}
            onSelect={onItemSelect}
            onUpdate={onItemUpdate}
          />
        ))}
      </div>
    );
  }
);

export default Canvas;
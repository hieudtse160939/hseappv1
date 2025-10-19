// FIX: Implemented the PlacedItemComponent to render items on the canvas, handle dragging and selection.
import React, { useRef } from 'react';
import type { PlacedItem, DragData } from '../types';
import { DEFAULT_ICONS } from '../constants';

interface PlacedItemComponentProps {
  item: PlacedItem;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
  onUpdate: (itemId: string, updates: Partial<PlacedItem>) => void;
}

const PlacedItemComponent: React.FC<PlacedItemComponentProps> = ({ item, isSelected, onSelect, onUpdate }) => {
  const resizeRef = useRef<{
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    initialMouseX: number;
    initialMouseY: number;
    initialRotation: number;
    direction: string;
  } | null>(null);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const dragData: DragData = {
      type: 'move',
      itemId: item.id,
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onSelect(item.id);
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    e.stopPropagation();
    e.preventDefault();

    resizeRef.current = {
      initialX: item.x,
      initialY: item.y,
      initialWidth: item.width,
      initialHeight: item.height,
      initialMouseX: e.clientX,
      initialMouseY: e.clientY,
      initialRotation: item.rotation,
      direction: direction,
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!resizeRef.current) return;
    
    const { 
      initialX, initialY, initialWidth, initialHeight, 
      initialMouseX, initialMouseY, initialRotation, direction 
    } = resizeRef.current;
    
    let { x, y, width, height } = item;
    
    const dx = e.clientX - initialMouseX;
    const dy = e.clientY - initialMouseY;
    
    const rad = initialRotation * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const rotatedDx = dx * cos + dy * sin;
    const rotatedDy = -dx * sin + dy * cos;
    
    let newWidth = initialWidth;
    let newHeight = initialHeight;
    let newX = initialX;
    let newY = initialY;

    if (direction.includes('e')) {
        newWidth = initialWidth + rotatedDx;
    } else if (direction.includes('w')) {
        newWidth = initialWidth - rotatedDx;
        newX += dx - (rotatedDx * cos - 0 * sin);
        newY += dy - (rotatedDx * sin + 0 * cos);
    }
    
    if (direction.includes('s')) {
        newHeight = initialHeight + rotatedDy;
    } else if (direction.includes('n')) {
        newHeight = initialHeight - rotatedDy;
        newX += dx - (0 * cos - rotatedDy * sin);
        newY += dy - (0 * sin + rotatedDy * cos);
    }

    if (newWidth < 20) newWidth = 20;
    if (newHeight < 20) newHeight = 20;
    
    onUpdate(item.id, {
        width: newWidth,
        height: newHeight,
        x: newX,
        y: newY
    });
};

const handleMouseUp = () => {
    resizeRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
};


  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${item.x}px`,
    top: `${item.y}px`,
    width: `${item.width}px`,
    height: `${item.height}px`,
    transform: `rotate(${item.rotation}deg)`,
    cursor: 'move',
    boxSizing: 'border-box',
  };

  const selectionStyle: React.CSSProperties = isSelected
    ? {
        border: '2px solid #4f46e5',
        boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.5)',
      }
    : {
        border: '2px solid transparent',
    };

  const content = item.customIconUrl ? (
    <img src={item.customIconUrl} alt={item.name || item.type} className="w-full h-full object-contain" />
  ) : (
    DEFAULT_ICONS[item.type]
  );
  
  const resizeHandleStyle: React.CSSProperties = {
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: 'white',
      border: '1.5px solid #4f46e5',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
  };

  const resizeHandles = [
    { position: { top: '0%', left: '0%' }, cursor: 'nwse-resize', dir: 'nw' },
    { position: { top: '0%', left: '50%' }, cursor: 'ns-resize', dir: 'n' },
    { position: { top: '0%', left: '100%' }, cursor: 'nesw-resize', dir: 'ne' },
    { position: { top: '50%', left: '0%' }, cursor: 'ew-resize', dir: 'w' },
    { position: { top: '50%', left: '100%' }, cursor: 'ew-resize', dir: 'e' },
    { position: { top: '100%', left: '0%' }, cursor: 'nesw-resize', dir: 'sw' },
    { position: { top: '100%', left: '50%' }, cursor: 'ns-resize', dir: 's' },
    { position: { top: '100%', left: '100%' }, cursor: 'nwse-resize', dir: 'se' },
  ];

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      style={{ ...style, ...selectionStyle, borderRadius: '4px' }}
      className="flex flex-col items-center group p-1"
      title={item.name}
    >
      <div className="w-full flex-grow relative flex items-center justify-center" style={{ minHeight: 0 }}>
        {content}
      </div>
      
      {item.name && item.name.trim() !== '' && (
        <div className="flex-shrink-0 pt-1">
          <span
            className="px-2 py-0.5 bg-white bg-opacity-80 rounded text-xs text-gray-800 shadow whitespace-nowrap"
            style={{
              transform: `rotate(-${item.rotation}deg)`,
              transformOrigin: 'center',
              display: 'inline-block',
            }}
          >
            {item.name}
          </span>
        </div>
      )}
      
      {isSelected && resizeHandles.map(handle => (
        <div 
          key={handle.dir}
          onMouseDown={(e) => handleResizeMouseDown(e, handle.dir)}
          style={{ ...resizeHandleStyle, ...handle.position, cursor: handle.cursor, zIndex: 10}}
        />
      ))}
    </div>
  );
};

export default PlacedItemComponent;
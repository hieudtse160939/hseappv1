
import React from 'react';
import type { DragData } from '../types';
import { ItemType } from '../types';

interface DraggableItemProps {
  itemType: ItemType;
  name: string;
  children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ itemType, name, children }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const dragData: DragData = {
      type: 'add',
      itemType: itemType,
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex flex-col items-center justify-center p-2 bg-white rounded-md cursor-grab hover:bg-indigo-100 hover:shadow-lg transition-all border border-gray-300 shadow-sm"
      title={name}
    >
      <div className="w-10 h-10 flex items-center justify-center text-indigo-500">
        {children}
      </div>
      <span className="text-xs text-center mt-1 text-gray-600">{name}</span>
    </div>
  );
};

export default DraggableItem;
import React, { useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import type { DragData, PlacedItem } from './types';
import { ItemType } from './types';
import { FURNITURE_ITEMS, SNAP_GRID_SIZE, DEFAULT_ICONS, ITEM_DIMENSIONS } from './constants';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

const App: React.FC = () => {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragData: DragData = JSON.parse(e.dataTransfer.getData('application/json'));
    const canvasRect = e.currentTarget.getBoundingClientRect();
    
    let x = e.clientX - canvasRect.left - dragData.offsetX;
    let y = e.clientY - canvasRect.top - dragData.offsetY;

    let draggedItemType: ItemType | undefined;
    if (dragData.type === 'add') {
      draggedItemType = dragData.itemType;
    } else if (dragData.type === 'move' && dragData.itemId) {
      const movedItem = placedItems.find(item => item.id === dragData.itemId);
      draggedItemType = movedItem?.type;
    }

    if (draggedItemType === ItemType.STUDENT_DESK) {
      x = Math.round(x / SNAP_GRID_SIZE) * SNAP_GRID_SIZE;
      y = Math.round(y / SNAP_GRID_SIZE) * SNAP_GRID_SIZE;
    }

    if (dragData.type === 'add' && dragData.itemType) {
      const dimensions = ITEM_DIMENSIONS[dragData.itemType];
      const newItem: PlacedItem = {
        id: `item-${Date.now()}`,
        type: dragData.itemType,
        x,
        y,
        width: dimensions.width,
        height: dimensions.height,
        rotation: 0,
        name: '',
      };
      setPlacedItems(prevItems => [...prevItems, newItem]);
      setSelectedItemId(newItem.id);
    } else if (dragData.type === 'move' && dragData.itemId) {
      setPlacedItems(prevItems =>
        prevItems.map(item =>
          item.id === dragData.itemId ? { ...item, x, y } : item
        )
      );
      setSelectedItemId(dragData.itemId);
    }
  }, [placedItems]);
  
  const handleItemSelect = (itemId: string | null) => {
    setSelectedItemId(itemId);
  };
  
  const handleUpdateItem = useCallback((itemId: string, updates: Partial<PlacedItem>) => {
    setPlacedItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  }, []);

  const handleRotateItem = useCallback(() => {
    if (!selectedItemId) return;
    const currentItem = placedItems.find(item => item.id === selectedItemId);
    if (currentItem) {
      handleUpdateItem(selectedItemId, { rotation: (currentItem.rotation + 45) % 360 });
    }
  }, [selectedItemId, placedItems, handleUpdateItem]);

  const handleDeleteItem = useCallback(() => {
    if (!selectedItemId) return;
    setPlacedItems(prevItems => prevItems.filter(item => item.id !== selectedItemId));
    setSelectedItemId(null);
  }, [selectedItemId]);

  const handleItemNameChange = useCallback((newName: string) => {
    if (!selectedItemId) return;
    handleUpdateItem(selectedItemId, { name: newName });
  }, [selectedItemId, handleUpdateItem]);

  const handleBackgroundChange = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedBackground(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleItemIconChange = useCallback((file: File) => {
    if (!selectedItemId) return;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result as string;
          handleUpdateItem(selectedItemId, { customIconUrl: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  }, [selectedItemId, handleUpdateItem]);

  const handleClearAll = () => {
    setPlacedItems([]);
    setSelectedItemId(null);
  };
  
  const handleDownloadImage = useCallback(() => {
    if (!canvasRef.current) return;
    
    // Bỏ chọn item để không bị dính viền xanh khi xuất ảnh
    setSelectedItemId(null);

    // Đợi một chút để DOM cập nhật
    setTimeout(() => {
        toPng(canvasRef.current!, { cacheBust: true, pixelRatio: 2 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'so-do-lop-hoc.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('Không thể tạo ảnh!', err);
            });
    }, 100);
  }, []);

  const selectedItem = placedItems.find(item => item.id === selectedItemId);

  return (
    <div className="flex h-screen font-sans bg-gray-200 text-gray-800">
      <Sidebar
        availableItems={FURNITURE_ITEMS}
        defaultIcons={DEFAULT_ICONS}
        onBackgroundChange={handleBackgroundChange}
        selectedItemId={selectedItemId}
        selectedItem={selectedItem}
        onItemNameChange={handleItemNameChange}
        onItemIconChange={handleItemIconChange}
        onRotate={handleRotateItem}
        onDelete={handleDeleteItem}
        onClearAll={handleClearAll}
        onDownloadImage={handleDownloadImage}
      />
      <main className="flex-1 flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Trình tạo Sơ đồ Lớp học</h1>
        <div className="flex-1 w-full h-full border-4 border-gray-300 border-dashed rounded-lg overflow-hidden">
          <Canvas
            ref={canvasRef}
            items={placedItems}
            backgroundUrl={selectedBackground}
            onDrop={handleDrop}
            onItemSelect={handleItemSelect}
            onItemUpdate={handleUpdateItem}
            selectedItemId={selectedItemId}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
import React from 'react';
// FIX: Split 'ItemType' and 'PlacedItem' imports to correctly handle value and type imports.
import { ItemType } from '../types';
import type { PlacedItem } from '../types';
import DraggableItem from './DraggableItem';
import { RotateCcw, Trash2, XCircle, Upload, ImageUp, Download } from 'lucide-react';

interface SidebarProps {
  availableItems: { type: ItemType; name: string }[];
  defaultIcons: Record<ItemType, React.ReactNode>;
  onBackgroundChange: (file: File) => void;
  selectedItemId: string | null;
  selectedItem?: PlacedItem;
  onItemNameChange: (name: string) => void;
  onItemIconChange: (file: File) => void;
  onRotate: () => void;
  onDelete: () => void;
  onClearAll: () => void;
  onDownloadImage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  availableItems,
  defaultIcons,
  onBackgroundChange,
  selectedItemId,
  selectedItem,
  onItemNameChange,
  onItemIconChange,
  onRotate,
  onDelete,
  onClearAll,
  onDownloadImage,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onBackgroundChange(e.target.files[0]);
    }
  };

  const handleItemIconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onItemIconChange(e.target.files[0]);
    }
  };

  return (
    <aside className="w-64 bg-white p-4 shadow-lg overflow-y-auto flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-indigo-600 border-b pb-2">Công cụ</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Vật dụng</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableItems.map(item => (
            <DraggableItem key={item.type} itemType={item.type} name={item.name}>
              {defaultIcons[item.type]}
            </DraggableItem>
          ))}
        </div>
      </div>

      {selectedItemId && selectedItem && (
        <div className="mb-6 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <h3 className="font-semibold mb-3 text-gray-700">Hành động cho vật dụng</h3>
          <div className="mb-3">
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-600 mb-1">
              Tên
            </label>
            <input
              type="text"
              id="itemName"
              value={selectedItem.name ?? ''}
              onChange={e => onItemNameChange(e.target.value)}
              placeholder="Nhập tên..."
              className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          {selectedItem.type === ItemType.STUDENT_DESK && (
            <div className="mb-3">
              <label
                htmlFor="item-icon-upload"
                className="w-full flex items-center justify-center p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors cursor-pointer text-sm"
              >
                <ImageUp size={16} className="mr-2" />
                <span>Tải lên hình ảnh</span>
              </label>
              <input
                id="item-icon-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleItemIconFileChange}
              />
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={onRotate}
              className="flex-1 flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              title="Xoay vật dụng"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              title="Xóa vật dụng"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-2 text-gray-700">Phông nền</h3>
          <label
            htmlFor="background-upload"
            className="w-full flex items-center justify-center p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer"
          >
            <Upload size={20} className="mr-2" />
            <span>Tải lên phông nền</span>
          </label>
          <input
            id="background-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="mt-auto space-y-2">
         <button
          onClick={onDownloadImage}
          className="w-full flex items-center justify-center p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
          title="Tải về sơ đồ"
        >
          <Download size={20} className="mr-2" />
          <span>Tải về</span>
        </button>
        <button
          onClick={onClearAll}
          className="w-full flex items-center justify-center p-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          title="Xóa tất cả"
        >
          <XCircle size={20} className="mr-2" />
          <span>Dọn dẹp</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

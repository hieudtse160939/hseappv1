import React from 'react';
import type { Background } from './types';
import { ItemType } from './types';
import { StudentDeskIcon, TeacherDeskIcon, BookshelfIcon, DoorIcon, WhiteboardIcon, PlantIcon } from './components/icons/FurnitureIcons';

export const FURNITURE_ITEMS = [
  { type: ItemType.STUDENT_DESK, name: 'Bàn học sinh' },
  { type: ItemType.TEACHER_DESK, name: 'Bàn giáo viên' },
  { type: ItemType.BOOKSHELF, name: 'Tủ sách' },
  { type: ItemType.WHITEBOARD, name: 'Bảng trắng' },
  { type: ItemType.DOOR, name: 'Cửa ra vào' },
  { type: ItemType.PLANT, name: 'Cây cảnh' },
];

export const DEFAULT_ICONS: Record<ItemType, React.ReactNode> = {
  [ItemType.STUDENT_DESK]: <StudentDeskIcon />,
  [ItemType.TEACHER_DESK]: <TeacherDeskIcon />,
  [ItemType.BOOKSHELF]: <BookshelfIcon />,
  [ItemType.WHITEBOARD]: <WhiteboardIcon />,
  [ItemType.DOOR]: <DoorIcon />,
  [ItemType.PLANT]: <PlantIcon />,
};

export const ITEM_DIMENSIONS: { [key in ItemType]: { width: number; height: number } } = {
  [ItemType.STUDENT_DESK]: { width: 60, height: 75 },
  [ItemType.TEACHER_DESK]: { width: 120, height: 60 },
  [ItemType.BOOKSHELF]: { width: 100, height: 40 },
  [ItemType.WHITEBOARD]: { width: 150, height: 20 },
  [ItemType.DOOR]: { width: 70, height: 20 },
  [ItemType.PLANT]: { width: 40, height: 40 },
};

export const SNAP_GRID_SIZE = 20;
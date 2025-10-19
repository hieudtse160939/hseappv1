export enum ItemType {
  STUDENT_DESK = 'STUDENT_DESK',
  TEACHER_DESK = 'TEACHER_DESK',
  BOOKSHELF = 'BOOKSHELF',
  DOOR = 'DOOR',
  WHITEBOARD = 'WHITEBOARD',
  PLANT = 'PLANT',
}

export interface PlacedItem {
  id: string;
  type: ItemType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  name?: string;
  customIconUrl?: string;
}

export interface Background {
  id: string;
  name: string;
  imageUrl: string;
}

export interface DragData {
  type: 'move' | 'add';
  itemType?: ItemType;
  itemId?: string;
  offsetX: number;
  offsetY: number;
}
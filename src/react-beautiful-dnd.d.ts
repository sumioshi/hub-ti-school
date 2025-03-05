declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  // Droppable
  export interface DroppableProvided {
    innerRef: React.RefCallback<HTMLElement>;
    droppableProps: {
      [key: string]: any;
    };
    placeholder?: React.ReactElement<HTMLElement> | null;
  }

  export interface DroppableStateSnapshot {
    isDraggingOver: boolean;
    draggingOverWith?: string;
    draggingFromThisWith?: string;
    isUsingPlaceholder: boolean;
  }

  export interface DroppableProps {
    droppableId: string;
    type?: string;
    direction?: 'horizontal' | 'vertical';
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    ignoreContainerClipping?: boolean;
    renderClone?: any;
    getContainerForClone?: any;
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement<HTMLElement>;
  }

  export class Droppable extends React.Component<DroppableProps> {}

  // Draggable
  export interface DraggableProvided {
    innerRef: React.RefCallback<HTMLElement>;
    draggableProps: {
      [key: string]: any;
    };
    dragHandleProps: {
      [key: string]: any;
    } | null;
  }

  export interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
    draggingOver?: string;
    dropAnimation?: {
      duration: number;
      curve: string;
      moveTo: {
        x: number;
        y: number;
      };
    };
    combineWith?: string;
    combineTargetFor?: string;
    mode?: 'FLUID' | 'SNAP';
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    isDragDisabled?: boolean;
    disableInteractiveElementBlocking?: boolean;
    shouldRespectForcePress?: boolean;
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactElement<HTMLElement>;
  }

  export class Draggable extends React.Component<DraggableProps> {}

  // DragDropContext
  export interface DropResult {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    destination?: {
      droppableId: string;
      index: number;
    };
    reason: 'DROP' | 'CANCEL';
    mode: 'FLUID' | 'SNAP';
    combine?: {
      draggableId: string;
      droppableId: string;
    };
  }

  export interface DragStart {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    mode: 'FLUID' | 'SNAP';
  }

  export interface DragUpdate extends DragStart {
    destination?: {
      droppableId: string;
      index: number;
    };
    combine?: {
      draggableId: string;
      droppableId: string;
    };
  }

  export interface DragDropContextProps {
    onBeforeDragStart?: (initial: DragStart) => void;
    onDragStart?: (initial: DragStart) => void;
    onDragUpdate?: (update: DragUpdate) => void;
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  }

  export class DragDropContext extends React.Component<DragDropContextProps> {}
} 
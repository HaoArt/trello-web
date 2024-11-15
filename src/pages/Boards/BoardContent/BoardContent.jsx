/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sort';
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep } from 'lodash';

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
  }, [board]);

  const ACTIVE_DRAG_ITEM_TYPE = {
    column: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    card: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  const usePointer = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 450,
        tolerance: 50,
      },
    })
  );

  const handleDragStart = (event) => {
    console.log(event);

    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.card
        : ACTIVE_DRAG_ITEM_TYPE.column
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column) return;
    const { active, over } = event;
    if (!active || !over) return;

    const {
      id: activeDraggingId,
      data: { current: currentDraggingData },
    } = active;
    const { id: overId } = over;

    const activeColumn = findColumnByCardId(activeDraggingId);
    const overColumn = findColumnByCardId(overId);
    // console.log(activeColumn, overColumn);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overId._id) {
      setOrderedColumns((prev) => {
        const overCardIndex = overColumn?.cards.findIndex(
          (card) => card._id === overId
        );

        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : over?.cards?.length + 1;
        const nextColumns = cloneDeep(prev);
        console.log(nextColumns);
        const nextActiveColumn = nextColumns?.find(
          (column) => column._id === activeColumn._id
        );
        const nextOverColumn = nextColumns?.find(
          (column) => column._id === overColumn._id
        );

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingId
          );
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards?.map(
            (card) => card._id
          );
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingId
          );
          //splice sua truc tiep vao mang dang goi
          //toSplice tra ra mang moi  va ko sua truc tiep vao mang
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,0,
            currentDraggingData
          );
          nextOverColumn.cardOrderIds = nextOverColumn.cards?.map(
            (card) => card._id
          );
        }

        return nextColumns;
      });
    }
  };

  const handleDragEnd = (event) => {
    console.log(event);

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.card) {
      return;
    }

    const { active, over } = event;
    if (!active || !over) return;

    if (active.id !== over.id) {
      //lay vi tri cua phan tu thay doi tu active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);

      //lay vi tri cua phan tu bi thay doi tu over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      //arrmove để set lại mảng ban đầu
      const dndOrderColumn = arrayMove(orderedColumns, oldIndex, newIndex);
      // dùng để cạp nhật lại mảng đã sắp xếp khi gọi API
      // const orderedColumnssIds = dndOrderColumn.map(c=>c._id)
      // console.log("", orderedColumnssIds);

      setOrderedColumns(dndOrderColumn);
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <Box
        sx={{
          with: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          display: 'flex',
          borderTop: '1px solid',
          borderTopColor: 'primary.main',
          color: 'text.color',
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.card && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;

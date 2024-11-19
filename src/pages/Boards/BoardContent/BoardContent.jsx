/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-hooks/exhaustive-deps */
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
  pointerWithin,
  rectIntersection,
  getFirstCollision,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useEffect, useRef, useState } from 'react';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep,isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formater';

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  const lastOverId = useRef(null);

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

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column) {
        return closestCenter({ ...args });
      }
      const pointerIntersections = pointerWithin(args);
      if (!pointerIntersections?.length > 0) return;
      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args);
      let overId = getFirstCollision(pointerIntersections, 'id');
      if (overId) {
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        );
        if (checkColumn) {
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds.includes(container.id)
            ),
          })[0]?.id;
        }
        lastOverId.current = overId;
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: overId }] : [];
    },
    [activeDragItemType]
  );

  const usePointer = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
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

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  const dndCardBetweenColumns = (
    overColumn,
    overId,
    active,
    over,
    activeColumn,
    activeDraggingId,
    activeDraggingCardData
  ) => {
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
        overCardIndex >= 0 ? overCardIndex + modifier : over?.cards?.length + 1;
      const nextColumns = cloneDeep(prev);
      const nextActiveColumn = nextColumns?.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns?.find(
        (column) => column._id === overColumn._id
      );
      //column cu
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingId
        );
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards= [generatePlaceholderCard(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards?.map(
          (card) => card._id
        );
        console.log('nextA',nextActiveColumn);
      }
      
      //column moi
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingId
        );

        //splice sua truc tiep vao mang dang goi
        //toSplice tra ra mang moi  va ko sua truc tiep vao mang
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: overColumn._id,
        });
        nextOverColumn.cards = nextOverColumn.cards.filter(card=>!card.FE_PlaceholderCard)
        nextOverColumn.cardOrderIds = nextOverColumn.cards?.map(
          (card) => card._id
        );
        console.log('nextO',nextOverColumn);
      }


      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.card
        : ACTIVE_DRAG_ITEM_TYPE.column
    );
    setActiveDragItemData(event?.active?.data?.current);
    if (event?.active?.data?.current?.columnId) {
      setOldColumnDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column) return;
    const { active, over } = event;
    if (!active || !over) return;

    const {
      id: activeDraggingId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overId } = over;

    const activeColumn = findColumnByCardId(activeDraggingId);
    const overColumn = findColumnByCardId(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      dndCardBetweenColumns(
        overColumn,
        overId,
        active,
        over,
        activeColumn,
        activeDraggingId,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;

    // hành động kéo thả khi kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.card) {
      const {
        id: activeDraggingId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overId } = over;

      const activeColumn = findColumnByCardId(activeDraggingId);
      const overColumn = findColumnByCardId(overId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnDraggingCard._id !== overColumn._id) {
        dndCardBetweenColumns(
          overColumn,
          overId,
          active,
          over,
          activeColumn,
          activeDraggingId,
          activeDraggingCardData
        );
      } else {
        //lay vi tri cua phan tu thay doi tu active
        const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDraggingId
        );

        //lay vi tri cua phan tu bi thay doi tu over
        const newCardIndex = oldColumnDraggingCard?.cards?.findIndex(
          (c) => c._id === overId
        );

        const dndOrderCards = arrayMove(
          oldColumnDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        setOrderedColumns((prev) => {
          const nextColumns = cloneDeep(prev);
          const targetColumn = nextColumns.find(
            (c) => c._id === overColumn._id
          );
          targetColumn.cards = dndOrderCards;
          targetColumn.cardOrderIds = dndOrderCards?.map((c) => c._id);
          return nextColumns;
        });
      }
    }

    // hành động kéo thả khi kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column) {

      if (active.id !== over.id) {
        //lay vi tri cua phan tu thay doi tu active
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        );

        //lay vi tri cua phan tu bi thay doi tu over
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        );

        //arrmove để set lại mảng ban đầu
        const dndOrderColumn = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );
        // dùng để cạp nhật lại mảng đã sắp xếp khi gọi API
        // const orderedColumnssIds = dndOrderColumn.map(c=>c._id)

        setOrderedColumns(dndOrderColumn);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnDraggingCard(null);
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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

/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sort';
import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
function BoardContent({ board }) {
  const [orderedColumn, setOrderedColumn] = useState([]);
  useEffect(() => {
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
  }, [board]);
  const handleDragEnd = (event) => {
    console.log(event);
    const { active, over } = event;
    if (!over) return
    if (active.id !== over.id) {
      //lay vi tri cua phan tu thay doi tu active
      const oldIndex = orderedColumn.findIndex((c) => c._id === active.id);
      //lay vi tri cua phan tu bi thay doi tu over
      const newIndex = orderedColumn.findIndex((c) => c._id === over.id);
      //arrmove để set lại mảng ban đầu
      const dndOrderColumn = arrayMove(orderedColumn, oldIndex, newIndex);
      // dùng để cạp nhật lại mảng đã sắp xếp khi gọi API
      // const orderedColumnsIds = dndOrderColumn.map(c=>c._id)
      // console.log("", orderedColumnsIds);

      setOrderedColumn(dndOrderColumn);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
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
        <ListColumns columns={orderedColumn} />
      </Box>
    </DndContext>
  );
}

export default BoardContent;

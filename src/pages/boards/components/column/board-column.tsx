import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Add as AddIcon } from '@styled-icons/ionicons-outline';
import { EllipsisH as EllipsisIcon } from '@styled-icons/fa-solid/EllipsisH';
import useStyles from './styles';
import MutableInput from '../multableInput/multableInput';
// Import BoardItem component
import { BoardItem } from '../item/board-item';
import Popover from '../popover/columnPopover';

// Define types for board column element properties
type BoardColumnProps = {
    key: string;
    column: any;
    items: any;
    index: any;
    type?: string;
    setTitle: any;
    AddTask: any;
    UpdateTask: any;
    DeleteTask: any;
    DeleteColumn: any;
};

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
    isDraggingOver: boolean;
};

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
    min-height: 20px;
    padding-right: 5px;
    background-color: ${props => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
    /* min-height: 60vh; */
    max-height: 61vh;
    overflow-y: auto;
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 8px;
    margin-left: 12px;
}
/* Track */
::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #f0beff; 
}
/* ::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(255,0,0,0.4); 
} */
`;

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = props => {
    const classes = useStyles();
    const {
        // key,
        column,
        items,
        index,
        // type,
        setTitle,
        AddTask,
        UpdateTask,
        DeleteTask,
        DeleteColumn,
    } = props;
    // const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
    // const handleOpenNewTaskModal = () => {
    //     setShowNewTaskModal(true);
    // };

    // const handleCloseNewTaskModal = () => {
    //     setShowNewTaskModal(false);
    // };
    return (
        <>
            <Draggable draggableId={column.id} index={index}>
                {provided => (
                    <div
                        className={classes.BoardColumnWrapper}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        {/* Title of the column */}
                        <Grid container>
                            <Grid item xs={2}>
                                <div className={classes.circle}>
                                    {items.length}
                                </div>
                            </Grid>
                            <Grid item xs={8} {...provided.dragHandleProps}>
                                <MutableInput
                                    value={column.title}
                                    valueSet={setTitle}
                                    id={column.id}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <AddIcon
                                    className={classes.icon}
                                    onClick={() =>
                                        AddTask(column.id, 'Texto Novo')
                                    }
                                />
                            </Grid>
                            <Grid item xs={1}>
                            <Popover
                                        DeleteColumn={DeleteColumn}
                                        columnID={column.id}
                                    />
                            </Grid>
                        </Grid>
                        <Droppable droppableId={column.id} type="task">
                            {(provided, snapshot) => (
                                <BoardColumnContent
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {/* All board items belong into specific column. */}
                                    {items.map((item: any, index: number) => (
                                        <BoardItem
                                            key={item.id}
                                            item={item}
                                            index={index}
                                            UpdateTask={UpdateTask}
                                            DeleteTask={DeleteTask}
                                            columnID={column.id}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </BoardColumnContent>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
            {/* <NewTaskModal
                isOpen={showNewTaskModal}
                setIsOpen={setShowNewTaskModal}
            /> */}
        </>
    );
};

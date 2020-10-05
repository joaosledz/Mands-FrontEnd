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

// Define types for board column element properties
type BoardColumnProps = {
    key: string;
    column: any;
    items: any;
    index: any;
    type?: string;
    setTitle: any;
};

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
    isDraggingOver: boolean;
};

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
    min-height: 20px;
    background-color: ${props => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
    min-height: 60vh;
`;

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = props => {
    const classes = useStyles();

    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {provided => (
                <div
                    className={classes.BoardColumnWrapper}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    {/* Title of the column */}
                    <Grid container {...provided.dragHandleProps}>
                        <Grid item xs={2}>
                            <div className={classes.circle}>
                                {props.items.length}
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <MutableInput
                                value={props.column.title}
                                valueSet={props.setTitle}
                                id={props.column.id}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <AddIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs={1}>
                            <EllipsisIcon className={classes.icon} />
                        </Grid>
                    </Grid>
                    <Droppable droppableId={props.column.id} type="task">
                        {(provided, snapshot) => (
                            <BoardColumnContent
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {/* All board items belong into specific column. */}
                                {props.items.map((item: any, index: number) => (
                                    <BoardItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                    />
                                ))}
                                {provided.placeholder}
                            </BoardColumnContent>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

import React from 'react';
// import BoardContext from '../../../../../contexts/calendar';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import { TypeEvent } from '../../models';
// Import BoardItem component
// import Event from '../item';
// import Popover from '../popover/columnPopover';
// import CreateTaskModal from '../modal/create-task';
import { Typography } from '@material-ui/core';

// Define types for board column element properties
type BoardColumnProps = {
    key: string;
    column: any;
    events: TypeEvent[];
    index: any;
    type?: string;
    // departmentId: number;
    // projectId: number;
    // companyId: number;
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
        background: rgba(170, 170, 170, 0.5);
    }
    /* ::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(255,0,0,0.4); 
} */
`;

// Create and export the BoardColumn component
export const Day: React.FC<BoardColumnProps> = props => {
    const classes = useStyles();
    // const { DeleteColumn, setColumnTitle, permissions } = useContext(
    //     BoardContext
    // );
    const { column /*items, index*/ } = props;

    return (
        <>
            <Droppable droppableId={column.sessionId} type="task">
                {(provided, snapshot) => (
                    <div
                        className={classes.BoardColumnWrapper}
                        ref={provided.innerRef}
                    >
                        {/* Title of the column */}
                        <Grid container>
                            {/* <Grid item xs={2}>
                                <div className={classes.circle}>
                                    {items.length}
                                </div>
                            </Grid> */}
                            <Grid item xs={8}>
                                <Typography className={classes.title}>
                                    {column.title}
                                </Typography>
                            </Grid>
                        </Grid>
                        <BoardColumnContent
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {/* All board items belong into specific column. */}
                            {/* {items.map((item: any, index: number) => (
                                        <BoardItem
                                            key={item.taskId}
                                            item={item}
                                            index={index}
                                            columnID={column.sessionId}
                                            departmentId={departmentId}
                                            projectId={projectId}
                                            companyId={companyId}
                                        />
                                    ))} */}
                            {/* {provided.placeholder} */}
                        </BoardColumnContent>
                    </div>
                )}
            </Droppable>
        </>
    );
};

export default Day;

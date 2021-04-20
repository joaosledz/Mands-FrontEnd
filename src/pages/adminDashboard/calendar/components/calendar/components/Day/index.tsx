import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { TypeEvent, TypeDay } from '../../../../models';
import Event from '../event';

import useStyles from './styles';

import { Typography } from '@material-ui/core';

// Define types for board column element properties
type BoardColumnProps = {
    key: string;
    day: TypeDay;
    events: TypeEvent[];
    index: any;
    type?: string;
};

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
    isDraggingOver: boolean;
};

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
    /* min-height: 20px; */
    padding-right: 5px;
    background-color: ${props => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
    /* min-height: 60vh; */
    /* max-height: 61vh; */
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
    const { day, events } = props;

    return (
        <>
            <Droppable droppableId={day.dayId} type="task">
                {(provided, snapshot) => (
                    <div className={classes.container} ref={provided.innerRef}>
                        <Typography className={classes.title}>
                            {day.title}
                        </Typography>
                        <BoardColumnContent
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            className={classes.eventsList}
                        >
                            {events.map((item: TypeEvent, index: number) => (
                                <Event
                                    key={item.eventId}
                                    event={item}
                                    index={index}
                                    dayId={day.dayId}
                                />
                            ))}
                        </BoardColumnContent>
                    </div>
                )}
            </Droppable>
        </>
    );
};

export default Day;

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import useStyles from './styles';

import { TypeEvent } from '../../../../models';
import Typography from '@material-ui/core/Typography';

// Define types for calendar event element properties
type BoardItemProps = {
    index: number;
    dayId: string;
    event: TypeEvent;
};

// Define types for calendar event element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
    isDragging: boolean;
};

// Create style for calendar event element
const BoardItemEl = styled.div<BoardItemStylesProps>`
    position: relative;
    padding: 5px;
    background-color: ${props => (props.isDragging ? '#d3e4ee' : props.color)};
    border-radius: 4px;
    transition: background-color 0.25s ease-out;
    margin-bottom: 7px;

    &:hover {
        background-color: ${props => props.color};
    }
    & + & {
        margin-top: 4px;
    }
`;

// Create and export the Calendar Event component
export const Event = (props: BoardItemProps) => {
    const { event, index /*dayId*/ } = props;
    const classes = useStyles();

    return (
        <>
            <Draggable draggableId={event.eventId} index={index}>
                {(provided, snapshot) => (
                    <BoardItemEl
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        color={event.color}
                    >
                        <Typography variant="body1" className={classes.title}>
                            {event.title}
                        </Typography>
                    </BoardItemEl>
                )}
            </Draggable>
        </>
    );
};

export default Event;

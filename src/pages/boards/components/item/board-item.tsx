import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { EllipsisH as EllipsisIcon } from '@styled-icons/fa-solid';
import { UserAdd as UserAddIcon } from '@styled-icons/heroicons-solid';

import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import useStyles from './styles';

// Define types for board item element properties
type BoardItemProps = {
    index: number;
    item: {
        id: string;
        title: string;
        tag: string;
        tagColor: string;
        members: string[];
    };
};

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
    isDragging: boolean;
};

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
    padding: 8px;
    background-color: ${props => (props.isDragging ? '#d3e4ee' : '#FFFFFF')};
    border-radius: 4px;
    box-shadow: 1px 2px 2px 2px rgba(173, 159, 173, 0.81);
    transition: background-color 0.25s ease-out;
    margin-bottom: 14px;
    &:hover {
        background-color: #f7fafc;
    }

    & + & {
        margin-top: 4px;
    }
`;

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
    const classes = useStyles();

    return (
        <Draggable draggableId={props.item.id} index={props.index}>
            {(provided, snapshot) => (
                <BoardItemEl
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <Grid container spacing={1}>
                        <Grid xs={12} item container justify="space-between">
                            <Grid item xs={11}>
                                <span
                                    style={{
                                        backgroundColor: props.item.tagColor,
                                        color: 'white',
                                        fontSize: '0.8rem',
                                        fontFamily: 'Roboto',
                                        fontWeight: 'lighter',
                                        padding: '1px 10px',
                                        borderRadius: '15px',
                                    }}
                                >
                                    {props.item.tag}
                                </span>
                            </Grid>
                            <Grid item xs={1}>
                                <EllipsisIcon className={classes.iconTask} />
                            </Grid>
                        </Grid>
                        <Grid xs={12} item className={classes.taskTitle}>
                            {props.item.title}
                        </Grid>
                        <Grid
                            xs={12}
                            container
                            item
                            className={classes.members}
                            alignItems="flex-end"
                        >
                            <Grid xs={11} container item>
                                {props.item.members.map(member => (
                                    <Link
                                        className={classes.memberName}
                                        to={'/perfil'}
                                    >
                                        @{member}
                                    </Link>
                                ))}
                            </Grid>
                            <Grid item xs={1}>
                                <UserAddIcon className={classes.iconTask} />
                            </Grid>
                        </Grid>
                    </Grid>
                </BoardItemEl>
            )}
        </Draggable>
    );
};

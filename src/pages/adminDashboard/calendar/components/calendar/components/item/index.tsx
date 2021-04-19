import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { UserAdd as UserAddIcon } from '@styled-icons/heroicons-solid';

import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import Popover from '../popover/itemPopover';

// Define types for board item element properties
type BoardItemProps = {
    index: number;
    columnID: string;
    item: {
        taskId: string;
        title: string;
        description: string;
        tag: {
            tagId: number;
            companyId: number;
            label: string;
            color: string;
        } | null;
        responsible: string[];
        tasks: any;
    };
    departmentId: number;
    projectId: number;
    companyId: number;
};

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
    isDragging: boolean;
};

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
    position: relative;
    padding: 8px;
    background-color: ${props => (props.isDragging ? '#d3e4ee' : '#FFFFFF')};
    border-radius: 4px;
    box-shadow: 1px 2px 2px 2px rgba(173, 159, 173, 0.81);
    transition: background-color 0.25s ease-out;
    margin-top: 7px;
    margin-bottom: 7px;
    &:hover {
        background-color: #f7fafc;
    }
    & + & {
        margin-top: 4px;
    }
`;

// Create and export the BoardItem component
export const Event = (props: BoardItemProps) => {
    const { item, index, columnID, departmentId, projectId, companyId } = props;
    const classes = useStyles();
    //Modal de details e edição
    // const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
    // const handleOpenNewTaskModal = () => {
    //     setShowNewTaskModal(true);
    // };
    // const handleCloseNewTaskModal = () => {
    //     setShowNewTaskModal(false);
    // };

    return (
        <>
            <Draggable draggableId={item.taskId} index={index}>
                {(provided, snapshot) => (
                    <BoardItemEl
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <Grid container spacing={1}>
                            <Grid
                                xs={12}
                                item
                                container
                                justify="space-between"
                            >
                                {item.tag && (
                                    <Grid item xs={11}>
                                        <span
                                            style={{
                                                backgroundColor: item.tag.color,
                                                color: 'white',
                                                fontSize: '0.8rem',
                                                fontFamily: 'Roboto',
                                                fontWeight: 'lighter',
                                                padding: '1px 10px',
                                                borderRadius: '15px',
                                            }}
                                        >
                                            {item.tag.label}
                                        </span>
                                    </Grid>
                                )}
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        position: 'absolute',
                                        right: '5px',
                                        top: '5px',
                                    }}
                                >
                                    {/* {permissions.task && ( */}
                                    <Popover
                                        itemID={item.taskId}
                                        columnID={columnID}
                                        departmentId={departmentId}
                                        projectId={projectId}
                                        companyId={companyId}
                                    />
                                    {/* )} */}
                                </Grid>
                            </Grid>
                            <Grid
                                xs={12}
                                item
                                className={classes.taskTitle}
                                // onClick={handleOpenNewTaskModal}
                            >
                                {item.title}
                            </Grid>
                            {item.responsible && (
                                <Grid
                                    xs={12}
                                    container
                                    item
                                    className={classes.members}
                                    alignItems="flex-end"
                                >
                                    <Grid xs={11} container item>
                                        {item.responsible.map(
                                            (responsible, index) => (
                                                <Link
                                                    key={index}
                                                    className={
                                                        classes.memberName
                                                    }
                                                    to={'/perfil'}
                                                >
                                                    @{responsible}
                                                </Link>
                                            )
                                        )}
                                    </Grid>
                                    <Grid item xs={1}>
                                        <UserAddIcon
                                            className={classes.iconTask}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </BoardItemEl>
                )}
            </Draggable>
            {/* <TaskDetailsModal
                item={item}
                isOpen={showNewTaskModal}
                setIsOpen={setShowNewTaskModal}
                departmentId={departmentId}
                projectId={projectId}
                companyId={companyId}
            /> */}
        </>
    );
};

export default Event;

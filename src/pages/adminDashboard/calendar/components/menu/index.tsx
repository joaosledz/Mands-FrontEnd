import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import UncheckedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckedIcon from '@material-ui/icons/CheckBox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import useStyles from './styles';

import { TypeMenuItem, TypeMenuValues, TypeFilter } from '../../models';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novenbro',
    'Dezembro',
];

type PropTypes = {
    date: moment.Moment;
    departments: Array<TypeMenuItem>;
    projects: Array<TypeMenuItem>;
    company: TypeMenuItem;
    onFilterChange(filter: TypeFilter): void;
    onDateChange(newDate: moment.Moment): void;
};

type TypePopper = {
    open: boolean;
    anchorEl?: EventTarget & HTMLButtonElement;
    type?: string;
};

const Index: React.FC<PropTypes> = ({
    departments,
    projects,
    company,
    onFilterChange,
    date,
    onDateChange,
}) => {
    const classes = useStyles();

    const [popper, setPopper] = useState<TypePopper>({ open: false });
    const [popperData, setPopperData] = useState<string[]>([]);
    const [depSession, setDepSession] = useState(true);
    const [projSession, setProjSession] = useState(true);
    const [listValues, setListValues] = useState<TypeMenuValues | undefined>();

    useEffect(() => {
        const departmentsAux = departments.map(item => ({
            ...item,
            selected: true,
        }));
        const projectsAux = projects.map(item => ({
            ...item,
            selected: true,
        }));
        const companyAux = { ...company, selected: true };

        setListValues({
            departments: departmentsAux,
            projects: projectsAux,
            company: companyAux,
        });
    }, [departments, projects, company]);

    useEffect(() => {
        if (!listValues) return;

        const filteredDeps: number[] = [];
        listValues.departments.forEach(item => {
            if (item.selected) filteredDeps.push(item.id);
        });
        const filteredProjs: number[] = [];
        listValues.projects.forEach(item => {
            if (item.selected) filteredProjs.push(item.id);
        });
        const filteredCompany: number[] = [];
        if (listValues.company.selected)
            filteredCompany.push(listValues.company.id);

        const filter: TypeFilter = {
            filteredDeps,
            filteredProjs,
            filteredCompany,
        };

        onFilterChange(filter);
    }, [listValues, onFilterChange]);

    const handleClick = (type: string, id: number) => {
        if (!listValues) return;
        let aux: any;
        switch (type) {
            case 'department':
                aux = listValues.departments.map(item => ({
                    ...item,
                    selected: item.id === id ? !item.selected : item.selected,
                }));
                setListValues({ ...listValues, departments: aux });
                break;

            case 'project':
                aux = listValues.projects.map(item => ({
                    ...item,
                    selected: item.id === id ? !item.selected : item.selected,
                }));
                setListValues({ ...listValues, projects: aux });
                break;

            case 'company':
                aux = {
                    ...listValues.company,
                    selected: !listValues.company.selected,
                };
                setListValues({ ...listValues, company: aux });
        }
    };

    const handlePopper = (type?: string) => (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (type) {
            switch (type) {
                case 'month': {
                    if (event.currentTarget === popper.anchorEl)
                        setPopper({ open: false });
                    else {
                        setPopperData(months);
                        setPopper({
                            open: true,
                            anchorEl: event.currentTarget,
                            type: type,
                        });
                    }
                    break;
                }
                case 'year': {
                    if (event.currentTarget === popper.anchorEl)
                        setPopper({ open: false });
                    else {
                        const years = [];
                        let currentDate = moment();
                        for (let i = 0; i < 12; i++) {
                            years.push(moment(currentDate).format('YYYY'));
                            currentDate = moment(currentDate).add(1, 'year');
                        }
                        setPopperData(years);
                        setPopper({
                            open: true,
                            anchorEl: event.currentTarget,
                            type: type,
                        });
                    }
                    break;
                }
            }
        }
    };

    const handleDate = (type: string, value: string) => {
        switch (type) {
            case 'month': {
                const newDate = moment(
                    `${parseInt(value) + 1}-1-${date.year()}`
                );
                onDateChange(newDate);
                break;
            }
            case 'year': {
                const newDate = moment(`${date.month() + 1}-1-${value}`);
                onDateChange(newDate);
                break;
            }
        }
        setPopper({ open: false });
    };

    const handleNext = () => {
        const newDate = date.clone();
        newDate.add(1, 'month');
        onDateChange(newDate);
    };

    const handlePrevious = () => {
        const newDate = date.clone();
        newDate.subtract(1, 'month');
        onDateChange(newDate);
    };

    return (
        <Paper className={classes.container}>
            <Popper
                open={popper.open}
                anchorEl={popper.anchorEl}
                placement="bottom-start"
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.popperContainer}>
                            {popperData.map((item, index) => (
                                <Button
                                    key={index}
                                    className={classes.lblHeader}
                                    onClick={() =>
                                        handleDate(
                                            popper.type!,
                                            popper.type === 'month'
                                                ? index.toString()
                                                : item
                                        )
                                    }
                                >
                                    {item}
                                </Button>
                            ))}
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <div className={classes.monthYear}>
                <IconButton
                    color="primary"
                    aria-label="previous"
                    onClick={() => handlePrevious()}
                >
                    <ChevronLeft />
                </IconButton>
                <Button
                    className={classes.lblHeader}
                    onClick={handlePopper('month')}
                >
                    {months[date.month()]}
                </Button>
                <Button
                    className={classes.lblHeader}
                    onClick={handlePopper('year')}
                >
                    {date.year()}
                </Button>
                <IconButton
                    color="primary"
                    aria-label="next"
                    onClick={() => handleNext()}
                >
                    <ChevronRight />
                </IconButton>
            </div>

            <Divider />

            <Typography variant="h6" className={classes.lblHeader}>
                Agendas
            </Typography>
            <List component="nav" aria-labelledby="nested-list-subheader">
                {listValues?.company && (
                    <ListItem
                        key={`c${0}`}
                        dense
                        button
                        onClick={() =>
                            handleClick('company', listValues!.company.id)
                        }
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={listValues!.company.selected}
                                tabIndex={listValues!.company.id}
                                disableRipple
                                inputProps={{
                                    'aria-labelledby': `item-${
                                        listValues!.company.id
                                    }`,
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            id={listValues!.company.id.toString()}
                            primary={listValues!.company.name}
                        />
                    </ListItem>
                )}

                {/* SESSÃO DE DEPARTAMENTOS*/}
                <ListItem button onClick={() => setDepSession(!depSession)}>
                    <ListItemText primary="Departamentos" />
                    {depSession ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={depSession} timeout="auto">
                    <List component="div" disablePadding>
                        {listValues?.departments.map((item, index) => (
                            <ListItem
                                key={index}
                                dense
                                button
                                onClick={() =>
                                    handleClick('department', item.id)
                                }
                            >
                                <ListItemIcon>
                                    {item.selected ? (
                                        <CheckedIcon
                                            style={{ color: item.color }}
                                        />
                                    ) : (
                                        <UncheckedIcon
                                            style={{ color: item.color }}
                                        />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    id={item.id.toString()}
                                    primary={item.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* SESSÃO DE PROJETOS */}
                <ListItem button onClick={() => setProjSession(!projSession)}>
                    <ListItemText primary="Projetos" />
                    {projSession ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={projSession} timeout="auto">
                    <List component="div" disablePadding>
                        {listValues?.projects.map((item, index) => (
                            <ListItem
                                key={index}
                                dense
                                button
                                onClick={() => handleClick('project', item.id)}
                            >
                                <ListItemIcon>
                                    {item.selected ? (
                                        <CheckedIcon
                                            style={{ color: item.color }}
                                        />
                                    ) : (
                                        <UncheckedIcon
                                            style={{ color: item.color }}
                                        />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    id={item.id.toString()}
                                    primary={item.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
        </Paper>
    );
};

export default Index;

import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import useStyles from './styles';

import { TypeMenuItem, TypeMenuValues, TypeFilter } from '../../models';

type PropTypes = {
    departments: Array<TypeMenuItem>;
    projects: Array<TypeMenuItem>;
    company: TypeMenuItem;
    onFilterChange(filter: TypeFilter): void;
};

const Index: React.FC<PropTypes> = ({
    departments,
    projects,
    company,
    onFilterChange,
}) => {
    const classes = useStyles();

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

    return (
        <Paper className={classes.container}>
            <Typography variant="h6" className={classes.lblHeader}>
                Agendas
            </Typography>
            <List component="nav" aria-labelledby="nested-list-subheader">
                {listValues?.company && (
                    <ListItem
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
                                dense
                                button
                                onClick={() =>
                                    handleClick('department', item.id)
                                }
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={item.selected}
                                        tabIndex={index}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': `item-${item.id}`,
                                        }}
                                    />
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
                                dense
                                button
                                onClick={() => handleClick('project', item.id)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={item.selected}
                                        tabIndex={index}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': `item-${item.id}`,
                                        }}
                                    />
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

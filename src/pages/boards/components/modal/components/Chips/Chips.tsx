import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { TypeTeam } from '../../../../../../models/department';
import { AddUser as AddUserIcon } from '@styled-icons/entypo';
import { Groups as TeamIcon } from '@styled-icons/material';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AssignTeamModal from '../../../../../../components/assignTeamModal/assignTeamModal'
import employeesData from '../../../../../../utils/data/employees';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex', 
      justifyContent: 'left',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    icon: {
        color: theme.palette.primary.light,
        borderRadius: '20%',
        marginRight: '4px',
        maxWidth: '28px',
    },    
    addTeamIcon: {
        color: theme.palette.primary.light,
        borderRadius: '20%',
        marginRight: '4px',
        width: '20px',
        height: 'auto',
        display: 'inline-flex',
        '&:hover': {
            backgroundColor: 'rgba(70, 70, 70, 0.2)',
            cursor: 'pointer',
        },
    }, 
    subtitle: {
        display: 'flex',
        alignSelf: 'begin',
        color: theme.palette.primary.light,
        fontWeight: 'lighter',
        fontSize: '0.8rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
    },
  }),
);

type Props = {
    teamData: Array<TypeTeam>;
    setTeamData: any;
};

const ChipsList: React.FC<Props> = (props: Props) => {
    const {teamData} = props
    const history = useHistory();
  const classes = useStyles();
  const [allEmployees, setAllEmpolyees] = useState(employeesData);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
//   const [editable, setEditable] = useState<boolean>(false);
  const handleAssignTeamModal= () =>{
    setShowTeamModal(true)
}
  const handleDelete = (index: number) => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Grid container item xs={12}>
    <Grid xs={1}>
        <TeamIcon className={classes.icon}/>
    </Grid>
    <Grid xs={11} component={Typography} className={classes.subtitle}>
            Responsáveis
    </Grid>
    <div className={classes.root}>
         {teamData.map((employee, index) => (              
      <Chip
        avatar={<Avatar alt={employee.name} src={employee.image} />}
        label={employee.name.split(' ', 1)}
        onClick={() => history.push('/perfil')}
        onDelete={()=>handleDelete(index)}
      />
                        ))}
    </div>
        
        <Box className={classes.addTeamIcon}>
            <AddUserIcon  onClick={handleAssignTeamModal} size={20}/>
        </Box>   
         
            <AssignTeamModal
                    teamData={teamData}
                    allEmployees={allEmployees}
                    isOpen={showTeamModal}
                    setIsOpen={setShowTeamModal}
                />
</Grid>
    
  );
}

export default ChipsList;

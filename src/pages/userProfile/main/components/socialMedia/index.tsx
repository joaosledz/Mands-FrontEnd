import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles';
import Typography from '@material-ui/core/Typography';
import GithubIcon from '../../../../../assets/socialMedia/Github.png';
import LinkedinIcon from '../../../../../assets/socialMedia/Linkedin.png';

// import { Container } from './styles';

const SocialMedia: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid container>
            {/* Usar um Map */}
            <a
                className={classes.socialMediaDiv}
                href="https://github.com/anatartari"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Grid container item alignItems="center">
                    <Avatar className={classes.smallAvatar} src={GithubIcon} />
                    <Typography className={classes.socialMedia}>
                        Github
                    </Typography>
                </Grid>
            </a>
            <a
                className={classes.socialMediaDiv}
                href="https://www.linkedin.com/in/jo%C3%A3o-victor-sledz-de-bulh%C3%B5es-ba08b073/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Grid container item alignItems="center">
                    <Avatar
                        className={classes.smallAvatar}
                        src={LinkedinIcon}
                    />
                    <Typography className={classes.socialMedia}>
                        Linkedin
                    </Typography>
                </Grid>
            </a>
        </Grid>
    );
};

export default SocialMedia;

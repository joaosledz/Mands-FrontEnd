import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles';
import Typography from '@material-ui/core/Typography';
import { Github as GithubIcon } from '@styled-icons/boxicons-logos';
import { LinkedinSquare as LinkedinIcon } from '@styled-icons/boxicons-logos';

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
                <Grid
                    className={classes.socialMediaGrid}
                    container
                    item
                    alignItems="center"
                >
                    <GithubIcon className={classes.smallAvatar} />
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
                <Grid
                    className={classes.socialMediaGrid}
                    container
                    item
                    alignItems="center"
                >
                    <LinkedinIcon className={classes.smallAvatar} />
                    <Typography className={classes.socialMedia}>
                        Linkedin
                    </Typography>
                </Grid>
            </a>
        </Grid>
    );
};

export default SocialMedia;

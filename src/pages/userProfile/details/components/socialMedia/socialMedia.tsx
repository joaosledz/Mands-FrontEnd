import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Github as GithubIcon } from '@styled-icons/boxicons-logos';
import { LinkedinSquare as LinkedinIcon } from '@styled-icons/boxicons-logos';

import useStyles from './styles';

const SocialMedia: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid container>
            {/* Usar um Map */}
            <Link
                className={classes.socialMediaDiv}
                to="https://github.com/anatartari"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Grid
                    className={classes.socialMediaGrid}
                    container
                    item
                    alignItems="center"
                >
                    <GithubIcon size={50} />
                    <Typography>Github</Typography>
                </Grid>
            </Link>
            <Link
                className={classes.socialMediaDiv}
                to="https://www.linkedin.com/in/jo%C3%A3o-victor-sledz-de-bulh%C3%B5es-ba08b073/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Grid
                    className={classes.socialMediaGrid}
                    container
                    item
                    alignItems="center"
                >
                    <LinkedinIcon size={50} />
                    <Typography className={classes.socialMedia}>
                        Linkedin
                    </Typography>
                </Grid>
            </Link>
        </Grid>
    );
};

export default SocialMedia;

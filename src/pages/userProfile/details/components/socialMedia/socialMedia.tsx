import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Github as GithubIcon } from '@styled-icons/boxicons-logos';
import { LinkedinSquare as LinkedinIcon } from '@styled-icons/boxicons-logos';

import useStyles from './styles';

type Props = {
    linkedin: string;
    github: string;
};

const SocialMedia: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { github, linkedin } = props;
    return (
        <Grid container>
            {/* Usar um Map */}
            <a
                className={
                    github
                        ? [classes.socialMediaDiv, classes.fillSocialIcon].join(
                              ' '
                          )
                        : [classes.socialMediaDiv, classes.graySocialIcon].join(
                              ' '
                          )
                }
                href={github}
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
            </a>
            <a
                className={
                    linkedin
                        ? [classes.socialMediaDiv, classes.fillSocialIcon].join(
                              ' '
                          )
                        : [classes.socialMediaDiv, classes.graySocialIcon].join(
                              ' '
                          )
                }
                href={linkedin}
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
            </a>
        </Grid>
    );
};

export default SocialMedia;

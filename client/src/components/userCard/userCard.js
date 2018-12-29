import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    main: {
        width: '100%',
        display: 'block', // Fix IE 11 issue.
      },
  card: {
    maxWidth: 345,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    // objectFit: 'cover',
    borderRadius: '50%',
    height: 276,
  },
  cardActionCenter: {
      justifyContent: 'center'
  },
});

function ImgMediaCard(props) {
  const { classes } = props;
  return (
      <div className={classes.main}>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image={ props.user.avatar_url }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          { props.user.login }
          </Typography>
          <Typography component="p">
            Score: { props.user.score }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActionCenter}>
          <a href={ props.user.html_url } target="_blank" rel="noopener noreferrer">
            <Button size="small" color="primary">
                Visit profile
            </Button>
          </a>
      </CardActions>
    </Card>
    </div>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
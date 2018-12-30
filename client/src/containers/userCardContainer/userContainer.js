import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserCard from '../../components/userCard/userCard.js';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';


const styles = theme => ({
    main: {
        width: '100%',
        display: 'block', // Fix IE 11 issue.
        padding: '80px 0',
      },
      center: {
        textAlign: 'center',
        paddingTop: '34vh',
      }
});

function UserCardContainer(props) {
  const { classes } = props;
  console.log('props from userContainer', props)
  return (
    <div className={classes.main}>
        {
            (props.result && props.result.isSearching) ? (
                <div className={classes.center}>
                    <CircularProgress disableShrink/>
                </div>
            ) : (
                (props.result && props.result.users && props.result.users.length) ? (
                    props.result.users.map((user, index) => {
                        // eslint-disable-next-line no-unused-expressions
                        return <UserCard user={ user } key={ index }/>
                    })
                ): (
                    <Typography className={classes.center} variant="h2" color="inherit">
                        Try searching for some user!
                    </Typography>
                ) 
            )
        }
    </div>
  );
}

UserCardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCardContainer);
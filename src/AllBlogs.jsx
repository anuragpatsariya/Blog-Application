import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
//import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Image from 'material-ui-image';

const styles = theme => ({
  card: {
    maxWidth: 1000
  },
  media: {
    height: 10,
    paddingTop: '25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class AllBlogs extends React.Component{
  state = {
    all_blogs: [],
    expanded: false
  };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentDidMount() {
    axios.get('/all_blogs')
    .then(res => {
      const all_blogs = res.data;
      this.setState({ all_blogs });
      console.log(all_blogs);
      for(var i=0;i<all_blogs.length;i++){
        console.log(all_blogs[i].name);
        console.log(all_blogs[i].title);
        console.log(all_blogs[i].category);
        console.log(all_blogs[i].filename);
        console.log(all_blogs[i].content);
        console.log(all_blogs[i].created_at);
      }
    })
    .catch(err => console.log(err))
  }
  render(){
    const { classes } = this.props;
    return(
          <div>
            { this.state.all_blogs.map(
              (blog, index) => <div key={index}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      BA
                    </Avatar>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={blog.title}
                  subheader={"Created At: "+blog.created_at}
                  />
                <CardMedia
                  className={classes.media}
                  image={"/server/uploaded_images/"+blog.filename}
                  title={blog.title}
                  />
                <CardContent>
                  <Typography paragraph variant="body2">
                    Author : {blog.name} 
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                    >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph variant="body2">
                      Content:
                    </Typography>
                    <Typography paragraph>
                      {blog.content}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          )
        }</div>
  )
}
}
//export default AllBlogs;
AllBlogs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllBlogs);

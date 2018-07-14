import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

function getModalStyle() {
  const top = 30;
  const left = 35;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 5,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dropDown: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 700,
  }
});

class WriteBlogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name:'',title:'',category:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);

  }
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });}

    render() {
      const { classes } = this.props;

      return (
        <form className={classes.container} noValidate autoComplete="off">
          <div>
            <Typography gutterBottom>Start Writing your Blog here</Typography>
            <Button onClick={this.handleOpen}>Open Modal</Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
              >
              <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="title" id="modal-title">
                  Don't wait, Start Writing..
                </Typography>
                <TextField
                  id="name"
                  label="Name"
                  name = "name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange}
                  margin="normal"
                  />

                <TextField
                  id="title"
                  label="Title"
                  name = "title"
                  className={classes.textField}
                  value={this.state.title}
                  onChange={this.handleChange}
                  margin="normal"
                  />

                <InputLabel htmlFor="age-simple">Category</InputLabel>
                <Select
                  className={classes.dropDown}
                  value={this.state.category}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'cateogry',
                    id: 'category-simple',
                  }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'it'}>Information Technology</MenuItem>
                  <MenuItem value={'hardware'}>Computer Hardwares</MenuItem>
                  <MenuItem value={'software'}>Computer Software</MenuItem>
                  <MenuItem value={'ai'}>Artificial Intelligence</MenuItem>
                  <MenuItem value={'others'}>Others..</MenuItem>
                </Select>
                
                <input
                  accept="image/*"
                  className={classes.input}
                  id="raised-button-file"
                  multiple
                  type="file"
                  />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" color="default" className={classes.button}>
                    Upload
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                </label>
                <TextField
                  id="content"
                  label="Write your content here.."
                  multiline
                  rows="10"
                  column="4"
                  name = "content"
                  className={classes.textArea}
                  value={this.state.content}
                  onChange={this.handleChange}
                  margin="normal"
                  />
                <Button variant="contained" className={classes.button}>
                  Post it Now!
                </Button>
              </div>
            </Modal>
          </div>
        </form>
      );
    }
  }

  WriteBlogModal.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  // We need an intermediary variable for handling the recursive nesting.
  const WriteBlogModalWrapper = withStyles(styles)(WriteBlogModal);

  export default WriteBlogModalWrapper;

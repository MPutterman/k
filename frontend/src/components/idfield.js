// TODO: Create an AutoForm component that allows either:
// - typing in the ID
// - selecting an existing record (open search/filter select box)
// - creating a new record
// NOTE: this is designed for image_id, equip_id, org_id, plate_id, cover_id...

import React from 'react';
import { HTMLFieldProps, connectField } from 'uniforms';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ImageSelect from '../components/image_search'; // renaming component
import UserSelect from '../components/user_search'; // renaming component
import ImageEdit from '../components/image_edit'; // renaming component
import UserEdit from '../components/user_edit'; // renaming component


export type IDInputFieldProps = HTMLFieldProps<string, HTMLDivElement>;

function IDInput({ name, onChange, value, label, ref, ...props }: IDInputFieldProps) {

  const [openSelect, setOpenSelect] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);

  const onCloseSelect = (value) => {
    console.log('closed select dialog, value=', value);
  }

  const onCloseCreate = (value) => {
    console.log('closed create dialog, value=', value);
  }

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };


  const onOKSelect = () => {
    setOpenSelect(false);
    onChange('OK select');
  };

  const onCancelSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const onOKCreate = () => {
    setOpenCreate(false);
    onChange('OK Create');
  };

  const onCancelCreate = () => {
    setOpenCreate(false);
  };


  const CreateForm = (props) => {
    var component = '';
    switch (props.objectType) {
      case 'user':
        component = '<UserEdit new={true} />';
        break;
      case 'image':
        component = '<ImageEdit new={true} />';
        break;
      default:
        break;
    }

    // TODO: need to get this to be dynamically generated by objectType
    return (
      <ImageEdit new={true}/>
    );
  }

  const SelectForm = (props) => {
    var component = '';
    switch (props.objectType) {
      case 'user':
        component = '<UserSelect />';
        break;
      case 'image':
        component = '<ImageSelect />';
        break;
      default:
        break;
    }

    // TODO: need to get this to be dynamically generated by objectType
    return (
      <ImageSelect />
    );
  }


  return (
    <div className="IDInputField">
      <TextField
        id={name}
        value={value}
/*
        onChange={({ target: { files } }) => {
          if (files && files[0]) {
            setFilename(files[0].name);
            if (props.setFilename) {
              props.setFilename(files[0].name);
            }
            onChange(new Blob([files[0]],{type: 'image/png',})); //URL.createObjectURL(files[0]));
          }
        }}
        style={{ display: 'none' }}
*/
      />
      <label htmlFor={name}>
        <div>{label}</div>
        <span>

{/*
            <TextField disabled value={filename ? filename : 'No file chosen'} />
*/}
            <Button variant='contained' /*component='span'*/ onClick={handleOpenSelect}>
              {props.selectLabel ? (
                <span>{props.selectLabel}</span>
              ) : (
                <span>Choose</span>
              )}
            </Button>
            <Button variant='contained' /*component='span'*/ onClick={handleOpenCreate}>
              {props.createLabel ? (
                <span>{props.createLabel}</span>
              ) : (
                <span>Create</span>
              )}
            </Button>
        </span>
      </label>
      

      <Dialog fullWidth open={openSelect} onClose={handleCloseSelect} >
        <DialogTitle id="dialog-select">Select an existing item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <SelectForm/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCancelSelect} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={onOKSelect} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth open={openCreate} onClose={handleCloseCreate} >
        <DialogTitle id="dialog-select">Create a new item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CreateForm />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCancelCreate} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={onOKCreate} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>


    </div>

  );
}

export default connectField(IDInput); 
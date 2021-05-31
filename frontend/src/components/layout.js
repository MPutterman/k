// TODO:
// * Should profile link to the profile edit page, or just a page to view?
// * Currently when open menu, the AppBar squeezes... but not the main part of the screen. Any way to easily change that?

import React from 'react';
import clsx from 'clsx';
import { useHistory, useLocation, Link, NavLink} from "react-router-dom";

// Import authentication
import { authLogin, authLogout, useAuthState, useAuthDispatch } from '../contexts/auth';

// Import Material UI components for app bar and drawer
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

// Import icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';


const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openUserMenu, setOpenUserMenu] = React.useState(false);
  const [anchorE1, setAnchorE1] = React.useState(null);

  const history = useHistory();

  const location = useLocation();

  // Connect to Auth context
  const dispatch = useAuthDispatch();
  const session = useAuthState();

  // Event handlers

  const handleOpenUserMenu = (event) => {
    setAnchorE1(event.currentTarget);
    setOpenUserMenu(true);
  };

  const handleUserAccount = (event) => {
    handleCloseUserMenu(event);
    history.push('/user/edit/' + session['authUser']['user_id']); 
  }

  async function handleUserLogout(event) {
    handleCloseUserMenu(event);
    let response = await authLogout(dispatch); 
    history.push('/user/login');
  }

  async function handleUserLogin() {
    history.push('/user/login');
  }

  const handleCloseUserMenu = (event) => {
    setAnchorE1(event.currentTarget);
    setOpenUserMenu(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };


  return (

      <>
      <AppBar style={{height: '5vh', topMargin: '0'}} position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: openDrawer, })} >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {location.pathname}
          </Typography>
          {session['auth'] ? (
            <div>
              {session['authUser']['first_name']} {session['authUser']['last_name']}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-user"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-user"
                anchore1={anchorE1}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openUserMenu}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleUserAccount}>My account</MenuItem>
                <MenuItem onClick={handleUserLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button variant='outlined' onClick={handleUserLogin}>Log in</Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {/*
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            */}
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List >
          <ListItem button key={'home'}>
            <NavLink to={'/'} className="nav-link">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText button style={{textDecoration: 'none',}} primary={'Home'} />
            </NavLink>
          </ListItem>
          <ListItem button key={'new analysis'}>
            <NavLink to={'/analysis/new'} className="nav-link">
                        <ListItemIcon><AddIcon /></ListItemIcon>
                      <ListItemText primary={'New Analysis'} />
            </NavLink>
            </ListItem>
          <ListItem button key={'Search Database'}>
            <NavLink to={'/analysis/search'} className="nav-link">
                        <ListItemIcon><AddIcon /></ListItemIcon>
                      <ListItemText primary={'Search Database'} />
            </NavLink>
          </ListItem>
          <ListItem button key={'load analysis'}>
            <NavLink to={'/analysis/load'} className="nav-link">
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary={'Load Analysis'} />
            </NavLink>
          </ListItem>

          <ListItem button key={'user search'}>
            <NavLink to={'/user/search'} className="nav-link">
              <ListItemText primary={'Search Users'} />
            </NavLink>
          </ListItem>

          <ListItem button key={'about'}>
            <NavLink to={'/about'} className="nav-link">
              <ListItemText secondary={'About'} />
            </NavLink>
          </ListItem>

        </List>
      </Drawer>
 
      <div style={{'margin-top': '5vh'}} className={clsx(classes.content, {[classes.contentShift]: openDrawer, })} >

        {/* Logo */}
        <div>
            <img 
              style={{width: '10%', height: '10%', }}
              src={process.env.PUBLIC_URL + "/logo_UCLA_blue_boxed.png"}
              alt='logo'
            />
            <h1>van Dam Lab - Radio-TLC Analyzer</h1>
            <h2>Semi-automated computation of lane composition and RF values</h2>
            <br />
        </div>
        <div>
            {props.children}
        </div>
      

      </div>
      </>
  );
}

export default Layout;
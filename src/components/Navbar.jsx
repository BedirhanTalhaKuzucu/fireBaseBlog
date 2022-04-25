import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu } from '@mui/material/';
import cw from "../assets/cw.jpeg"
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from 'react';
import { logOut } from "../helpers/firebase";


export default function MenuAppBar() {
  const menuLogIn = ["Profile", "New", "Logout"];
  const menuLogOut = ["Login", "Register"]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    if (`/${e.target.innerText.toLowerCase()}` === "/logout") {
      logOut()
    }else if(`/${e.target.innerText.toLowerCase()}` === "/new" ){
      navigate(`/new-blog`);
    } 
    else {
      navigate(`/${e.target.innerText.toLowerCase()}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: "0" }}  >
      <AppBar position="static" >
        <Toolbar className="appBar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => { navigate("/") }}
          >
            <img src={cw} alt="clarusway" style={{ width: "2rem" }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
            <div onClick={() => { navigate("/") }} className="middle-logo">
              ──── <span className="blog" >&lt;BTK/&gt;</span> Blog ────
            </div>
          </Typography>

          <div>
            {currentUser ? currentUser.displayName : "UserName"}  
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {
                currentUser ?
                  menuLogIn.map((item, index) =>
                    < MenuItem key={index} onClick={(e) => { handleClose(e) }}>{item}</MenuItem>
                  )
                  :
                  menuLogOut.map((item, index) =>
                    < MenuItem key={index} onClick={(e) => { handleClose(e) }}>{item}</MenuItem>
                  )
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
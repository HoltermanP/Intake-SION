'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Engineering as EngineeringIcon,
  Calculate as CalculateIcon,
  List as ListIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useMsal } from '@azure/msal-react';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { instance, accounts } = useMsal();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    instance.logoutRedirect();
    handleProfileMenuClose();
  };

  const handleNavigation = (path: string) => {
    if (path === '/projects' && (pathname.includes('/d2') || pathname.includes('/electrical'))) {
      // If we're on D2 or Electrical page, go to projects list
      router.push('/projects');
    } else {
      router.push(path);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/', tooltip: 'Ga naar de startpagina' },
    { text: 'Projecten', icon: <ListIcon />, path: '/projects', tooltip: 'Bekijk alle projecten' },
    { text: 'Nieuw Project', icon: <AssignmentIcon />, path: '/projects/new', tooltip: 'Maak een nieuw project aan' },
    { text: 'D2 Formulier', icon: <EngineeringIcon />, path: '/projects', tooltip: 'Ga naar projecten om een D2 formulier te openen' },
    { text: 'Elektrisch Berekenen', icon: <CalculateIcon />, path: '/projects', tooltip: 'Ga naar projecten om elektrische berekeningen te openen' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Intakeformulier App
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Tooltip title={item.tooltip} placement="right">
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => {
                  handleNavigation(item.path);
                  if (isMobile) {
                    setMobileOpen(false);
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === pathname)?.text || 'Intakeformulier'}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {accounts.length > 0 ? (
              <Avatar sx={{ width: 32, height: 32 }}>
                {accounts[0].name?.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <AccountCircleIcon />
            )}
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Uitloggen</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

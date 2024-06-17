import React, { useState, useContext } from 'react';
import { Box, IconButton, Grid, useTheme } from "@mui/material";

import { ColorModeContext, tokens } from "../../theme";
import './dashboard.css'

import InsightsIcon from '@mui/icons-material/Insights';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanIcon from '@mui/icons-material/Lan';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import Header from "../../components/Header";
import StatBox from "../../components/StatBox";


import { StatusBoards } from '../../components/DashBoards/statusBoards';
import { SettingBoards } from '../../components/DashBoards/settingBoard';
import { ScheduleBoards } from '../../components/DashBoards/scheduleBoard';
import { ShareBoards } from '../../components/DashBoards/shareBoard';
import Sidebar from '../global/Sidebar';

let mobileScreenDetect = false

const Dashboard = () => {

  const [isSidebar, setIsSidebar] = useState(!mobileScreenDetect);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [submenuId, setSubmenuId] = useState(1);

  const subMenuClicked = (menuId) => {
    setSubmenuId(menuId);
    setIsSidebar(true);
  }

  return (
    <main className='content' style={{ display: 'flex' }}>
      {isSidebar && <Sidebar isSidebar={isSidebar} />}
      <Box flexGrow={1}>
        <Box m="20px">
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display={'flex'} alignItems={'center'}>
              {mobileScreenDetect &&
                < DarkModeOutlinedIcon className='mx-2' />
              }

            <Header title="Device 1" subtitle="Welcome to this device dashboard" />
            </Box>

            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
          {/* Grid & SubMenus */}
          <Grid container spacing={2} marginBottom={2}>
            <Grid item md={3} sm={6} xs={12}>
              <Box
                onClick={() => { subMenuClicked(1) }}
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingY={2}
                sx={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px' }}
              >
                <StatBox
                  isSelected={submenuId === 1}
                  title="Status"
                  subtitle=""
                  progress="0.75"
                  increase=""
                  icon={
                    <InsightsIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <Box
                onClick={() => { subMenuClicked(2) }}
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingY={2}
                sx={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px' }}
              >
                <StatBox
                  isSelected={submenuId === 2}
                  title="Setting"
                  subtitle=""
                  progress="0.50"
                  increase=""
                  icon={
                    <SettingsSuggestIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <Box
                onClick={() => { subMenuClicked(3) }}
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingY={2}
                sx={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px' }}
              >
                <StatBox
                  isSelected={submenuId === 3}
                  title="Schedule"
                  subtitle=""
                  progress="0.30"
                  increase=""
                  icon={
                    <CalendarMonthIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <Box
                onClick={() => { subMenuClicked(4) }}
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingY={2}
                sx={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px' }}
              >
                <StatBox
                  isSelected={submenuId === 4}
                  title="Share Device"
                  subtitle=""
                  progress="0.80"
                  increase=""
                  icon={
                    <LanIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Grid>
          </Grid>
          {submenuId === 1 && <StatusBoards />}
          {submenuId === 2 && <SettingBoards />}
          {submenuId === 3 && <ScheduleBoards />}
          {submenuId === 4 && <ShareBoards />}

          {/* GRID & CHARTS */}

          {/* ------------------------------------------------------ */}

        </Box>
      </Box>
    </main>

  );
};

export default Dashboard;

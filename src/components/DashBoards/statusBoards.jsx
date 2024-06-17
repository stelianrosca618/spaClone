import React, { useState } from 'react';
import { useTheme, styled, Box, Typography, Switch, FormControlLabel, Grid } from "@mui/material";

import { tokens } from "../../theme";
import GaugeComponent from 'react-gauge-component'

import { HeatDev } from '../DeviceComponents/heatDev';
import { SolarPanel } from '../DeviceComponents/solarPanel';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 64,
  height: 34,
  padding: 0,
  borderRadius: '16px',
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(26px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M15,16.372a7.5,7.5,0,1,0-6,0V18h6ZM14.3,9.6l-3,4a1,1,0,1,1-1.6-1.2L11.5,10h-1a1,1,0,0,1-.832-1.555l2-3a1,1,0,0,1,1.664,1.11L12.369,8H13.5a1,1,0,0,1,.8,1.6ZM9,20h6v1a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1Z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#8796A5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 56 56"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M 30.1328 .8711 C 24.1328 .8711 19.2577 3.0742 16.0937 6.8477 L 42.0624 32.8399 C 44.4062 29.3242 48.1328 25.4336 48.1328 18.6602 C 48.1328 7.9961 40.9374 .8711 30.1328 .8711 Z M 47.4531 47.3477 C 48.2031 48.0742 49.3045 48.0508 50.0077 47.3477 C 50.7109 46.6445 50.7344 45.4961 50.0077 44.7930 L 8.5233 3.2617 C 7.7968 2.5586 6.6249 2.5821 5.9453 3.2617 C 5.2656 3.9648 5.2890 5.1602 5.9453 5.8164 Z M 21.6484 43.1524 L 36.4374 43.1524 C 36.8593 43.1524 37.1171 42.9180 37.1171 42.4961 L 37.1171 40.9727 L 12.3906 16.2227 C 12.2031 16.9727 12.1328 17.7930 12.1328 18.6602 C 12.1328 28.7852 20.3593 32.4414 20.3593 38.1133 L 20.3593 41.8633 C 20.3593 42.6602 20.8515 43.1524 21.6484 43.1524 Z M 22.5155 49.4805 L 37.7499 49.4805 C 38.9453 49.4805 39.9062 48.4961 39.9062 47.2774 C 39.9062 46.0586 38.9453 45.0742 37.7499 45.0742 L 22.5155 45.0742 C 21.3202 45.0742 20.3593 46.0586 20.3593 47.2774 C 20.3593 48.4961 21.3202 49.4805 22.5155 49.4805 Z M 30.1328 55.1289 C 33.3671 55.1289 35.6406 53.6524 35.8749 51.3789 L 24.3906 51.3789 C 24.5780 53.6524 26.8749 55.1289 30.1328 55.1289 Z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
const DevOnOffSwitch = styled(Switch)(({ theme }) => ({
  width: 64,
  height: 34,
  padding: 0,
  borderRadius: '16px',
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(26px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 32 32"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M16 10.75c-2.899 0-5.25 2.351-5.25 5.25s2.351 5.25 5.25 5.25c2.899 0 5.25-2.351 5.25-5.25v0c-0.004-2.898-2.352-5.246-5.25-5.25h-0zM16 18.75c-1.519 0-2.75-1.231-2.75-2.75s1.231-2.75 2.75-2.75c1.519 0 2.75 1.231 2.75 2.75v0c-0.002 1.518-1.232 2.748-2.75 2.75h-0zM16 9.25c0.69 0 1.25-0.56 1.25-1.25v0-1c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 1c0 0.69 0.56 1.25 1.25 1.25v0zM16 22.75c-0.69 0-1.25 0.56-1.25 1.25v1c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-1c-0-0.69-0.56-1.25-1.25-1.25h-0zM9.25 16c0-0.69-0.56-1.25-1.25-1.25v0h-1c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h1c0.69 0 1.25-0.56 1.25-1.25v0zM25 14.75h-1c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h1c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM9.459 11.227c0.226 0.226 0.539 0.366 0.884 0.366 0.69 0 1.25-0.56 1.25-1.25 0-0.345-0.14-0.658-0.366-0.884v0l-0.707-0.707c-0.226-0.226-0.539-0.366-0.884-0.366-0.69 0-1.25 0.56-1.25 1.25 0 0.345 0.14 0.658 0.366 0.884v0zM22.541 20.771c-0.226-0.225-0.538-0.364-0.882-0.364-0.691 0-1.251 0.56-1.251 1.251 0 0.344 0.139 0.656 0.364 0.882l0.707 0.707c0.226 0.226 0.539 0.366 0.884 0.366 0.691 0 1.251-0.56 1.251-1.251 0-0.345-0.14-0.658-0.366-0.884l0 0zM9.459 20.771l-0.707 0.707c-0.225 0.226-0.364 0.538-0.364 0.882 0 0.691 0.56 1.251 1.251 1.251 0.344 0 0.655-0.139 0.881-0.363l0.707-0.707c0.227-0.226 0.367-0.539 0.367-0.885 0-0.691-0.56-1.251-1.251-1.251-0.345 0-0.658 0.14-0.884 0.366v0zM21.656 11.593c0.001 0 0.001 0 0.002 0 0.345 0 0.657-0.14 0.883-0.366l0.707-0.707c0.224-0.226 0.363-0.537 0.363-0.881 0-0.691-0.56-1.251-1.251-1.251-0.344 0-0.656 0.139-0.882 0.364l-0.707 0.707c-0.226 0.226-0.366 0.539-0.366 0.884 0 0.69 0.56 1.25 1.25 1.25 0 0 0.001 0 0.001 0h-0z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#8796A5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="5 5 500 500"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M245,0C109.5,0,0,109.5,0,245s109.5,245,245,245s245-109.5,245-245S380.5,0,245,0z M40.7,245 c0-105.6,80.6-192.8,183.5-203.3v406.6C121.3,437.8,40.7,350.6,40.7,245z M265.9,448.3V41.7C368.7,52.2,449.3,139.4,449.3,245 S368.7,437.8,265.9,448.3z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}))

export const StatusBoards = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [heatOn, setHeatOn] = useState(true);
  const [devOn, setDevOn] = useState(true);

  return (
    <>
      <Box flexWrap={'wrap'} gap="20px" marginY={2}>
        <Box
          width={'100%'}
          backgroundColor={colors.primary[400]}
          padding={5}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          height={{ height: 'fit-content' }}>
          <Box textAlign={'center'}>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} checked={heatOn} onChange={(e) => { setHeatOn(!heatOn) }} />}
              label=""
            />
            <HeatDev isOn={heatOn} />
          </Box>
          <div className='heat-connect'>
            <hr />
            {heatOn &&
              <>
                <span className='heat-cirl'></span>
                <span className='heat-cirl cirl1'></span>
                <span className='heat-cirl cirl2'></span>
                <span className='heat-cirl cirl3'></span>
                <span className='heat-cirl cirl4'></span>
                <span className='heat-cirl cirl5'></span>
                <span className='heat-cirl cirl6'></span>
                <span className='heat-cirl cirl7'></span>
                <span className='heat-cirl cirl8'></span>
                <span className='heat-cirl cirl9'></span>
                <span className='heat-cirl cirl10'></span>
                <span className='heat-cirl cirl11'></span>
                <span className='heat-cirl cirl12'></span>
              </>

            }

          </div>

          <Box>
            <div className="bowl mx-auto">
              <div className="inner">
                <div className="fill">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xmlSpace="preserve">
                    <path className="waveShape" d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z" />
                  </svg>
                </div>
                <h1 className='inner-text'>40ºC</h1>
              </div>
            </div>
          </Box>
          <div className='solor-connect'>
            <hr />
            {devOn &&
              <>
                <span className='solor-cirl'></span>
                <span className='solor-cirl cirl1'></span>
                <span className='solor-cirl cirl2'></span>
                <span className='solor-cirl cirl3'></span>
                <span className='solor-cirl cirl4'></span>
                <span className='solor-cirl cirl5'></span>
                <span className='solor-cirl cirl6'></span>
                <span className='solor-cirl cirl7'></span>
                <span className='solor-cirl cirl8'></span>
                <span className='solor-cirl cirl9'></span>
                <span className='solor-cirl cirl10'></span>
                <span className='solor-cirl cirl11'></span>
                <span className='solor-cirl cirl12'></span>
              </>

            }

          </div>

          <Box textAlign={'center'}>
            <FormControlLabel
              control={<DevOnOffSwitch sx={{ m: 1 }} checked={devOn} onChange={(e) => { setDevOn(!devOn) }} />}
              label=""
            />
            <SolarPanel isOn={devOn} />
          </Box>
        </Box>
      </Box >
      {/* GRID & CHARTS */}
      <Box>
        <Grid container spacing={3}>
          <Grid item md="8" xs="12">
            <Box
              backgroundColor={colors.primary[400]}
              height={{ height: 'fit-content' }}
            >
              <GaugeComponent
                type="semicircle"
                arc={{
                  width: 0.1,
                  padding: 0.01,
                  cornerRadius: 10,
                  // gradient: true,
                  subArcs: [
                    {
                      limit: 20,
                      color: '#EA4228',
                      showTick: true,
                      tooltip: {
                        text: 'Too low temperature!'
                      },
                      onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                      onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                      onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                    },
                    {
                      limit: 60,
                      color: '#F5CD19',
                      showTick: true,
                      tooltip: {
                        text: 'Low temperature!'
                      }
                    },
                    {
                      color: '#EA4228',
                      tooltip: {
                        text: 'Too high temperature!'
                      }
                    }
                  ]
                }}
                pointer={{
                  color: '#345243',
                  length: 0.80,
                  width: 15,
                  // elastic: true,
                }}

                value={50}
                minValue={0}
                maxValue={100}
              />
            </Box>
          </Grid>
          <Grid item md="4" xs="12">
            <Box
              backgroundColor={colors.primary[400]}
              padding={5}
              sx={{ height: '100%' }}
            >
              <Box margin={2} display={'flex'} justifyContent={'space-between'} alignItems={'end'}
                sx={{ borderBottom: '3px solid', paddingBottom: '10px' }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.grey[100] }}
                >
                  Today
                </Typography>
                <Typography
                  variant='h1'
                  fontWeight='bold'
                  sx={{ color: colors.grey[100] }}
                >
                  35 kwh
                </Typography>
              </Box>
              <Box margin={2} display={'flex'} justifyContent={'space-between'} alignItems={'end'}
                sx={{ borderBottom: '3px solid', paddingBottom: '10px' }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.grey[100] }}
                >
                  Saved
                </Typography>
                <Typography
                  variant='h1'
                  fontWeight='bold'
                  sx={{ color: colors.grey[100] }}
                >
                  35 €
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </>
  )
}
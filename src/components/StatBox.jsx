import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const StatBox = ({ title, subtitle, icon, progress, increase, isSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" sx={{ cursor: 'pointer' }}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
        </Box>
        <Box>
          {/* <ProgressCircle progress={progress} /> */}
          {isSelected && <RadioButtonCheckedIcon fontSize="large" />}
          {!isSelected && <PanoramaFishEyeIcon fontSize="large" color="info" />}
          {/* <RadioButtonCheckedIcon fontSize="large" /> */}
        </Box>

      </Box>
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
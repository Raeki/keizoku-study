import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel({ value, avgMinutes, goal }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' value={value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          avgMinutes
        )}/${goal} minutes/day`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function GoalBar({ avgMinutes, goal }) {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress((avgMinutes / goal) * 100);
  }, [avgMinutes, goal]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel
        value={progress > 100 ? 100 : progress}
        avgMinutes={avgMinutes}
        goal={goal}
      />
    </Box>
  );
}

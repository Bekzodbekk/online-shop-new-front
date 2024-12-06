import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SettingsIcon from '@mui/icons-material/Settings';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete from '@mui/material/Autocomplete';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';

// Labels data
const labels = [
  { name: 'Red', color: '#FF0000', description: 'Red color' },
  { name: 'Green', color: '#00FF00', description: 'Green color' },
  { name: 'Yellow', color: '#FFFF00', description: 'Yellow color' },
  { name: 'Blue', color: '#0000FF', description: 'Blue color' },
  { name: 'Black', color: '#000000', description: 'Black color' },
  { name: 'White', color: '#FFFFFF', description: 'White color' },
  { name: 'Brown', color: '#964B00', description: 'Brown color' },
  { name: 'Purple', color: '#800080', description: 'Purple color' },
  { name: 'Orange', color: '#FFA500', description: 'Orange color' },
  { name: 'Light Blue', color: '#87CEEB', description: 'Light blue color' },
];

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${'#e1e4e8'}`,
  boxShadow: `0 8px 24px ${'rgba(149, 157, 165, 0.2)'}`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& input': {
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`,
    padding: 8,
    fontSize: 14,
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: '100%',
  textAlign: 'left',
  paddingBottom: 8,
  fontWeight: 600,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const GitHubLabel = ({ getColorsHandleFunc }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState([]);
  const [pendingValue, setPendingValue] = React.useState([]);
  const theme = useTheme();

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    setAnchorEl(null);
  };

  // Faqat value o'zgargandagina getColorsHandleFunc ni chaqirish
  const prevValueRef = React.useRef(value);
  React.useEffect(() => {
    if (JSON.stringify(prevValueRef.current) !== JSON.stringify(value)) {
      const selectedColors = value.map((label) => label.color);
      getColorsHandleFunc(selectedColors);
      prevValueRef.current = value;
    }
  }, [value, getColorsHandleFunc]);

  return (
    <React.Fragment>
      <Box sx={{ margin: '20px 0', width: 321, fontSize: 13 }}>
        <Button sx={{fontSize: "17px"}} disableRipple aria-describedby={id} onClick={handleClick}>
          <span>Colors</span>
          <SettingsIcon sx={{marginLeft: "10px"}} />
        </Button>
        {value.map((label) => (
          <Box
            key={label.name}
            sx={{
              mt: '3px',
              height: 20,
              padding: '.15em 4px',
              fontWeight: 600,
              lineHeight: '15px',
              borderRadius: '2px',
            }}
            style={{
              backgroundColor: label.color,
              color: theme.palette.getContrastText(label.color),
            }}
          >
            {label.name}
          </Box>
        ))}
      </Box>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, padding: '8px 10px', fontWeight: 600 }}>
              Apply labels to this pull request
            </Box>
            <Autocomplete
              open
              multiple
              value={pendingValue}
              onChange={(event, newValue) => {
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              options={labels}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput ref={params.InputProps.ref} inputProps={params.inputProps} placeholder="Filter colors" />
              )}
              renderOption={(props, option, { selected }) => {
                const { key, ...otherProps } = props;
                return (
                  <li key={key} {...otherProps}>
                    <DoneIcon sx={{ visibility: selected ? 'visible' : 'hidden', mr: 1 }} />
                    <Box component="span" sx={{ backgroundColor: option.color, width: 14, height: 14, borderRadius: 1, mr: 1 }} />
                    {option.name}
                  </li>
                );
              }}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
};

GitHubLabel.propTypes = {
  getColorsHandleFunc: PropTypes.func.isRequired,
};

export default GitHubLabel;
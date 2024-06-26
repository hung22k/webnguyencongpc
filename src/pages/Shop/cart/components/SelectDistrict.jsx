import { useCartContext } from "../../../../@core/provider/CartProvider";
import { getDistricts } from "../services/api";
import { useState } from "react";
import * as React from 'react';
import { useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { useController } from "react-hook-form";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function SelectDistricts(props) {
  const [districts, setDistricts] = useState([]);

  const {control, name} = props


  const {
    field: { value, onBlur, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const {provinceId} = props
  const handleChange = (e) => {
    onChange(e.target.value)
  };
  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const response = await getDistricts(provinceId);
        setDistricts(response?.results || []);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    if (provinceId) {
      fetchDistrict();
    }
    console.log(provinceId)
  }, [provinceId]);
  return (
    <FormControl sx={{ width: '100%' }}>
        <InputLabel id="district">Quận / Huyện</InputLabel>
        <Select
          labelId="district"
          id="demo-multiple-chip"
          // multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-district" label="Chip" />}
          // renderValue={(selected) => (
          //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          //     {selected.map((value) => (
          //       <Chip key={value} label={value} />
          //     ))}
          //   </Box>
          // )}
          MenuProps={MenuProps}
        >
          {districts.map((district) => (
            <MenuItem
              key={district.district_id}
              value={district.district_id}
              // style={getStyles(name, personName, theme)}
            >
              {district.district_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}


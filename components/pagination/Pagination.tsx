import { Box, Pagination, Stack } from '@mui/material'
import React, { ChangeEvent, FC } from 'react'

interface Props {
    pages: number;
    setCurrentPage: (page: number) => void;
  }
const PaginationMarvel: FC<Props> = ({pages, setCurrentPage}) => {


    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    };
  return (
    <>
<Box sx={{ display: "flex",justifyContent: 'center' }}>

      <Pagination count={pages} onChange={handleChange} />
    
    </Box>
    
    
    
    
    </>
  )
}

export default PaginationMarvel
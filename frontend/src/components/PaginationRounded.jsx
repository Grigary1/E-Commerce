import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useState } from 'react';

export default function PaginationRounded({page,count,onChange}) {
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={onChange}
        page={page}
        count={count} variant="outlined" shape="rounded" />
    </Stack>
  );
}
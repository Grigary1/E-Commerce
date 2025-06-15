import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useState } from 'react';

export default function PaginationRounded() {
  const [page, setPage] = useState(1);
  useEffect(() => {
    console.log("Page ", page)
  }, [page])
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(event, value) => setPage(value)}
        page={page}
        count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}
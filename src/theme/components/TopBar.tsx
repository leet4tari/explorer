//  Copyright 2022. The Tari Project
//
//  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
//  following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following
//  disclaimer.
//
//  2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
//  following disclaimer in the documentation and/or other materials provided with the distribution.
//
//  3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote
//  products derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
//  INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
//  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
//  USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useAllBlocks } from '../../api/hooks/useBlocks';
import { toHexString, shortenString } from '../../utils/helpers';
import CopyToClipboard from '../../components/CopyToClipboard';
import SearchField from '../../components/SearchField';

export default function TopBar() {
  const { data } = useAllBlocks();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid item xs={12} md={12} lg={12}>
      <AppBar
        position="static"
        style={{
          background: theme.palette.divider,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: theme.spacing(1),
            }}
          >
            {!isMobile && (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: theme.spacing(2),
                }}
              >
                <Typography variant="body2">
                  <strong>TIP:</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>Height:</strong>{' '}
                  {data?.tipInfo?.metadata?.height_of_longest_chain}
                </Typography>
                <Typography variant="body2">
                  <strong>Best Block:</strong>{' '}
                  {shortenString(
                    toHexString(data?.tipInfo.metadata.best_block.data)
                  )}
                  <CopyToClipboard
                    copy={toHexString(data?.tipInfo.metadata.best_block?.data)}
                  />
                </Typography>
                <Typography variant="body2">
                  <strong>Pruned Height:</strong>{' '}
                  {data?.tipInfo.metadata.pruned_height}
                </Typography>
                <Typography variant="body2">
                  <strong>Version:</strong> {data?.version}
                </Typography>
              </Box>
            )}
            <SearchField />
          </Box>
        </Container>
      </AppBar>
    </Grid>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton> 
                <Link to={"/Schedule/1"}>  
                    <ListItemText primary={`Schedule ${index + 1}`} />
                </Link>
            </ListItemButton>
        </ListItem>
    );
}

export default function VirtualizedList() {
    return (
        <Box
            sx={{ width: '100%', height: 600, maxWidth: 900, bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                height={400}
                width={900}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

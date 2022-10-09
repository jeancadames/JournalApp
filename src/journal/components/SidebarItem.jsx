import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SidebarItem = ({title, body, id, date, imageUrls = []}) => {

    const notes = {title, body, id, date, imageUrls};
    const dispatch = useDispatch();
    
    const onNoteClick = () => {
        dispatch(setActiveNote(notes));
    }
    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    },[title] )

  return (
    <ListItem disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid 
                onClick={onNoteClick}
                container>
                <ListItemText primary={newTitle} />
                <ListItemText secondary={body} />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}

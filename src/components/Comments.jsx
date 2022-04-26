import React from 'react';
import { Divider, Avatar, Grid, Paper } from '@mui/material/';

function Comments({comment}) {
    return (
        <div className='commentsCards'>
            <Paper style={{ padding: "10px 20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" src="" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{comment[1]} </h4>
                        <p style={{ textAlign: "left" }}>
                            {comment[0]}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            posted {comment[2]}
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Comments
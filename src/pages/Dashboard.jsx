import { useContext } from 'react';
import { Grid } from '@mui/material/';
import { BlogContext } from "../contexts/BlogContext";
import loadingLogo from "../assets/loading.gif";
import BlogCards from '../components/BlogCards';

export default function Dashboard() {
  const { dataArray } = useContext(BlogContext);
  
  return (
    <div className='dashboard'>
      <h1>──── DASHBOARD ────</h1>
      <Grid className='gridContainer' container spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {!(dataArray) ? <img src={loadingLogo} alt="" className="loading" />
          :
          dataArray?.map((data) => (
            <BlogCards data={data} key={data.id} />
          ))}
      </Grid>
    </div>
  );
}
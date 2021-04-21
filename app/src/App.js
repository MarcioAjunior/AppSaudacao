import React, {useState, useEffect} from 'react';
import http from './axios'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import useStyles from './styles'

import TextTransition, { presets } from "react-text-transition";
import Lottie from 'react-lottie';

export default function SaudacaoApp() {
  const classes = useStyles();
  const [msg, setMsg] = useState('')
  const [data, setData] = useState(new Date())
  const [color, setColor] = useState()

  useEffect(()=>
    http.get('/saudacao').then(response => {
      setMsg(response.data.msg)
      setInterval(()=> setData(new Date()),1000)
      defColor(response.data.target)
    })
  ,[])
    useEffect(()=> 
    http.get('/saudacao').then(response => {
        setMsg(response.data.msg)
        defColor(response.data.target)
    }),[data.getHours()])


   function defColor(cor){
      if (cor === 'noite'){
        return setColor("linear-gradient(#333333, #989898)")
      }
      if (cor === 'tarde'){
        return setColor("linear-gradient(#ffa07a, #989898)")
      }
      return setColor("linear-gradient(#7ba1ee, #989898)")
  }      


  return (
    <div style={{ background : color,
                height: '100vh' }}>
      <CssBaseline />
      <Container component="main" className={classes.box} maxWidth="sm">
          <TextTransition 
          className={classes.txt}
          text={msg}
          springConfig = { presets.slow }
           />
        <Container>
        <Typography variant="h5" component="h2" className={classes.typ}>
            {data.getHours()}:{data.getMinutes()}:{data.getSeconds()}
        </Typography>
        </Container>
      </Container>
    </div>
      
  );
}


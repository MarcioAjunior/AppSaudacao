import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import useStyles from './styles'
//Animações
import Lottie from 'react-lottie';
import defaultOptions from './Animation/styles'
import animationSun from './Animation/sun.json'
import animationMoon from './Animation/moon.json'
import TextTransition, { presets } from "react-text-transition";
//server
import http from './axios'

export default function SaudacaoApp() {
  const classes = useStyles()

  const [msg, setMsg] = useState('')
  const [data, setData] = useState(new Date())
  const [color, setColor] = useState()
  const [animation, setAnimation] = useState({
    isStopped : false,
    isPaused : false,
    sunmoon : ''
  })

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
        setAnimation({...animation, sunmoon : animationMoon })
        return setColor("linear-gradient(#292929,#a2a2a2)")
      }
      if (cor === 'tarde'){
        setAnimation({...animation, sunmoon : animationSun })
        return setColor("linear-gradient(#e2725b, #93bf85)")
      }
      setAnimation({...animation, sunmoon : animationSun })
      return setColor("linear-gradient(#7ba1ee, #989898)")
  }

  return (    
    <div style={{ background : color,
      height: '100vh',}}>
         <CssBaseline />
         <div className={classes.sunmoon}>
         <Container maxWidth="lg" disableGutters>
         <Lottie options={{...defaultOptions,
                            animationData : animation.sunmoon
                          }}
                height={250}
                width={250}
                isStopped={animation.isStopped}
                isPaused={animation.isPaused}/> 
         </Container>
         </div>
         <Container component="main" className={classes.box} maxWidth="sm">
         <TextTransition 
            className={classes.txt}
            text={msg}
            springConfig = { presets.wobbly }
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


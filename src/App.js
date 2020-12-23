import React , {useRef , useEffect} from 'react'
import Details from './components/Details/Details';
import {Grid} from '@material-ui/core'
import useStyles from './styles'
import Main from './components/Main/Main';
import {PushToTalkButton , PushToTalkButtonContainer ,ErrorPanel} from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from "@speechly/react-client";



const App = () => {

    const classes = useStyles()
    const main = useRef(null)
   const { speechState } = useSpeechContext();
   const executeScroll = () => main.current.scrollIntoView()    

    useEffect(() => {
        
        if (speechState === SpeechState.Recording) {
      executeScroll();
    }
    }, [speechState])


    return (
        <>
        <div>
            <Grid 
             className={classes.grid} 
             container spacing={0} 
             alignItems="center"
              justify="center"
              style={{ height: '100vh'}}
             >
                <Grid item xs={12}sm={4} className={classes.mobile}  >
                    <Details title="Income"/>
                </Grid>
                <Grid ref={main}  item xs={12}sm={3} className={classes.main} >
                   <Main/>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.desktop}>
                   <Details title="Income" />
                </Grid>
                <Grid item xs={12}sm={4} className={classes.last} >
                    <Details title="Expense"/>
                </Grid>
            </Grid>
            
             <PushToTalkButtonContainer>
                   <PushToTalkButton size="4rem"/>
                   <ErrorPanel/>
             </PushToTalkButtonContainer>
        </div>
        </>
    )
}

export default App

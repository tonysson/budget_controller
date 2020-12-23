import React , {useState , useContext , useEffect} from 'react'
import {TextField , Button , FormControl , Typography , Grid , InputLabel , Select , MenuItem} from '@material-ui/core';
import useStyles from './styles'
import { ExpenseTrackerContext } from './../../../context/context';
import {v4 as  uuidv4} from 'uuid';
import {incomeCategories , expenseCategories} from '../../../constants/categories'
import formatDate from './../../../utils/formatDate';
import {useSpeechContext} from '@speechly/react-client'
import CustomizeSnackbar from '../../Snackbar/Snackbar';


const initialState = {
    amount : "",
    category: "" , 
    type: "Income",
    date : formatDate(new Date())
}

const Form = () => {

    // context Api
   const {addTransaction} = useContext(ExpenseTrackerContext)

   //sppechly context
   const {segment} = useSpeechContext()

    // To use material ui css 
    const classes = useStyles()
    
    //useState
    const [formData , setFormData] = useState(initialState)
    const [open,  setOpen] = useState(false)

   // create transaction
   const createTransaction = () => {

    // validation
    if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return
        // transform our Data
        const transaction = {
            ...formData,
            amount : Number(formData.amount) , 
            id : uuidv4()
        }

        //show the alert
        setOpen(true)
        // we add the transaction
        addTransaction(transaction)

        // we set the new formData to the state
        setFormData(initialState)
   }

   //useEffect to get our voice
   useEffect(() => {
     
    if(segment){

      if(segment.intent.intent === 'add_expense'){
        setFormData({
          ...formData , 
          type : 'Expense'
        })
      }else if(segment.intent.intent === 'add_income' ){
         setFormData({
          ...formData , 
          type : 'Income'
        })
      }else if(segment.isFinal && segment.intent.intent === 'create_transaction'){
          return  createTransaction()
      }else if(segment.isFinal && segment.intent.intent === 'cancel_transaction'){
        return setFormData(initialState)
      }

      // loop throw our entities and assign value to each one is prononced
      segment.entities.forEach(entity =>{
        // convert Category into category
        const category = `${entity.value.charAt(0)}${entity.value.slice(1).toLowerCase()}`
          switch(entity.type){
             case 'amount' :
                setFormData({
                     ...formData , 
                    amount : entity.value
                })
                break ; 
             case 'category' :
               if(incomeCategories.map((ic) => ic.type).includes(category)){
                   setFormData({
                     ...formData , 
                     type: 'Income',
                    category
                })
               }else if(expenseCategories.map((ex) => ex.type).includes(category)){
                   setFormData({
                     ...formData , 
                     type: 'Expense',
                    category
                })
               }
                break;
                case 'date' :
                setFormData({
                     ...formData , 
                    date : entity.value
                })
                break ;
                default :
                    break ;
          }
      })

      if(segment.isFinal && formData.amount && formData.category && formData.type && formData.date){
        createTransaction()
      }
    }
   } , [segment])

   const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories


    return (
        <Grid container spacing={2}>
          <CustomizeSnackbar open= {open} setOpen={setOpen} />
            <Grid item xs={12} >
            <Typography align="center" variant="subtitle2" gutterBottom >
               {segment && segment.words.map(w => w.value).join(" ")}
            </Typography>
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={formData.type}
                      onChange={
                        (e) => setFormData({...formData , type: e.target.value}) 
                      }>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} >
                    <FormControl fullWidth>
                           <InputLabel>Category</InputLabel>
                            <Select
                            value={formData.category}
                            onChange={
                            (e) => setFormData({...formData , category: e.target.value}) 
                            }>
                               {
                                 selectedCategories.map(c => (
                                    <MenuItem
                                    key={c.type}
                                    value={c.type}>
                                      {c.type}
                                    </MenuItem>
                                 ))
                               }
                           </Select>
                    </FormControl>
            </Grid>
              <Grid item xs={6} >
                    <TextField 
                    onChange = {
                        (e) => setFormData({
                            ...formData,
                          amount: e.target.value
                        })
                    }
                    value={formData.amount}
                    type="number"
                    label="Amount"
                     fullWidth/>
              </Grid>
              <Grid item xs={6} >
                    <TextField 
                      onChange = {
                        (e) => setFormData({
                            ...formData,
                          date : formatDate( e.target.value)
                        })
                       }
                    value={formData.date}
                    type="date" 
                    label="Date" 
                    fullWidth/>
              </Grid>
              <Button 
                onClick={createTransaction}
                className={classes.button} 
                fullWidth 
                variant="outlined" 
                color="primary" >
                Create
              </Button>
        </Grid>
    )
}

export default Form

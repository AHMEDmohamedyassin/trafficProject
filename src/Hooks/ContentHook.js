import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ContentHook = () => {
    const [matrixN , setMatrixN] = useState(0)
    const [matrix , setMatrix] = useState({})
    const [err , setErr] = useState(0.05)
    const [trials , setTrials] = useState(10000)
    const [doneTrials , setDoneTrials] = useState(0)
    const [newMatrix , setNewMatrix] = useState({})
    
    // editing number of elements in matrix 
    const matrixNFunc = (e) => {
        const val = parseInt(e.target.value)
        setMatrixN(0)
        setTimeout(() => {
            if(val !== NaN){
                setMatrixN(val)
                setMatrix({})
            }
        } , [50])
    }

    // editing matrix
    const editMatrix = (r , c, v) => {
        let row = parseInt(r)
        let col = parseInt(c)
        let val = parseFloat(v)

        if(row == NaN || col == NaN) return
        if(v == '' || val === NaN) val = 0 
        if(c == 'O') col = c
        if(r == 'D') row = r

        setMatrix({...matrix , [`${row},${col}`] : val})
    }

    // solving
    const resolve = () => {
        const matrix = correctAttraction()
        let a = Array(matrixN).fill(0)
        let b = Array(matrixN).fill(1)
        let done = false

        let times = 10000
        let doneTrials = 0
        if(trials  > 0 && trials < 1000000 ) times = trials

        while(!done && times > 0){

            times = times - 1
            doneTrials = doneTrials + 1 

            var a_old = a.slice()
            var b_old = b.slice()
            // rows correcting => getting a
            for(let i = 0 ; i < matrixN ; i ++){
                let origin = parseFloat(matrix[`${i},O`]) > 0 ? parseFloat(matrix[`${i},O`]) : 0
                let sum = gettingSum(true , i , b) 
                let res = origin / sum
                a[i] = sum > 0 ? res : 0
            }
    
            // column correcting => getting b
            for(let i = 0 ; i < matrixN ; i ++){
                let dest = parseFloat(matrix[`D,${i}`]) > 0 ? parseFloat(matrix[`D,${i}`]) : 0
                let sum = gettingSum(false , i , a)
                let res = dest / sum 
                b[i] = sum > 0 ? res : 0
            }
    
            // checking error 
            for(let i = 0 ; i < matrixN ; i ++){
                if(!checkError(a[i] , a_old[i]) ) {
                    done = false
                    break
                }
                if(!checkError(b[i] , b_old[i])) {
                    done = false
                    break
                }
                done  = true
            }

            // console.log(`row factors : ${a}` ,`column factors : ${b}` , `done trials : ${doneTrials}`)
            
        }

        createNewMatrix(a , b)
        setDoneTrials(doneTrials)
        toast.success('done calculation !')

    }

    // getting sum of row or column
    function gettingSum (isRow , val , factorList) {
        let sum = 0
        for(let i = 0 ; i < matrixN ; i++){
            let item = 0
            if(isRow){
                item = parseFloat(matrix[`${val},${i}`]) ? parseFloat(matrix[`${val},${i}`]) : 0
            }else item = parseFloat(matrix[`${i},${val}`]) ? parseFloat(matrix[`${i},${val}`]) : 0

            sum = sum + item * factorList[i]
        }
        return sum
    }

    // creating new matrix after getting a , b
    function createNewMatrix (a , b) {
        let m = {}
        for(const itm in matrix){
            let row = itm.split(',')[0]
            let col = itm.split(',')[1]
            
            m[itm] = matrix[itm] * a[row] * b[col]
        }
        setNewMatrix(m)
    }

    // checking error function
    function checkError(newV , oldV){
        const fr = Math.abs((newV - oldV) / oldV)
        let error = 0.05
        if(err > 0 ) error = err
        return fr < error
    }

    // correcting attraction 
    function correctAttraction() {    // under develop
        let sumO = 0
        let sumD = 0
        let factor = 0
        let newD = {}

        for(let i = 0 ; i < matrixN; i++){
            sumO = sumO + matrix[`${i},O`]
        }

        for(let i = 0 ; i < matrixN; i++){
            sumD = sumD + matrix[`D,${i}`]
        }
        
        factor = sumO / sumD
        
        for(let i = 0 ; i < matrixN; i++){
            newD={...newD , [`D,${i}`] : matrix[`D,${i}`] * factor }
        }
        
        let updatedMatrix = {...matrix , ...newD}
        setMatrix(updatedMatrix)
        return updatedMatrix
    }

    // submitting
    function submit(){
        if(parseFloat(err) < 0 || parseFloat(err) >= 1) return toast.error('error must be between 0 and 1')
        if(trials > 1000000 || trials < 1) return toast.error('trials must be more than 1 or less than million')
        if(Object.keys(matrix).length < 1) return toast.error('please fill matrix')
        toast.info('calculating ....')

        resolve()
    }

    useEffect(() => {console.log(matrix)} , [matrix])

    return {matrixN , 
        setMatrixN , 
        matrix , 
        setMatrix , 
        matrixNFunc , 
        editMatrix , 
        resolve , 
        newMatrix ,
        trials,
        setTrials,
        err , 
        setErr,
        doneTrials,
        submit
    }
}

export default ContentHook
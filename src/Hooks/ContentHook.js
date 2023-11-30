import React, { useEffect, useState } from 'react'

const ContentHook = () => {
    const [matrixN , setMatrixN] = useState(0)
    const [matrix , setMatrix] = useState({})
    const [err , setErr] = useState(0.05)
    const [newMatrix , setNewMatrix] = useState({})
    
    // editing number of elements in matrix 
    const matrixNFunc = (e) => {
        const val = parseInt(e.target.value)
        if(val !== NaN){
            setMatrixN(val)
            setMatrix({})
        }
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

    const resolve = () => {
        let a = Array(matrixN).fill(0)
        let b = Array(matrixN).fill(1)
        let done = false

        let times = 10000

        while(!done && times > 0){

            times = times - 1

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
                if((1 - (Math.min(a[i] , a_old[i]) / Math.max(a[i] , a_old[i]))) < err ) {
                    done = true
                    break
                }
                if((1 - (Math.min(b[i] , b_old[i]) / Math.max(b[i] , b_old[i]))) < err ) {
                    done = true
                    break
                }
            }
            
        }

        createNewMatrix(a , b)

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

    return {matrixN , setMatrixN , matrix , setMatrix , matrixNFunc , editMatrix , resolve , newMatrix}
}

export default ContentHook
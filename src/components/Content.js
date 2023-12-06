import React, { useEffect, useState } from 'react'
import ContentHook from '../Hooks/ContentHook'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Content = () => {
    const {matrixN , 
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
    } = ContentHook()

  return (
    <div className='mx-auto max-w-[1200px] px-4 my-10'>
        <ToastContainer />
            {/* matrix n */}
            <div className='flex items-center justify-between flex-wrap w-64 gap-4 mb-10'>
                <div className=''>n of matrix : </div>
                <input onChange={matrixNFunc} className='bg-gray-50 w-24 border-gray-500 border-[1px] rounded px-2 py-1' type='number' placeholder='n matrix' />
            </div>
            {/* error %  */}
            <div className=' my-10 flex items-center justify-between flex-wrap w-64 gap-4'>
                <div className=''>error precentage : </div>
                <input defaultValue={err} onChange={(e) => setErr(e.target.value)} className='bg-gray-50 w-24 border-gray-500 border-[1px] rounded px-2 py-1' type='number' placeholder='error 0 - 1' />
            </div>
            {/* trials  */}
            <div className=' my-10 flex items-center justify-between flex-wrap w-64 gap-4'>
                <div className=''>trials number : </div>
                <input defaultValue={trials} onChange={e => setTrials(e.target.value)} className='bg-gray-50 w-24 border-gray-500 border-[1px] rounded px-2 py-1' type='number' max={1000000} min={0} placeholder='<1000000' />
            </div>


        {
            matrixN > 0 ? (
            <>
                <div className='text-lg mb-2 font-bold'>base matrix : </div>
                {/* base matrix */}
                <div className='flex'>

                    {/* vertical counting */}
                    <div className='flex flex-col pe-2'>
                        <div className='h-[40px] w-max text-[8px] flex justify-center items-center'>D \ O</div>
                        {
                            Array(matrixN).fill(0).map((e , index) => (
                                <div key={index} className='h-[40px] flex items-center justify-center '>{index + 1}</div>
                            ))
                        }
                        <div className='h-[40px] mt-4 text-xs font-bold'>D</div>
                    </div>

                    <div className='overflow-auto pb-6'>

                        {/* horizontal counting */}
                        <div className='flex'>
                            {
                                Array(matrixN).fill(0).map((e , index) => (
                                    <input key={index} disabled className='w-[70px] h-[40px] py-0 px-[2px] text-[#222] text-center ' value={index + 1} />
                                ))
                            }
                        </div>

                        {/* the matrix content rows */}
                        {
                            Array(matrixN).fill(0).map((e , rowIndex) => (
                                <>
                                    <div key={rowIndex} className='flex'>
                                        {
                                            Array(matrixN).fill(0).map((e , colIndex) => (
                                                <input onChange={(e) => editMatrix(rowIndex , colIndex , e.target.value)} key={colIndex} className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500'  placeholder={`${rowIndex+1} , ${colIndex+1}`} type='number' />
                                            ))
                                        }
                                    </div>
                                </>
                            ))
                        }

                        {/* new destination */}
                        <div className='flex mt-2'>
                            {
                                Array(matrixN).fill(0).map((e , index) => (
                                    <input onChange={(e) => editMatrix('D' , index , e.target.value)} key={index} className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500'  placeholder={index+1} type='number' />
                                ))
                            }
                        </div>

                    </div>

                    {/* new origin  */}
                    <div className='flex flex-col ms-2'>
                        <div className='w-[70px] h-[40px] text-[#222] flex justify-center items-center text-center text-xs font-bold'>new o</div>
                        {
                            Array(matrixN).fill(0).map((e , index) => (
                                <input onChange={(e) => editMatrix(index , 'O' , e.target.value)} key={index} className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500'  placeholder={index+1} type='number' />
                            ))
                        }
                    </div>

                </div>

                <button onClick={() => submit()} className='bg-sky-600 px-2 py-1 text-white rounded hover:bg-sky-500'>resolve</button>
            </>                
            ) : null
        }


        {
            Object.keys(newMatrix).length > 0 ? (
                <>
                    {/* no js matrix */}
                    <div className='text-lg mb-2 font-bold mt-20'>new matrix : </div>
                    {/* base matrix */}
                    <div className='flex'>

                        {/* vertical counting */}
                        <div className='flex flex-col'>
                            <div className='h-[24px] w-max text-[8px]'>D \ O</div>
                                {
                                    Array(matrixN).fill(0).map((e , index) => (
                                        <div key={index} className='h-[40px]'>{index + 1}</div>
                                    ))
                                }

                                <div className='h-[40px] mt-6 text-xs font-bold'>D</div>
                        </div>

                        <div className='overflow-auto'>

                            {/* horizontal counting */}
                            <div className='flex'>
                                {
                                    Array(matrixN).fill(0).map((e , index) => (
                                        <div key={index} className='w-[70px] h-[24px] text-[#222] text-center'>{index + 1}</div>
                                    ))
                                }
                            </div>

                            {/* the matrix content rows */}
                            {
                                Array(matrixN).fill(0).map((e , rowIndex) => (
                                    <div key={rowIndex} className='flex'>
                                        {
                                            Array(matrixN).fill(0).map((e , colIndex) => (
                                                <input value={newMatrix[`${rowIndex},${colIndex}`]} key={colIndex} disabled className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500'  placeholder={`1 1`} type='number' />
                                            ))
                                        }
                                    </div>
                                ))
                            }

                            {/* new destination */}
                            <div className='flex mt-2'>
                                {
                                    Array(matrixN).fill(0).map((e , index) =>(
                                        <input key={index} value={matrix[`D,${index}`]} disabled className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500' type='number' />
                                    ))
                                }
                            </div>
                        </div>

                        {/* new origin  */}
                        {/* <div className='flex flex-col ms-4'>
                                <div className='w-[70px] h-[24px] text-[#222] text-center text-xs font-bold'>new o</div>
                                <input className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500'  placeholder={`1 1`} type='number' />
                        </div> */}

                    </div>

                    <div className='w-full text-start font-bold'>
                        <span>trials : </span> <span className='text-sky-500'>{doneTrials}</span>
                    </div>
                </>
            ) : null
        }

        





    </div>
  )
}

export default Content
import React, { useEffect, useState } from 'react'
import ContentHook from '../Hooks/ContentHook'

const Content = () => {
    const {matrixN , setMatrixN , matrix , setMatrix , matrixNFunc , editMatrix , resolve , newMatrix} = ContentHook()

  return (
    <div className='mx-auto max-w-[1200px] px-4 my-10'>
        {/* matrix n */}
        <div className='flex items-center justify-between flex-wrap w-64 gap-4'>
            <div className=''>n of matrix : </div>
            <input onChange={matrixNFunc} className='bg-gray-50 w-20 border-gray-500 border-[1px] rounded px-2 py-1' type='number' placeholder='n matrix' />
        </div>
        {/* error %  */}
        <div className=' my-10 flex items-center justify-between flex-wrap w-64 gap-4'>
            <div className=''>error precentage : </div>
            <input className='bg-gray-50 w-20 border-gray-500 border-[1px] rounded px-2 py-1' type='number' placeholder='error %' />
        </div>


        {
            matrixN > 0 ? (
            <>
                <div className='text-lg mb-2 font-bold'>base matrix : </div>
                {/* base matrix */}
                <div className='flex'>

                    {/* vertical counting */}
                    <div className='flex flex-col pe-2'>
                        <div className='h-[24px] w-max text-[8px]'>D \ O</div>
                        {
                            Array(matrixN).fill(0).map((e , index) => (
                                <div key={index} className='h-[40px]'>{index + 1}</div>
                            ))
                        }
                        <div className='h-[40px] mt-4 text-xs font-bold'>D</div>
                    </div>

                    <div className='overflow-auto pb-6'>

                        {/* horizontal counting */}
                        <div className='flex pb-2'>
                            {
                                Array(matrixN).fill(0).map((e , index) => (
                                    <div key={index} className='w-[70px] h-[24px] text-[#222] text-center'>{index + 1}</div>
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
                        <div className='w-[70px] h-[24px] mb-2 text-[#222] text-center text-xs font-bold'>new o</div>
                        {
                            Array(matrixN).fill(0).map((e , index) => (
                                <input onChange={(e) => editMatrix(index , 'O' , e.target.value)} key={index} className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500'  placeholder={index+1} type='number' />
                            ))
                        }
                    </div>

                </div>

                <button onClick={() => resolve()} className='bg-sky-600 px-2 py-1 text-white rounded hover:bg-sky-500'>resolve</button>
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

                                {/* <div className='h-[40px] mt-6 text-xs font-bold'>D</div> */}
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
                            {/* <div className='flex mt-4'>
                                <input className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500'  placeholder={`1 1`} type='number' />
                            </div> */}
                        </div>

                        {/* new origin  */}
                        {/* <div className='flex flex-col ms-4'>
                                <div className='w-[70px] h-[24px] text-[#222] text-center text-xs font-bold'>new o</div>
                                <input className='w-[70px] h-[40px] py-0 px-[2px] bg-sky-100 text-[#222] text-center border-[1px] border-gray-500'  placeholder={`1 1`} type='number' />
                        </div> */}

                    </div>
                </>
            ) : null
        }
        





    </div>
  )
}

export default Content
import React, { useState, useEffect } from 'react'
import 'react-rangeslider/lib/index.css'

const Dashboard = () => {

    const [value,onChange]=useState(1);
    useEffect(()=>{
        const ele = document.querySelector('.buble');
        if (ele) {
            ele.style.left = `${Number(value / 4)}px`;
        }
    })

    return (
        <div className="container">
            <h1 className="title is-1">Task 6: fake user data generation</h1>
            <table className="table is-striped is-fullwidth is-hoverable">
                <tbody>
                    <tr>
                        <td>
                            <div className="buttons">
                                <button type="button" className="button is-success is-normal">English data
                                </button>
                                <button type="button" className="button is-info is-normal">German data</button>
                                <button type="button" className="button is-warning is-normal">Ukrainian data</button>
                            </div>
                        </td>
                        <td>
                            <div className="slider-parent">
                                Select amount of errors <input className="is-large" type="range" min="0" max="10" value={value}
                                       onChange={({ target: { value: radius } }) => {
                                           onChange(radius);
                                       }}
                                />
                                <div className="buble">
                                    {value}
                                </div>
                            </div>
                        </td>
                        <td>
                            <button type="button" className="button is- is-normal">Random data</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table is-striped is-fullwidth is-hoverable">
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>Index</th>
                    <th>Identifier</th>
                    <th>Full name</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

    )
}
export default Dashboard

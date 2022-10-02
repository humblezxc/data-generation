import React, { useState, useEffect } from 'react'
import 'react-rangeslider/lib/index.css'
import InfiniteScroll from "react-infinite-scroll-component";

import { faker } from '@faker-js/faker';


const Dashboard = () => {
    const generateUsers = () => {
        const users = [];
        Array.from({length: 20}).forEach(() => {
            users.push(createRandomUser());
        });
        return users;
    }

    const  createRandomUser = () => {
        return {
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            fullName: faker.name.fullName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
            phone: faker.phone.number()
        };
    }

    faker.seed(123)



    const [state, setState] = useState({
        items: generateUsers()
    });

    const setFakerLocaleFr = () => {
        faker.locale = "fr"
        setState({
            items: generateUsers()
        });
    }

    const setFakerLocaleDe = () => {
        faker.locale = "de"
        setState({
            items: generateUsers()
        });
    }

    const setFakerLocalePl = () => {
        faker.locale = "pl"
        setState({
            items: generateUsers()
        });
    }

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            setState({
                items: state.items.concat(generateUsers())
            });
        }, 1500);
    };

    const [value, onChange] = useState(1);

    useEffect(() => {
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
                                <button type="button" className="button is-success is-normal"
                                        onClick={setFakerLocaleFr}>French data
                                </button>
                                <button type="button" className="button is-info is-normal"
                                        onClick={setFakerLocaleDe}>German data
                                </button>
                                <button type="button" className="button is-warning is-normal"
                                        onClick={setFakerLocalePl}>Polish data
                                </button>
                            </div>
                        </td>
                        <td>
                            <div className="slider-parent">
                                Select amount of errors <input className="is-large" type="range" min="0" max="10"
                                                               value={value}
                                                               onChange={({target: {value: radius}}) => {
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
                <InfiniteScroll
                    dataLength={state.items.length}
                    next= {fetchMoreData}
                    hasMore={true}

                    loader={ <h4>Loading...</h4> }
                >
                <table className="table is-striped is-fullwidth is-hoverable">
                    <thead>
                    <tr>
                        <th>Index</th>
                        <th>Identifier</th>
                        <th>Full name</th>
                        <th>Address</th>
                        <th>Phone number</th>
                    </tr>
                    </thead>
                       <tbody>
                        {state.items.map((i, index) => (
                            <tr>
                                <td key={index}>{index}</td>
                                <td key={i.userId}>{i.userId}</td>
                                <td key={i.fullName}>{i.fullName}</td>
                                <td key={i.email}>{i.email}</td>
                                <td key={i.phone}>{i.phone}</td>
                            </tr>
                        ))}

                       </tbody>
                </table>
                </InfiniteScroll>
            </div>
        )
    }

export default Dashboard

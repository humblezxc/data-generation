import React, { useState, useEffect } from 'react'
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

    const [state, setState] = useState({
        items: generateUsers()
    });


    const [random, setRandom] = useState( undefined);

    const randomSeed = () => {
        if (!random){
            let seedNumber = Math.floor(Math.random() * 1000) + 1;
            faker.seed(seedNumber);
            setRandom(seedNumber);
            generateInitialUsers()
        }
    }

    const setFakerLocaleFr = () => {
        faker.locale = "fr"
        generateInitialUsers()
    }

    const setFakerLocaleDe = () => {
        faker.locale = "de"
        generateInitialUsers()
    }

    const setFakerLocalePl = () => {
        faker.locale = "pl"
        generateInitialUsers()
    }

    const fetchMoreData = () => {
        faker.seed(parseInt(random) * state.items.length);

        setTimeout(() => {
            setState({
                items: state.items.concat(generateUsers())
            });
        }, 150);
    };

    const generateInitialUsers = () => {
        setState({
            items: generateUsers()
        });
    }

    const setSeedState = (number) => {
        setRandom(parseInt(number))
        faker.seed(parseInt(number));
        generateInitialUsers()
    }

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
                            <label>
                                Seed value: <input type="number" value={random} min={1} onChange={e => setSeedState(e.target.value) }/>
                            </label>

                        </td>
                        <td>
                            <button className="button is- is-normal" onClick={randomSeed}>Random data</button>
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

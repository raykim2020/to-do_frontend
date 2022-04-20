import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'


function App() {
    const [tasks, setTasks] = useState({})
    const [buttonPressed, setButtonPressed] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const entry = useRef(null)



    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("https://guarded-island-67904.herokuapp.com/tasks/table")
                setTasks(response.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [buttonPressed, didSubmit])

    const handleClick = async (statusChange, id) => {
        try {
            const response = await axios.put(`https://guarded-island-67904.herokuapp.com/tasks/${id}`, {
                status: statusChange
            })

            if (response.status === 200) {
                setButtonPressed(!buttonPressed)
            } else {
                console.log('Something went wrong')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://guarded-island-67904.herokuapp.com/tasks/${id}`)
            if (response.status === 200) {
                setButtonPressed(!buttonPressed)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        try {
            await axios.post('https://guarded-island-67904.herokuapp.com/tasks', {
                entry: entry.current.value,
            })
            setDidSubmit(!didSubmit)
            entry.current.value = ""
        } catch (err) {
            console.log(err)
        }


    }


    return (

        <div className="App">
            <div className="formContainer">
                <form className="form">
                    <label>New Items: <input ref={entry} type="text" /></label>
                    <button className='submit' onClick={handleSubmit}>Add</button>
                </form>
            </div>
            <div className="container">
                <h2>To-Do</h2>
                <ul>
                    {/* <div className="list"> */}
                    {
                        tasks["TO-DO"] ?
                            tasks["TO-DO"].map((item, idx) => {
                                return (
                                    <li>

                                        {item.entry}

                                        <button onClick={() => { handleClick("COMPLETED", item._id) }} className="button">Completed</button>

                                    </li>
                                )
                            })
                            :
                            ""
                    }
                    {/* </div> */}
                </ul>

            </div>
            <div id="completed" className="section">
                <h2>Completed</h2>
                <ul>

                    {/* <div className="list"> */}
                    {
                        tasks["COMPLETED"] ?
                            tasks["COMPLETED"].map((item, idx) => {
                                return (
                                    // <div className="task" key={idx}>
                                    <li>
                                        {item.entry}
                                        <button onClick={() => { handleDelete(item._id) }}>Delete  </button>

                                    </li>
                                )
                            })
                            :
                            ""
                    }
                    {/* </div> */}
                </ul>
            </div>

        </div>

    );
}



export default App;
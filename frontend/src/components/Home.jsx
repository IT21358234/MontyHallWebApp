import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Home.css'

export default function Home() {

    const [isStart, setIsStart] = useState(false)

    const [numSimulations, setNumSolution] = useState(0)
    const [door, setDoor] = useState('Stay')

    const [wins, setWins] = useState(0)
    const [simulations, setSimulations] = useState([])
    const [playerChoices, setPlayerChoices] = useState([])

    const [currentIndex, setCurrentIndex] = useState(0)

    const [timeLap, setTimeLap] = useState(3000)

    useEffect(() => {
        const interval = setInterval(() => {
        if (currentIndex < simulations.length) {
            setCurrentIndex(currentIndex + 1)
        } else {
            clearInterval(interval)
        }
        }, timeLap)

        return () => {
        clearInterval(interval)
        }
    }, [currentIndex, simulations.length])

    const handleSubmitStart = () => {
        setIsStart(true)


        axios.post('http://localhost:5000/simulate/run', {numSimulations, door}).then((res)=>{
            setWins(res.data.wins)
            setSimulations(res.data.simulations)
            setPlayerChoices(res.data.playerChoices)
        })
    }

    return (
        <div className='home'>
            <div className='title'>
                <h1 className='title'>
                    <span style={{color: "red"}}>M</span>
                    <span style={{color: "#ff6a00"}}>o</span>
                    <span style={{color: "yellow"}}>n</span>
                    <span style={{color: "#3fff00"}}>t</span>
                    <span style={{color: "#2c62e0"}}>y</span>
                    <span style={{color: "gray"}}> </span>
                    <span style={{color: "red"}}>H</span>
                    <span style={{color: "yellow"}}>a</span>
                    <span style={{color: "orange"}}>l</span>
                    <span style={{color: "#f646a5"}}>l</span>
                    <span style={{color: "gray"}}> </span>
                    <span style={{color: "#3fff00"}}>G</span>
                    <span style={{color: "#2c62e0"}}>a</span>
                    <span style={{color: "#cf2129"}}>m</span>
                    <span style={{color: "#ee0979"}}>e</span>
                </h1>
            </div>
            {isStart? (
                <div className='flex-container'>
                    <div>
                        {simulations.map((simulation, index)=>(
                            <div 
                                className='flex-container'
                                style={{ display: index === currentIndex ? 'flex' : 'none', position:'relative' }}
                            >
                                {playerChoices[index]}
                                <div  className='door'>
                                    {simulation[0] == 'car'? (
                                        <img className='door' src='img/car.png'/>
                                    ):(
                                        <img className='door' src='img/goat.png'/>
                                    )}
                                    {playerChoices[index] === 0 &&
                                        <span className='door'>SELECTED DOOR</span>
                                    }
                                </div>
                                <div className='door'>
                                    {simulation[1] == 'car'? (
                                        <img className='door' src='img/car.png'/>
                                    ):(
                                        <img className='door' src='img/goat.png'/>
                                    )}
                                    {playerChoices[index] === 1 &&
                                        <span className='door'>SELECTED DOOR</span>
                                    }
                                </div>
                                <div className='door'>
                                    {simulation[2] == 'car'? (
                                        <img className='door' src='img/car.png'/>
                                    ):(
                                        <img className='door' src='img/goat.png'/>
                                    )}
                                    {playerChoices[index] === 2 &&
                                        <span className='door'>SELECTED DOOR</span>
                                    }
                                </div>
                                {simulation[playerChoices[index]] == 'car' && door === 'Stay' && 
                                    <span className='won-lost' style={{color:'#3fff00'}}>
                                        <i class="fa-regular fa-circle-check"></i> WON
                                    </span>
                                }
                                {simulation[playerChoices[index]] == 'goat' && door === 'Stay' && 
                                    <span className='won-lost' style={{color:'red'}}>
                                        <i class="fa-regular fa-circle-xmark"></i> LOST
                                    </span>
                                }
                                {simulation[playerChoices[index]] == 'car' && door === 'Switch' && 
                                    <span className='won-lost' style={{color:'red'}}>
                                        <i class="fa-regular fa-circle-xmark"></i> LOST
                                    </span>
                                }
                                {simulation[playerChoices[index]] == 'goat' && door === 'Switch' && 
                                    <span className='won-lost' style={{color:'#3fff00'}}>
                                        <i class="fa-regular fa-circle-check"></i> WON
                                    </span>
                                }
                                <span className='skip' >
                                    <div style={{textAlign:'center', marginBottom:'5px'}}>
                                        <span >
                                            Simulation No: {index+1}
                                        </span>
                                        <br/>
                                        <span>
                                            Door: {door}
                                        </span>
                                    </div>
                                    <button onClick={()=>{setTimeLap(1)}}>
                                        Skip & See Result
                                    </button>
                                </span>
                            </div>
                        ))}
                        {currentIndex === simulations.length && (
                            <div>
                            <div>
                                <h3 style={{textAlign:'center', color:'#2c62e0'}}>Results</h3>
                                <table>
                                    <tr>
                                        <th>No. of Simulation</th>
                                        <th>Wins</th>
                                        <th>Losses</th>
                                        <th>Door</th>
                                    </tr>
                                    <tr>
                                        <td>{simulations.length}</td>
                                        <td>{wins}</td>
                                        <td>{numSimulations - wins}</td>
                                        <td>{door}</td>
                                    </tr>
                                </table>

                                <table>
                                    <tr>
                                        <td style={{fontWeight:'700'}}>Wining Presentage</td>
                                        <td>{(wins/numSimulations)*100}%</td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight:'700'}}>Losing Presentage</td>
                                        <td>{(100-(wins/numSimulations)*100)}%</td>
                                    </tr>
                                </table>
                                <div className='flex-container'>
                                    <button 
                                        onClick={()=>{
                                            window.location.reload()
                                        }}>
                                        Play Again
                                    </button>
                                </div>
                                
                            </div>
                            </div>
                        )}
                    </div>
                    
                    
                </div>
            ):(
                <div className='flex-container'>
                    <img src='img/presenter.jpg'/>
                    <div style={{alignItems:'center', display:'flex'}}>
                        <div>
                            <div style={{alignItems:'center', display:'flex', justifyContent:'space-between'}}>
                                <h4 style={{fontSize:'18px'}}>
                                    Select Number of Simulations:
                                </h4>
                                &nbsp;&nbsp;
                                <input 
                                value={numSimulations}
                                onChange={(e)=>setNumSolution(e.target.value)}
                                    type='number' min={1}
                                />  
                            </div>
                            <br/>
                            <div style={{alignItems:'center', display:'flex', justifyContent:'space-between'}}>
                                <h4 style={{fontSize:'18px'}}>
                                    Select 'Stay' or 'Switch':
                                </h4>
                                &nbsp;&nbsp;
                                <select value={door} onChange={(e)=>setDoor(e.target.value)}>
                                    <option value="Stay">Stay</option>
                                    <option value="Switch">Switch</option>
                                </select>
                            </div>
                            <br/>
                            <div style={{display:'flex', justifyContent:'right'}}>
                                <button
                                    onClick={handleSubmitStart}
                                >
                                    Start
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}

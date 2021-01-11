import React, { useEffect, useState, useContext } from 'react';
import { useAppContext } from '../../AppContext';
// import { Trophies } from './Trophies.js'; //need to add additional trophies to this file
import TrophyButton from '../Buttons/TrophyButton/index';
import H1 from '../DisplayText/H1Text/index';
import H2 from '../DisplayText/H2Text/index';
import { ThemeContext } from '../../ThemeContext';
import '../../App.css';
import './trophies.css';
import { ToastContainer, Slide } from 'react-toastify';
import { Typography } from '@material-ui/core';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Trophy() {
  const theme = useContext(ThemeContext);
  const { userData, isAuthenticated, isLoading, accessToken } = useAppContext();
  const [award, setAward] = useState();

  let user_Id = userData?.id; //we need to get this from the app context

  useEffect(() => {
    if (user_Id) {
      async function getAllTrophies() {
        const res = await fetch(`${BACKEND_URL}/trophies/${user_Id}`, {
          headers: {
            'content-type': 'application/JSON',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        console.log(`data payload is `, data.payload);
        setAward(data.payload);
        console.log(`award state is`, award);
      }
      getAllTrophies();
    }
  }, [setAward]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div id={theme} className='trophy'>
        <ToastContainer
          transition={Slide} // changes the transition to a slide rather than a bounce.
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className='container'>
          <H2 text={`${userData?.name}'s Trophy Cabinet`} />
          {/* <img
            src='https://cdn1.iconfinder.com/data/icons/ninja-things-1/720/ninja-background-512.png'
            alt='ninja'
            height='15%'
            width='15%'
            className='center'
          /> */}
          <br></br>
          <Typography variant='h6'>
            You're fast becoming a coding ninja! Click below to claim your
            trophy every time you master a new skill
          </Typography>
          <br></br>
          <br></br>
          <div className='trophy-display'>
            {award?.map((trophy) => (
              <TrophyButton
                path={trophy.path}
                id={trophy.id}
                name={trophy.name}
                color={trophy.color}
                awarded={trophy.awarded}
              />
            ))}
          </div>
          <div>
            <br></br>
          </div>
        </div>
      </div>
    )
  );
}
export default Trophy;

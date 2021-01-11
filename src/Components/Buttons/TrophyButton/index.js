import React, { useContext, useState, useEffect } from 'react';
import './TrophyButton.css';
import { ThemeContext } from '../../../ThemeContext';
//// alerts
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../../../AppContext';
import { red } from '@material-ui/core/colors';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function TrophyButton({ name, path, id, color, awarded }) {
  const theme = useContext(ThemeContext);
  const [click, setClick] = useState(0);
  //const [trophyColor, setTrophyColor] = useState(awarded ? color : '#384D54');
  const [trophyAwarded, setTrophyAwarded] = useState(awarded);
  const { user, isAuthenticated, isLoading, accessToken } = useAppContext();
  async function patchTrophy() {
    const res = await fetch(`${BACKEND_URL}/trophies/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/JSON',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
    console.log('Patch Done');
    limitClicks();
    setTrophyAwarded(!trophyAwarded);
  }

  function toggleTrophyAwarded() {
    setTrophyAwarded(!trophyAwarded);
  }
  function limitClicks() {
    if (click < 1 && !trophyAwarded) {
      //  document.getElementsByClassName('trophyButton')
      setClick(click + 1);
      console.log(`click is`, click);
      toast(`Congratulations, you've mastered a new skill!`, {
        position: toast.POSITION.TOP_RIGHT,
        color: red,
      });
      //console.log (`my state is`)
    } else {
      // document.getElementsByClassName('trophyButton').setAttribute.disabled = true
      //document.getElementById(id).setAttribute.disabled = true
    }
  }

  //on Hover color change

  function hoverColorChange() {}

  return (
    <div id={theme}>
      <button
        id={theme}
        className='trophy-button'
        style={{ border: '0px', strokeOpacity: '0' }}
        onClick={patchTrophy}
      >
        <svg
          role='img'
          id={id}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          width='4em'
          height='4em'
          fill={trophyAwarded ? color : '#384D54'}
        >
          <title>{name}</title>
          <path d={path} />
        </svg>
        <br></br>
      </button>
    </div>
  );
}
export default TrophyButton;

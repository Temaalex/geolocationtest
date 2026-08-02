import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GallowsGamePage from './img/GallowsGame.png';
import BD from './bd.json';



const mainWrapperStyle = {
 margin: "20px",
 border: '2px solid #ffffff',
 backgroundColor: '#000000',
 borderRadius: '15px',
 overflow:"hidden",
 position: "absolute",
 zIndex: "9999"
}
const styleText = {
  color: '#ffffff',
  fontFamily: "'Roboto Mono', monospace",
  fontWeight: '600',
  fontSize: '20px',
  margin: '5px',
  textAlign: 'center',
};

const GallowsGamePageStyle = {
  display: 'flex',
  width: '50%',
  justifyContent: 'center',
};

const wordsStyle = {
  border: '2px solid #ffffff',
  backgroundColor: '#000000',
  color: '#ffffff',
  borderRadius: '7px',
  textAlign: 'center',
  fontFamily: "'Roboto Mono', monospace",
  fontWeight: '600',
  fontSize: '20px',
  width: '30px',
  height: '30px',
  margin: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '10px',
  justifyContent: 'center',
};

const energyStyle = {
  border: '2px solid #ffffff',
  color: '#000000',
  borderRadius: '15px',
  backgroundColor: '#4346d8',
  marginLeft: '20px',
  marginRight: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'stretch',
};

const buttonStyle = {
  ...wordsStyle,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const disabledButtonStyle = {
  ...buttonStyle,
  opacity: '0.5',
  cursor: 'not-allowed',
};

const hintStyle = {
  ...styleText,
  fontSize: '16px',
  color: '#cccccc',
  marginBottom: '10px',
};
const styleClose = {
  height:"45px",
  float: "right",
  border: '2px solid #020202',
  borderRadius: '5px',
  cursor: "pointer",
  overflow: "hidden",
  
}

const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');

const GallowsGame = ({onGameEnd}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [energy, setEnergy] = useState(100);
  const [count, setCount] = useState(0);
  const [gameStatus, setGameStatus] = useState('Энергия:');
  const [usedLetters, setUsedLetters] = useState(new Set());

  const currentWord = BD.gallowGame[count]?.gallowWord || [];
  const hint = BD.gallowGame[count]?.hint || '';


  const initialVisible = useMemo(() => currentWord.map(() => false), [currentWord, count]);
  const [visible, setVisible] = useState(initialVisible);

  useEffect(() => {
    setUsedLetters(new Set());
  }, [count]);

  useEffect(() => {
    const isWon = visible.every(v => v);
    if (isWon) {
      setGameStatus('Победа!');
      setTimeout(() => {
        const nextCount = count + 1;
        if (nextCount < BD.gallowGame.length) {
          setCount(nextCount);
          setEnergy(100);
          setVisible(BD.gallowGame[nextCount].gallowWord.map(() => false));
          setGameStatus('Энергия:');
        } else {
          setGameStatus('Все слова пройдены!');
          if (onGameEnd) {
            onGameEnd();
          }
          //вернуться в космос 
          //navigate('/one')
        }
      }, 2000);
    }
  }, [visible, count, onGameEnd, navigate]);

  useEffect(() => {
    if (energy <= 0) {
      setGameStatus('Конец игры');
    }
  }, [energy]);

  function checkLetter(letter) {
    if (gameStatus.includes('Конец') || gameStatus === 'Победа!' || usedLetters.has(letter)) return;

    setUsedLetters(prev => new Set(prev).add(letter));

    const foundIndices = currentWord
      .map((wordLetter, idx) => wordLetter === letter ? idx : -1)
      .filter(idx => idx !== -1);

    if (foundIndices.length > 0) {
      setVisible(prev =>
        prev.map((val, idx) => foundIndices.includes(idx) ? true : val)
      );
    } else {
      setEnergy(prev => Math.max(prev - 10, 0));
    }
  }

  return (
    <div style={mainWrapperStyle}>
      {/* <img style={GallowsGamePageStyle} src={GallowsGamePage} alt="Gallows Game" /> */}
      <div style={hintStyle}>
        Подсказка: {hint}
      </div>
      <div style={wrapperStyle}>
        {visible.map((isVisible, idx) => (
          <div key={idx} style={wordsStyle}>
            {isVisible ? currentWord[idx] : ''}
          </div>
        ))}
      </div>
      
      <div style={wrapperStyle}>
        <p style={styleText}>{gameStatus}</p>
        <div style={energyStyle}>
          <p style={styleText}>{energy}%</p>
        </div>
      </div>
      <div style={wrapperStyle}>
        {alphabet.map(letter => {
          const isUsed = usedLetters.has(letter);
          const isDisabled = gameStatus.includes('Конец') || gameStatus === 'Победа!' || isUsed;
          const style = isDisabled ? disabledButtonStyle : buttonStyle;

          return (
            <button
              key={letter}
              style={style}
              onClick={() => checkLetter(letter)}
              disabled={isDisabled}
              aria-label={`Буква ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GallowsGame;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const { REACT_APP_API } = process.env;

function App() {
  const [link, setlink] = useState('');
  const [array, setarray] = useState([]);
  const [countalphabetic, setcountalphabetic] = useState(0);
  const [countalphanumeric, setcountalphanumeric] = useState(0);
  const [countinteger, setcountinteger] = useState(0);
  const [countrealnumber, setcountrealnumber] = useState(0);

  useEffect(() => {
    if (link) {
      getTextData(link);
    }
  }, [link]);

  const onGenerate = async () => {
    try {
      const resp = await axios({
        method: 'GET',
        url: `${REACT_APP_API}/generate`
      });
      if (resp && resp.status === 200 && resp.data) {
        const { data } = resp.data;
        if (data.filename) setlink(`${REACT_APP_API}/files/${data.filename}`);
        setarray([]);
        setcountalphabetic(0);
        setcountalphanumeric(0);
        setcountinteger(0);
        setcountrealnumber(0);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const onClickReport = () => {
    if (array.length > 0) {
      let realnumber = 0;
      let integer = 0;
      let alphabet = 0;
      let alphanumeric = 0;
      array.forEach((data) => {
        if (data.includes('.')) realnumber += 1;;
        if (!isNaN(Number(data))) integer += 1;
        if (data.match(/[a-z]/i)) alphabet += 1;
        if (data.match(/^[a-z0-9]+$/i)) alphanumeric += 1;
      })
      setcountalphabetic(alphabet);
      setcountalphanumeric(alphanumeric);
      setcountinteger(integer);
      setcountrealnumber(realnumber);
    }
  }

  const getTextData = async (url) => {
    try {
      const resp = await axios({
        method: 'GET',
        url
      });
      if (resp && resp.status === 200 && resp.data) {
        const { data } = resp;
        setarray(data.split(','));
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="App">
      <div className="body">
        <button className="button" onClick={() => onGenerate()}>Generate</button>
        <div className="download">Link: {link && (<a href={link}>{link}</a>)}</div>
        <button className="button" onClick={() => onClickReport()} >Report</button>
        <div className="counter">Alphabetical string: {countalphabetic}</div>
        <div className="counter">Real Numbers: {countrealnumber}</div>
        <div className="counter">Integers: {countinteger}</div>
        <div className="counter">Alphanumerics: {countalphanumeric}</div>
      </div>
    </div>
  );
}

export default App;

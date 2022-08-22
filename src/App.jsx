import { useEffect, useRef, useState } from 'react';
import './App.css';
import { GiphyFetch } from '@giphy/js-fetch-api'
import GifBox from './Components/GifBox/GifBox';
import useLocalStorage from './hooks/useLocalStorage';
import NavScrollExample from './layouts/Navbar/Navbar';
import { embedsFromData } from './utils/GifUtils';
import { LOCAL_SRCS_KEY } from './globals';
import TextBox from './Components/TextBox/TextBox';
import { db } from "./firebase-config";
import {
    collection,
    addDoc,
    getDocs
} from "firebase/firestore";
const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);
const OPTIONS = { sort: 'relevant', lang: 'en', limit: 10 };

function App() {
    const textRef = useRef('');
    const [urls, setUrls] = useState([]);
    const [localSrcs, setLocalSrcs] = useLocalStorage(LOCAL_SRCS_KEY, []);
    const [srcs, setSrcs] = useState([]);
    const publicSearchesRef = collection(db, "PublicSearches");

    const getAllSrcWords = async () => {
        const data = await getDocs(publicSearchesRef);
        let srcWords = [];
        for (const doc of data.docs) {
            srcWords.push(doc.data().srcWord);
        }
        return srcWords;
    }

    useEffect(() => {
        gf.trending(OPTIONS).then(res => {
            setUrls(embedsFromData(res.data));
        }).catch(err => alert('ERROR!'));
    }, [])

    const handleRemoteSavedClick = () => {
        getAllSrcWords().then(srcWords => {
            setSrcs(srcWords);
        })
    }
    const handleLocSavedClick = () => setSrcs(localSrcs);
    const handleMainClick = () => setSrcs([]);
    const handleCLick = e => {
        const srcWord = textRef.current.value.trim().toLowerCase();
        if (!srcWord) {
            return;
        }
        setSrcs([]);
        setLocalSrcs([...new Set([...localSrcs, srcWord])]);
        getAllSrcWords().then(srcWords => {
            if (!srcWords.includes(srcWord)) {
                addDoc(publicSearchesRef, { srcWord });
            }
        })
        gf.search(srcWord, OPTIONS).then(res => {
            setUrls(embedsFromData(res.data));
        }).catch(err => alert('ERROR!'));
    }

    return (
        <div className="App">
            <NavScrollExample
                textRef={textRef} handleClick={handleCLick} handleLocSavedClick={handleLocSavedClick}
                handleMainClick={handleMainClick} handleRemoteSavedClick={handleRemoteSavedClick}
            />
            {
                srcs.length > 0 && srcs.map(src => <TextBox key={Math.random()} src={src} textRef={textRef} />)
            }
            {
                !srcs.length && urls.map(url => <GifBox key={Math.random()} url={url} />)
            }
        </div>
    );
}

export default App;

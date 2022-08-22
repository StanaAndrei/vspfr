import React from 'react';

function GifBox({ url }) {
    return (
        <span style={{  }}>
            <iframe
                title={Math.random()} src={url} width="480" height="287"
                frameBorder="0" className="giphy-embed" allowFullScreen>
            </iframe>
        </span>
    );
}

export default GifBox;
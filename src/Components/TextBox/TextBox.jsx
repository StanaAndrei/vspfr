import React from 'react';
import Button from 'react-bootstrap/Button';

function TextBox({textRef, src}) {
    return (
        <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={e => textRef.current.value = e.target.innerHTML}>
                {src}
            </Button>
        </div>
    );
}

export default TextBox;
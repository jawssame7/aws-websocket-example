import React from 'react';

interface ImageComponentProps {
    src: string;
    alt?: string;
    size: number
}

function ImageComponent(props:ImageComponentProps) {
    return (
        <div>
            <img width={400} src={props.src} alt={props.alt || `size of ${props.size}`} />
        </div>
    );
}

export default ImageComponent;
import React, { useState, useEffect, useRef } from 'react';
import ImageComponent from "./ImageComponent";

interface Message {
    id: number;
    message: string;
}

interface Image {
    fileUrl: string;
    size: number;
}

const WebSocketNotification = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (socket.current) {
            // 既にWebSocket接続が存在する場合は何もしない
            return;
        }

        const ws = new WebSocket('wss://o76iiwb50h.execute-api.ap-northeast-1.amazonaws.com/production/');

        ws.onopen = () => {
            console.log('WebSocket Connected');
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log('WebSocket OnMessage', event);
            const image = JSON.parse(event.data);
            setImages(prevImage => [...prevImage, ...image]);
        };

        ws.onclose = () => {
            console.log('WebSocket Disconnected');
            socket.current = null; // 接続が閉じたらrefをnullに戻す
        };

        socket.current = ws; // refにWebSocketインスタンスを保存

        return () => {
            if (socket.current?.readyState === WebSocket.OPEN) {
                socket.current.close();
            }
        };
    }, []);

    return (
        <div>
            <h2>Image Notifications</h2>
            <div style={{width: "100%"}}>
                {images.map((image, index) => (
                    <ImageComponent src={image.fileUrl} size={image.size} />
                ))}
            </div>
        </div>
    );
};

export default WebSocketNotification;
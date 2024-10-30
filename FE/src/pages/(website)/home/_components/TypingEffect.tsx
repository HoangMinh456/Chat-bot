import { useEffect, useState } from 'react';

function TypingEffect({ text, speed = 50 }: { text: string; speed?: number }) {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));

            setIndex((prevIndex) => prevIndex + 1);

            if (index >= text.length - 1) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [index, speed, text]);


    return (
        <div className="text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-orange-500 p-3 rounded-lg text-4xl lg:text-8xl text-center">
            {displayedText}
        </div>
    );
}

export default TypingEffect;

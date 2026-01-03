"use client"
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';

const UploadedImage = () => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        fetchFile();
    }, [])

    const fetchFile = async () => {
        const filePath = 'latest_results/today_result.jpg'
        const { data: urlData, error } = supabase.storage.from('Teer').getPublicUrl(filePath);
        // Add a timestamp to the URL to force the browser to refresh the image
        setImageUrl(`${urlData.publicUrl}?t=${Date.now()}`);
        if (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <img
                src={imageUrl}
                alt="Latest Teer Result"
                className="max-w-full h-auto rounded-lg shadow-2xl shadow-white"
                onError={(e) => {
                    // Hide the image if the file doesn't exist yet
                    e.target.style.display = 'none';
                }}
            />
        </div>
    )
}

export default UploadedImage
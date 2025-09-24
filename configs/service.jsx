import axios from 'axios';

const getVideos = async (query) => {
    try {
        console.log('Service: Fetching videos for query:', query);
        
        // Clean up the query string
        const cleanQuery = query.trim().replace(/\s+/g, ' ');
        
        if (!cleanQuery) {
            throw new Error('Query cannot be empty');
        }
        
        // Make request to our API route
        const response = await axios.get('/api/youtube', {
            params: { q: cleanQuery },
            timeout: 20000, // 20 second timeout
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        console.log('Service: API response received:', {
            success: response.data.success,
            itemCount: response.data.items?.length || 0
        });

        if (response.data.success && response.data.items) {
            console.log('Service: Videos fetched successfully');
            
            // Log first video for debugging
            if (response.data.items.length > 0) {
                console.log('Service: First video:', {
                    title: response.data.items[0].title,
                    channel: response.data.items[0].channelTitle,
                    url: response.data.items[0].videoUrl
                });
            }
            
            return response.data.items;
        } else {
            throw new Error(response.data.error || 'Failed to fetch videos');
        }

    } catch (error) {
        console.error('Service: Error fetching videos:', error);
        
        if (error.response) {
            // Server responded with an error
            const serverError = error.response.data;
            console.error('Service: Server error details:', {
                status: error.response.status,
                error: serverError.error,
                details: serverError.details
            });
            
            // Throw a user-friendly error message
            if (error.response.status === 403) {
                throw new Error(serverError.error || 'YouTube API access forbidden');
            } else if (error.response.status === 400) {
                throw new Error(serverError.error || 'Invalid search query');
            } else if (error.response.status === 503) {
                throw new Error('YouTube service temporarily unavailable');
            } else if (error.response.status === 500) {
                throw new Error(serverError.error || 'Server configuration error');
            } else {
                throw new Error(serverError.error || 'YouTube API request failed');
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('Service: No response received from server');
            throw new Error('Network error: Unable to reach the server');
        } else {
            // Something else happened
            console.error('Service: Request setup error:', error.message);
            throw new Error(error.message || 'Request failed');
        }
    }
};



export default {
    getVideos,
};
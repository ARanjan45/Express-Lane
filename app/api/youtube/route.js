import { NextResponse } from 'next/server';
import axios from 'axios';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        
        console.log('YouTube API route called with query:', query);
        
        if (!query) {
            return NextResponse.json(
                { error: 'Query parameter is required', success: false },
                { status: 400 }
            );
        }

        // Check if API key exists (server-side environment variable)
        if (!process.env.YOUTUBE_API_KEY) {
            console.error('YouTube API key is missing from environment variables');
            return NextResponse.json(
                { error: 'YouTube API key is not configured on server', success: false },
                { status: 500 }
            );
        }

        console.log('Making request to YouTube API...');

        const params = {
            part: 'snippet',
            q: query,
            maxResults: 1,
            type: 'video',
            order: 'relevance',
            videoDuration: 'medium', // Filter for medium duration videos
            key: process.env.YOUTUBE_API_KEY // Server-side environment variable
        };

        const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
            params,
            timeout: 15000, // 15 second timeout
            headers: {
                'Accept': 'application/json',
            }
        });

        console.log('YouTube API response received:', {
            status: response.status,
            itemCount: response.data.items?.length || 0
        });

        // Filter and format the response
        const formattedItems = response.data.items?.map(item => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
        })) || [];

        return NextResponse.json({
            items: formattedItems,
            totalResults: response.data.pageInfo?.totalResults || 0,
            success: true
        });

    } catch (error) {
        console.error('YouTube API Error:', error);
        
        if (error.response) {
            // YouTube API returned an error
            const apiError = error.response.data?.error;
            console.error('YouTube API Error Details:', {
                status: error.response.status,
                message: apiError?.message,
                errors: apiError?.errors
            });
            
            let errorMessage = 'YouTube API request failed';
            
            if (error.response.status === 403) {
                if (apiError?.errors?.[0]?.reason === 'quotaExceeded') {
                    errorMessage = 'YouTube API quota exceeded. Please try again later.';
                } else {
                    errorMessage = 'YouTube API access forbidden. Check your API key and permissions.';
                }
            } else if (error.response.status === 400) {
                errorMessage = `Invalid request: ${apiError?.message || 'Bad request parameters'}`;
            } else if (error.response.status === 404) {
                errorMessage = 'YouTube API endpoint not found';
            }
            
            return NextResponse.json(
                { 
                    error: errorMessage,
                    success: false,
                    details: apiError?.message
                },
                { status: error.response.status }
            );
        } else if (error.request) {
            // Network error
            console.error('Network error when calling YouTube API');
            return NextResponse.json(
                { 
                    error: 'Network error: Unable to reach YouTube API',
                    success: false 
                },
                { status: 503 }
            );
        } else {
            // Other error
            console.error('Unexpected error:', error.message);
            return NextResponse.json(
                { 
                    error: 'Internal server error',
                    success: false 
                },
                { status: 500 }
            );
        }
    }
}
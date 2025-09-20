import * as crypto from 'crypto';

// Provided by Storyblocks
const publicKey = process.env.STORYBLOCK_PUBLIC_API_KEY || '';
const privateKey = process.env.STORYBLOCK_PRIVATE_API_KEY || '';

// url info
const baseUrl = 'https://api.storyblocks.com';
const resource = '/api/v2/images/search';
// HMAC generation
const expires = Math.floor(Date.now() / 1000) + 128900; // Current time + 36 hours in seconds
const hmacBuilder = crypto.createHmac('sha256', privateKey + expires);
hmacBuilder.update(resource);
const hmac = hmacBuilder.digest('hex');


export const config = {
    APIKEY: publicKey,
    EXPIRES: expires.toString(),
    HMAC: hmac,
    project_id: 'Storyblocks',
    user_id: 'test_user',
}
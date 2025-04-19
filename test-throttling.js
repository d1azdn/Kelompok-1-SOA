const axios = require('axios');

async function sendRequest(index) {
    const startTime = Date.now();
    try {
        const response = await axios.post('http://localhost:3000/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        const duration = Date.now() - startTime;
        console.log(`Request ${index + 1} completed in ${duration}ms with status ${response.status}`);
        return { status: response.status, duration };
    } catch (error) {
        const duration = Date.now() - startTime;
        const status = error.response ? error.response.status : 'Error';
        console.log(`Request ${index + 1} failed in ${duration}ms with status ${status}: ${error.message}`);
        return { status, duration };
    }
}

async function runConcurrentRequests(start, count) {
    console.log(`\nSending ${count} concurrent requests (${start + 1} to ${start + count})...`);
    const requests = Array(count).fill().map((_, i) => sendRequest(start + i));
    return Promise.all(requests);
}

async function runTest() {
    console.log('Starting throttling test for /auth/login endpoint');
    console.log('Sending 10 requests in 2 batches of 5 concurrent requests\n');

    // First batch of 5 concurrent requests
    const firstBatch = await runConcurrentRequests(0, 5);
    
    // Second batch of 5 concurrent requests
    const secondBatch = await runConcurrentRequests(5, 5);
    
    const allResults = [...firstBatch, ...secondBatch];
    
    // Analyze results
    console.log('\nTest Results:');
    console.log('============');
    
    const successCount = allResults.filter(r => r.status === 200).length;
    const throttledCount = allResults.filter(r => r.status === 429).length;
    const errorCount = allResults.filter(r => r.status !== 200 && r.status !== 429).length;
    
    console.log(`Successful requests (200): ${successCount}`);
    console.log(`Throttled requests (429): ${throttledCount}`);
    console.log(`Other errors: ${errorCount}`);
    
    const durations = allResults.map(r => r.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const maxDuration = Math.max(...durations);
    const minDuration = Math.min(...durations);
    
    console.log('\nDuration Analysis:');
    console.log(`Average: ${avgDuration.toFixed(2)}ms`);
    console.log(`Maximum: ${maxDuration}ms`);
    console.log(`Minimum: ${minDuration}ms`);
    
    // Compare first and second batch
    const firstBatchAvg = firstBatch.reduce((a, b) => a + b.duration, 0) / firstBatch.length;
    const secondBatchAvg = secondBatch.reduce((a, b) => a + b.duration, 0) / secondBatch.length;
    
    console.log('\nBatch Comparison:');
    console.log(`First batch average: ${firstBatchAvg.toFixed(2)}ms`);
    console.log(`Second batch average: ${secondBatchAvg.toFixed(2)}ms`);
    
    if (throttledCount > 0) {
        console.log('\nThrottling is working: Some requests were throttled (429)');
    } else if (secondBatchAvg > firstBatchAvg * 1.5) {
        console.log('\nThrottling is working: Second batch was significantly slower');
    } else {
        console.log('\nThrottling might not be working as expected');
    }
}

runTest().catch(console.error); 
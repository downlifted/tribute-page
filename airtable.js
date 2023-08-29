// airtable.js
const accessToken = 'patJR2thbtExiJQvi';
const baseId = 'Alex-Memories';
const tableName = 'Base';

const submitMemory = async (name, memory) => {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const data = {
        records: [
            {
                fields: {
                    Name: name,
                    Memory: memory,
                },
            },
        ],
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        console.log('Memory submitted successfully');
    } else {
        console.error('Failed to submit memory');
    }
};

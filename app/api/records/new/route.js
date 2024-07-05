import { connectToDB } from '@/utils/database';
import Record from '@/model/Records';

export async function POST(req, res) {
    const { cveId, severity, cvss, affectedPackages, cweId } = await req.json();
    
    try {
        await connectToDB();
        const newRecord = new Record({
            cveId,
            severity,
            cvss,
            affectedPackages,
            cweId
        });

        await newRecord.save();

        return new Response(JSON.stringify({ message: 'Record added successfully' }), {
            status: 201
        });
    } catch (error) {
        console.error('Error adding record:', error);
        return new Response(JSON.stringify({ message: 'Error adding record' }), {
            status: 501
        });
    }
}

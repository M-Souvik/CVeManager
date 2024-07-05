import { connectToDB } from '@/utils/database';
import Record from '@/model/Records';

export async function GET(req, res) {
    try {
        await connectToDB();
        const records = await Record.find({});
        return new Response(JSON.stringify(records), {
            status: 200
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        return new Response(JSON.stringify({ message: 'Error fetching records' }), {
            status: 500
        });
    }
}

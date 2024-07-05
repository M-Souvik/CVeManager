import { connectToDB } from '@/utils/database';
import Record from '@/model/Records';
export async function PATCH(req, {params}) {
 
const { cveId, severity, cvss, affectedPackages, cweId } = await req.json();

  try {
    await connectToDB();
    const existingRecord=await Record.findById(params.id)
    if(!existingRecord) return new Response("Record not found",{status: 404})
    
        existingRecord.cveId=cveId;
        existingRecord.severity=severity;
        existingRecord.cvss=cvss;
        existingRecord.affectedPackages=affectedPackages;
        existingRecord.cweId=cweId;

        await existingRecord.save();

        return new Response("Record updated Successfully",{status: 200})
  } catch (error) {
    console.error('Error updating record:', error);
    return new Response("Failed to update",{status: 500})
  }
}
export async function DELETE(req) {
  try {
    await connectToDB();

    // Extract the id from the URL
    const url = new URL(req.url);
    const recordId = url.pathname.split('/').pop();

    if (!recordId || typeof recordId !== 'string') {
      throw new Error('Invalid ID format');
    }

    await Record.findByIdAndDelete(recordId);

    return new Response("Record deleted Successfully", { status: 200 });
  } catch (error) {
    console.error('Error deleting record:', error);
    return new Response("Failed to delete", { status: 500 });
  }
}




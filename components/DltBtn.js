import React from 'react'
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDeleteRow } from "react-icons/ai";
const DltBtn = ({record}) => {
  const handleDelete = async () => {
      try {
        const response = await fetch(`/api/records/${record._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Record deleted successfully');
          window.location.reload();
        } else {
          console.error('Failed to delete the record');
          toast.error('Failed to delete the record');
        }
      } catch (error) {
        console.error('Error deleting the record:', error);
        toast.warning('Some error occurred');
      }
  }
  return (
    <div>
      <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white font-semibold" ><AiOutlineDeleteRow size={20} />Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            record and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel><Button className="bg-black rounded-xl text-white font-semibold hover:bg-slate-600">Cancel</Button></AlertDialogCancel>
          <AlertDialogAction><Button className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white font-semibold" onClick={handleDelete}>Continue</Button></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      
    </div>
  )
}
DltBtn.propTypes = {
  record: PropTypes.object.isRequired,
};
export default DltBtn

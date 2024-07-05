"use client"; // Ensure this is a Client Component

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditModal = ({ record }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cveId: record.cveId,
    severity: record.severity,
    cvss: record.cvss,
    affectedPackages: record.affectedPackages,
    cweId: record.cweId
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/records/${record._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Handle successful response
        toast.success('Record updated successfully');
        router.push('/');
        console.log('Record updated successfully');
        window.location.reload();
      } else {
        // Handle error response
        toast.error('Record update failed');
        console.error('Record update failed');
      }
    } catch (error) {
      toast.warning('Error updating record');
      console.error('Error updating record:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-cyan-700 to-green-600 rounded-xl text-white font-semibold">< TbEdit size={20}/>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit-a-Record</DialogTitle>
          <DialogDescription>
            Fill out every detail
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEdit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cveId" className="text-right">
                CVE ID
              </Label>
              <Input
                id="cveId"
                className="col-span-3"
                required
                value={formData.cveId}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="severity" className="text-right">
                Severity
              </Label>
              <Input
                id="severity"
                className="col-span-3"
                required
                value={formData.severity}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cvss" className="text-right">
                CVSS
              </Label>
              <Input
                id="cvss"
                className="col-span-3"
                required
                value={formData.cvss}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="affectedPackages" className="text-right">
                Affected Packages
              </Label>
              <Input
                id="affectedPackages"
                className="col-span-3"
                required
                value={formData.affectedPackages}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cweId" className="text-right">
                CWE ID
              </Label>
              <Input
                id="cweId"
                className="col-span-3"
                required
                value={formData.cweId}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className='bg-gradient-to-r from-blue-600 to-green-400 text-white rounded-xl'>Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditModal.propTypes = {
  record: PropTypes.object.isRequired,
};

export default EditModal;
"use client"; // Add this directive at the top

import React from 'react'
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {useState} from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = () => {
  const router = useRouter();
    const [formData, setFormData] = useState({
        cveId: '',
        severity: '',
        cvss: '',
        affectedPackages:'',
        cweId:''
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        try {
            const response = await fetch('/api/records/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Handle successful response
                toast.success('Record added successfully');
                router.push('/');
                console.log('Form submitted successfully');
                window.location.reload(); // Reload the website
            } else {
                // Handle error response
                toast.error('Form submission failed');
                console.error('Form submission failed');
            }
        } catch (error) {
            toast.warning('Error submitting form');
            console.error('Error submitting form:', error);
        }
    };
    
  return (
    <div>
    <Dialog>
      <DialogTrigger asChild>
        <Button><MdOutlineLibraryAdd size ={20}/>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add-a-Record</DialogTitle>
          <DialogDescription>
            Fill out every details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" className='bg-gradient-to-r from-blue-600 to-green-400 text-white rounded-xl'>Add</Button>
          </DialogFooter>
        </form>
        
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default Modal

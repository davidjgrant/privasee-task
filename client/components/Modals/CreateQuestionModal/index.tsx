import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../../ui/dialog';
import React from 'react';
import { Button } from '../../ui/button';
import { DialogHeader, DialogFooter } from '../../ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { SelectLabel } from '@radix-ui/react-select';

export const CreateQuestionModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
          <DialogDescription>
            Create a new question here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Label htmlFor="question">Question</Label>
          <Input id="question" placeholder="Enter your question" />
          <SelectGroup>
            <SelectLabel>Assigned To</SelectLabel>
            <Select>
              <SelectTrigger>
                <SelectValue>manuel@testcompany.com</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manuel@testcompany.com">
                  manuel@testcompany.com
                </SelectItem>
              </SelectContent>
            </Select>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Company</SelectLabel>
            <Select>
              <SelectTrigger>
                <SelectValue>Test Company Limited</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Test Company Limited">
                  Test Company Limited
                </SelectItem>
              </SelectContent>
            </Select>
          </SelectGroup>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Save question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

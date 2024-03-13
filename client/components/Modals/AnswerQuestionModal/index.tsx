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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AnswerQuestionModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Answer Question</DialogTitle>
          <DialogDescription>
            Answer the question here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="grid gap-4 w-full">
            <Label htmlFor="question">Question</Label>
            <Textarea id="question" placeholder="Enter your answer" />
            <div className="flex items-center gap-4">
              <div className="w-1/2">
                <Label htmlFor="assigned">Assigned To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue>Open</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manuel@testcompany.com">
                      manuel@testcompany.com
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <Label htmlFor="status">Company</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue>Open</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Test Company Limited">
                      Test Company Limited
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-1/2">
              <Label htmlFor="due">Due Date</Label>
              <Input id="due" type="date" />
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="w-[40%]">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-medium">History log</h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="py-4 grid gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage alt="Avatar" src="/avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-xs flex items-center gap-1">
                    <span className="font-medium">John Doe</span>
                    <time className="italic">1 hour ago</time>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage alt="Avatar" src="/avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-xs flex items-center gap-1">
                    <span className="font-medium">John Doe</span>
                    <time className="italic">1 hour ago</time>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage alt="Avatar" src="/avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-xs flex items-center gap-1">
                    <span className="font-medium">John Doe</span>
                    <time className="italic">1 hour ago</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

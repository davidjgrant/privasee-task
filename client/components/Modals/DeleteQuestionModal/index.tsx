'use client';

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
import { Input } from '../../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

export type DeleteRecord = {
  questionId: string;
};

const FormSchema = z.object({
  questionId: z.string().min(1),
});

export const DeleteQuestionModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate } = useMutation<DeleteRecord>({
    mutationFn: async (newQuestion) => {
      const response = await fetch('http://localhost:9090/api/record', {
        method: 'DELETE',
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error('An error occurred while creating the question');
      }

      return response.json();
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Delete Question</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this question? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="questionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button variant={'destructive'} type="submit">
                Delete question
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

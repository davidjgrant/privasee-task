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
import { Textarea } from '@/components/ui/textarea';

export type AnswerRecord = {
  answer: string;
};

const FormSchema = z.object({
  answer: z.string().min(1),
});

export const AnswerQuestionModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate } = useMutation<AnswerRecord>({
    mutationFn: async (newQuestion) => {
      const response = await fetch('http://localhost:9090/api/record', {
        method: 'PUT',
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
              <DialogTitle>Answer Question</DialogTitle>
              <DialogDescription>
                Question: What is the capital of France?
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="The answer is..."
                      className="resize-none"
                      {...field}
                    />
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
              <Button type="submit">Save question</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

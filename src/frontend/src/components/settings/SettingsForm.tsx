import { useAtomValue } from 'jotai';
import { UserDataAtom } from '../../store/store';
import { Switch } from '../../shadcn/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { UpdateUser } from '../../api/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../shadcn/ui/form';
import { Input } from '../../shadcn/ui/input';
import { Button } from '../../shadcn/ui/button';
import { useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../../shadcn/ui/toggle-group';

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
type singleWeekDay = (typeof weekDays)[number];

const updateUserSchema = z.object({
  send_mail: z.boolean(),
  email: z.string().email({ message: 'Invalid email' }),
  // send_time: z.string().min(5, {
  //   message: 'Send time must be at least 5 characters.',
  // }),
  dw_playlist_id: z.string().min(20, {
    message: 'DW playlist id must be at least 20 characters.',
  }),
  save_weeday: z.enum(weekDays),
  save_time: z.string({
    message: 'Save time must be at least 5 characters. ex: 16:00',
  }),
  // save_dw_weekly: z.boolean(),
  // save_full_playlist: z.boolean(),
  // filter_dislikes: z.boolean(),
}) satisfies ZodType<UpdateUser>;

type FormData = z.infer<typeof updateUserSchema>;

export const SettingsForm = () => {
  const userData = useAtomValue(UserDataAtom);
  const form = useForm<FormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      send_mail: userData.send_mail ?? false,
      email: userData.email ?? '',
      dw_playlist_id: userData.dw_playlist_id ?? '',
      save_weeday: 'Mo',
      // save_dw_weekly: userData.save_dw_weekly ?? false,
    },
  });
  useEffect(() => {
    if (userData.user_id && userData.dw_playlist_id) {
      form.setValue('dw_playlist_id', userData.dw_playlist_id);
    }
    if (userData.send_mail) {
      form.setValue('send_mail', userData.send_mail);
    }
  }, [form, userData]);
  function onSubmit(values: FormData) {
    console.log(values);
  }
  return (
    <div className="rounded-md bg-secondary bg-opacity-30 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="send_mail"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="m-0">Send weekly email</FormLabel>
              </FormItem>
            )}
          />
          {form.getValues().send_mail && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl className="mt-1">
                      <Input placeholder="pepegus@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage className="pt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="save_weeday"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-x-2">
                    <FormLabel className="m-0">Notification day</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(value: singleWeekDay) => {
                          if (value) {
                            form.setValue('save_weeday', value);
                          }
                        }}
                      >
                        {weekDays.map((dw) => (
                          <ToggleGroupItem key={dw} value={dw}>
                            <p className="h-4 w-4">{dw}</p>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="dw_playlist_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discover Weekly playlist id</FormLabel>
                <FormControl className="mt-1">
                  <Input placeholder="amogus" {...field} />
                </FormControl>
                <FormMessage className="pt-1" />
              </FormItem>
            )}
          />
          {/* <div className="flex items-center space-x-2">
            <Switch />
            <Label>Autosave</Label>
          </div> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

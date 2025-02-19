'use client';

import { SubmitButton } from '@/app/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useActionState, useEffect, useState } from 'react';
import ZoomIcon from '../../../public/zoom.png';
import GoogleMeetIcon from '../../../public/meet.png';
import MicrosoftTeamsIcon from '../../../public/teams.png';
import Image from 'next/image';
import Link from 'next/link';
import { CreateEventTypeAction } from '@/app/services/eventTypeActions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { eventTypesSchema } from '@/app/lib/zodSchemas';
import { Checkbox } from '@/components/ui/checkbox';

type VideoCallProvider = 'Zoom Meeting' | 'Google Meet' | 'Microsoft Teams' | 'NULL';

export default function NewEventRoute() {
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>('NULL');

  const [lastResult, action] = useActionState(CreateEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypesSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const [isUseVideoCheck, setIsUseVideoCheck] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsUseVideoCheck(checked);

    !checked ? setActivePlatform('NULL') : setActivePlatform('Google Meet');
  };

  return (
    <div className="max-w-screen-2xl h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Tạo sự kiện mới</CardTitle>
          <CardDescription>Tạo cuộc hẹn cho phép bạn đặt lịch hẹn với người khác</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Tiêu đề</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                placeholder="Cuộc họp 30 phút"
              />
              <div className="text-red-500 text-sm">{fields.title.errors}</div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Đường dẫn {'(URL)'}</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Thongular.com/
                </span>
                <Input
                  name={fields.url.name}
                  defaultValue={fields.url.initialValue}
                  key={fields.url.key}
                  placeholder="thongular-162002"
                  className="rounded-l-none"
                />
              </div>
              <div className="text-red-500 text-sm">{fields.url.errors}</div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Mô tả</Label>
              <Textarea
                placeholder="Cuộc họp thảo luận về quản lý dự án"
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
              />
              <div className="text-red-500 text-sm">{fields.description.errors}</div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Khoảng thời gian</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={fields.duration.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Khoảng thời gian</SelectLabel>
                    <SelectItem value="15">15 Phút</SelectItem>
                    <SelectItem value="30">30 Phút</SelectItem>
                    <SelectItem value="45">45 Phút</SelectItem>
                    <SelectItem value="60">1 giờ</SelectItem>
                    <SelectItem value="90">1 giờ 30 phút</SelectItem>
                    <SelectItem value="120">2 giờ</SelectItem>
                    <SelectItem value="150">2 giờ 30 phút</SelectItem>
                    <SelectItem value="180">3 giờ</SelectItem>
                    <SelectItem value="210">3 giờ 30 phút</SelectItem>
                    <SelectItem value="240">4 giờ</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="text-red-500 text-sm">{fields.duration.errors}</div>
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox checked={isUseVideoCheck} onCheckedChange={handleCheckboxChange} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Cho phép sự kiện thuộc cuộc họp video
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Trình cung cấp cuộc gọi video</Label>
              <Input type="hidden" name={fields.videoCallSoftware.name} value={activePlatform} />
              <ButtonGroup>
                <Button
                  disabled={!isUseVideoCheck}
                  type="button"
                  onClick={() => setActivePlatform('Zoom Meeting')}
                  className="w-full"
                  variant={activePlatform === 'Zoom Meeting' ? 'secondary' : 'outline'}
                >
                  <Image src={ZoomIcon} alt="" className="size-4 mr-2" />
                  Zoom
                </Button>
                <Button
                  disabled={!isUseVideoCheck}
                  type="button"
                  onClick={() => setActivePlatform('Google Meet')}
                  className="w-full"
                  variant={activePlatform === 'Google Meet' ? 'secondary' : 'outline'}
                >
                  <Image src={GoogleMeetIcon} alt="" className="size-4 mr-2" />
                  Google Meet
                </Button>
                <Button
                  disabled={!isUseVideoCheck}
                  type="button"
                  onClick={() => setActivePlatform('Microsoft Teams')}
                  className="w-full"
                  variant={activePlatform === 'Microsoft Teams' ? 'secondary' : 'outline'}
                >
                  <Image src={MicrosoftTeamsIcon} alt="" className="size-4 mr-2" />
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              <div className="text-red-500 text-sm">{fields.videoCallSoftware.errors}</div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Hủy</Link>
            </Button>
            <SubmitButton text="Tạo sự kiện" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

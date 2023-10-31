import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import getSession from '@/lib/getServerSession';
import { basicInfoSchema } from '@/lib/validations/church';

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session) {
    redirect('/signin');
  }

  if (!session.user.id) {
    redirect('/signin');
  }

  const body = await req.json();

  const validation = basicInfoSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        status: 'failed',
        error: validation.error.errors.map((e) => ({
          path: e.path[0],
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  const newChurch = await prisma.church.create({
    data: {
      ...validation.data,
      user_id: session.user.id,
      status: 'DRAFT',
      steps_completed: ['basic-info'],
    },
  });

  return NextResponse.json(
    { status: 'success', data: newChurch },
    { status: 201 }
  );
}

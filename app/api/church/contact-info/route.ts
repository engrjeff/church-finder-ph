import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import getSession from '@/lib/getServerSession';
import { churchContactSchema, churchIdSchema } from '@/lib/validations/church';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      redirect('/signin');
    }

    if (!session.user.id) {
      redirect('/signin');
    }

    const body = await req.json();

    const validation = churchContactSchema
      .merge(churchIdSchema)
      .safeParse(body);

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

    const churchContactInfo = await prisma.churchContact.create({
      data: validation.data,
    });

    // update church steps taken
    await prisma.church.update({
      where: {
        id: validation.data.church_id,
      },
      data: {
        steps_completed: {
          push: 'church-contact-info',
        },
      },
    });

    return NextResponse.json(
      { status: 'success', data: churchContactInfo },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(new Error('Server Error'), { status: 500 });
  }
}

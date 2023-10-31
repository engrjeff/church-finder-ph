import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import getSession from '@/lib/getServerSession';
import { basicInfoSchema } from '@/lib/validations/church';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    const church = await prisma.church.findUnique({
      where: { id: params.id },
    });

    if (!church)
      return NextResponse.json(
        { status: 'failed', error: 'Church not found' },
        { status: 404 }
      );

    const updatedChurch = await prisma.church.update({
      where: {
        id: params.id,
      },
      data: validation.data,
    });

    return NextResponse.json(
      { status: 'success', data: updatedChurch },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(new Error('Server Error'), { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      redirect('/signin');
    }

    if (!session.user.id) {
      redirect('/signin');
    }

    const church = await prisma.church.findUnique({
      where: { id: params.id },
    });

    if (!church)
      return NextResponse.json(
        { status: 'failed', error: 'Church not found' },
        { status: 404 }
      );

    await prisma.church.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(new Error('Server Error'), { status: 500 });
  }
}

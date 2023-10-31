import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import getSession from '@/lib/getServerSession';
import { churchContactSchema, idSchema } from '@/lib/validations/church';

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

    const validation = churchContactSchema.merge(idSchema).safeParse(body);

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

    const churchContact = await prisma.churchContact.findUnique({
      where: {
        id: validation.data.id,
        AND: {
          church_id: params.id,
        },
      },
    });

    if (!churchContact)
      return NextResponse.json(
        { status: 'failed', error: 'Church Contact Info not found' },
        { status: 404 }
      );

    const updatedChurchContact = await prisma.churchContact.update({
      where: {
        id: validation.data.id,
        AND: {
          church_id: params.id,
        },
      },
      data: validation.data,
    });

    return NextResponse.json(
      { status: 'success', data: updatedChurchContact },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(new Error('Server Error'), { status: 500 });
  }
}

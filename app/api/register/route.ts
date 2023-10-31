import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';

import { registerSchema } from '@/lib/validations/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = registerSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      validation.error.errors.map((e) => ({
        path: e.path[0],
        message: e.message,
      })),
      { status: 400 }
    );

  const { name, email, password } = validation.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser)
    return NextResponse.json(
      { error: 'The given email is already in use' },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json({
    email: newUser.email,
    name: newUser.name,
    id: newUser.id,
  });
}

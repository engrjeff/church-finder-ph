/* eslint-disable tailwindcss/no-custom-classname */
import { Button, Hr, Html, Tailwind, Text } from '@react-email/components';

export default function UserVerificationEmail({
  name,
  confirmationLink,
}: {
  name: string;
  confirmationLink: string;
}) {
  return (
    <Html>
      <Tailwind>
        <Text>Hi, {name}!</Text>
        <Text>
          Thanks for signing up to Church Finder PH!. We are so glad to have you
          on board!
        </Text>
        <Text>
          To get started, click the link below to confirm your registration and
          you will be able to fully use Church Finder PH.
        </Text>
        <Button
          href={confirmationLink}
          className="rounded bg-purple-600 px-4 py-3 font-medium text-white"
        >
          Confirm your registration
        </Button>
        <Text>Soli Deo Gloria!</Text>
        <Hr />
        <Text className="text-xs">- jeffsegovia</Text>
      </Tailwind>
    </Html>
  );
}

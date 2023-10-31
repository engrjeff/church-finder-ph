import { type Church } from '@prisma/client';
import { CubeIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

function ChurchCard({ church }: { church: Church }) {
  return (
    <Card className="ring-offset-background hover:ring-2 hover:ring-primary hover:ring-offset-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={church.logo} alt={`${church.name} logo`} />
            <AvatarFallback>
              <CubeIcon />
            </AvatarFallback>
          </Avatar>
          <span>{church.name}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default ChurchCard;

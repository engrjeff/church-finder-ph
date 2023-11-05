import { type Church } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ChurchCard({ church }: { church: Church }) {
  return (
    <Card className="ring-offset-background hover:ring-2 hover:ring-primary hover:ring-offset-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={church.logo} alt={`${church.name} logo`} />
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <p>{church.name}</p>
            <Badge variant="white">{church.status.toLowerCase()}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default ChurchCard;

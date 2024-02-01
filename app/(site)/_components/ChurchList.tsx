import { ChurchListPageProps } from '../_types';
import { getPublishedChurches } from '../services/church';
import ChurchListItem from './ChurchListItem';

async function ChurchList({ searchParams }: ChurchListPageProps) {
  const churches = await getPublishedChurches(searchParams);

  if (churches.length === 0)
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center rounded-lg bg-white/5 text-center">
        <p className="text-center">No churches found.</p>
      </div>
    );

  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {churches.map((church) => (
          <li key={`church::${church.id}`}>
            <ChurchListItem church={church} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChurchList;

import { getPublishedChurches } from '../services/church';

async function ChurchList() {
  const churches = await getPublishedChurches();

  return (
    <ul>
      {churches.map((church) => (
        <li key={church.id}></li>
      ))}
    </ul>
  );
}

export default ChurchList;

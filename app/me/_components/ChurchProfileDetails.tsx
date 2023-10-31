import { ChurchProfileData } from '@/lib/validations/church';
import { Button } from '@/components/ui/button';

function ChurchProfileDetails({
  churchProfile,
}: {
  churchProfile: ChurchProfileData | null;
}) {
  if (!churchProfile) return null;

  return (
    <div>
      <Button>Church Profile</Button>

      <div>
        <h3>Schedule of Services</h3>
        <ul>
          {churchProfile.services.map((service, idx) => (
            <li key={`service-${idx}`}>
              <p>{service.title}</p>
              <p>
                Every {service.day} at {service.time}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChurchProfileDetails;

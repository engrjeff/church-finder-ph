import ChurchFormStepItem from './ChurchFormStepItem';

const formSteps = [
  {
    label: 'Basic Info',
    step: 'basic-info',
  },
  {
    label: 'Profile',
    step: 'church-profile',
  },
  {
    label: 'Contact Info',
    step: 'church-contact-info',
  },
  {
    label: "Pastor's Profile",
    step: 'pastor-profile',
  },
  {
    label: 'Media',
    step: 'media',
  },
  {
    label: 'Church Map',
    step: 'church-map',
  },
];

function ChurchFormSteps() {
  return (
    <div className="border-b">
      <div className="px-4 py-2">
        <ul className="flex items-center gap-2">
          {formSteps.map((step) => (
            <li key={step.step}>
              <ChurchFormStepItem step={step.step} label={step.label} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChurchFormSteps;

type StepTitleProps = {
  title: string;
  description?: string;
};

export default function StepTitle({ title, description }: StepTitleProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-[32px] leading-10 font-bold text-title">{title}</h1>
      {description && <p className="text-base leading-[22px] text-muted">{description}</p>}
    </div>
  );
}

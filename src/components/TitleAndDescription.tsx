type TitleAndDescriptionProps = {
  title: string;
  description: string;
};

const TitleAndDescription = ({
  title,
  description,
}: TitleAndDescriptionProps) => {
  return (
    <div>
      <h1 className="text-form-denim text-[32px] font-bold">{title}</h1>
      <p className="text-form-grey text-[16px]">{description}</p>
    </div>
  );
};

export default TitleAndDescription;
